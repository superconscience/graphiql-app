import { GraphQLSchema, GraphQLSchemaConfig, IntrospectionQuery } from 'graphql';
import {} from 'codemirror-graphql/esm/hint';
import debounce from 'lodash.debounce';
import { Uri, editor, languages } from 'monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { FC, useEffect, useRef, useState } from 'react';
import {
  createEditor,
  defaultOperations,
  getOrCreateModel,
  getSchema,
  queryAction,
} from './helpers';
import { MonacoGraphQLAPI } from 'monaco-graphql';
export type QueryEditorProps = {
  url: string;
};

export const QueryEditor: FC<QueryEditorProps> = ({ url }) => {
  const opsRef = useRef(null);
  const [queryEditor, setQueryEditor] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [schema, setSchema] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const [api, setApi] = useState<MonacoGraphQLAPI>();
  useEffect(() => {
    const queryModel = getOrCreateModel('operation.graphql', defaultOperations);
    queryEditor ??
      setQueryEditor(
        createEditor(opsRef, {
          model: queryModel,
          language: 'graphql',
        })
      );

    queryModel.onDidChangeContent(
      debounce(() => {
        localStorage.setItem('operations', queryModel.getValue());
      }, 300)
    );
  }, [schema, queryEditor]);

  useEffect(() => {
    if (url) {
      queryEditor?.addAction(queryAction(url));
    }
  }, [queryEditor, url]);

  useEffect(() => {
    if (url) {
      setSchema(null);
    }
  }, [url]);

  useEffect(() => {
    if (!schema && !loading && url) {
      setLoading(true);
      getSchema(url)()
        .then((data) => {
          if (!('data' in data)) {
            throw Error('No data');
          }
          if (api) {
            api.setSchemaConfig([
              {
                introspectionJSON: data.data as unknown as IntrospectionQuery,
                uri: 'myschema.graphql',
              },
            ]);
          } else {
            const api = initializeMode({
              diagnosticSettings: {
                validateVariablesJSON: {
                  [Uri.file('operation.graphql').toString()]: [
                    Uri.file('variables.json').toString(),
                  ],
                },
                jsonDiagnosticSettings: {
                  validate: true,
                  schemaValidation: 'error',
                  allowComments: true,
                  trailingCommas: 'ignore',
                },
              },
              schemas: [
                {
                  introspectionJSON: data.data as unknown as IntrospectionQuery,
                  uri: 'myschema.graphql',
                },
              ],
            });

            setApi(api);
          }

          setSchema(data.data);

          //  api.setSchemaConfig([
          //     {
          //       schema: GraphQLSchema,
          //       fileMatch: ['**/*.graphql'],
          //       uri: 'myschema.graphql',
          //     },
          //   ]);

          return;
        })
        .then(() => setLoading(false));
    }
  }, [schema, loading, url]);

  return <div ref={opsRef} className="editor" />;
};
