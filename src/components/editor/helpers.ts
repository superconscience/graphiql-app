import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { getIntrospectionQuery } from 'graphql';
import * as JSONC from 'jsonc-parser';
import { KeyCode, KeyMod, Uri, editor, languages } from 'monaco-editor';

export const fetcher = (url: string) =>
  createGraphiQLFetcher({
    url,
  });

export const defaultOperations =
  localStorage.getItem('operations') ??
  `
# cmd/ctrl + return/enter will execute the op,
# same in variables editor below
# also available via context menu & f1 command palette

query($limit: Int!) {
    payloads(limit: $limit) {
        customer
    }
}
`;

export const defaultVariables =
  localStorage.getItem('variables') ??
  `
 {
     // limit will appear here as autocomplete,
     // and because the default value is 0, will
     // complete as such
     "limit": false
 }
`;

export const getSchema = (url: string) => async () =>
  fetcher(url)({
    query: getIntrospectionQuery(),
    operationName: 'IntrospectionQuery',
  });

export const getOrCreateModel = (uri: string, value: string) => {
  return (
    editor.getModel(Uri.file(uri)) ?? editor.createModel(value, uri.split('.').pop(), Uri.file(uri))
  );
};

export const execOperation = (url: string) =>
  async function () {
    const variables = editor.getModel(Uri.file('variables.json'))!.getValue();
    const operations = editor.getModel(Uri.file('operation.graphql'))!.getValue();
    const resultsModel = editor.getModel(Uri.file('results.json'));
    const result = await fetcher(url)({
      query: operations,
      variables: JSON.stringify(JSONC.parse(variables)),
    });
    const data = await result.next();
    resultsModel?.setValue(JSON.stringify(data.value, null, 2));
  };

export const queryAction = (url: string) => ({
  id: 'graphql-run',
  label: 'Run Operation',
  contextMenuOrder: 0,
  contextMenuGroupId: 'graphql',
  keybindings: [
    // eslint-disable-next-line no-bitwise
    KeyMod.CtrlCmd | KeyCode.Enter,
  ],
  run: execOperation(url),
});
languages.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
  trailingCommas: 'ignore',
});

export const createEditor = (
  ref: React.MutableRefObject<null>,
  options: editor.IStandaloneEditorConstructionOptions
) => editor.create(ref.current as unknown as HTMLElement, options);
