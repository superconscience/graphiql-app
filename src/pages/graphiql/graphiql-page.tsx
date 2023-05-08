import { FC, useEffect } from 'react';
import { Appbar } from '../../components/editor/appbar';
import { QueryEditor } from '../../components/editor/query-editor';
import { ResultsViewer } from '../../components/editor/results-viewer';
import { VariablesEditor } from '../../components/editor/variables-editor';
import { useEditorUrl } from '../../hooks/use-editor-url';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { DocsViewer } from '../../components/editor/docs-viewer';

export const GraphiQlPage: FC = () => {
  const [url] = useEditorUrl();

  // useEffect(() => {
  //   const a = async (url: string) => {
  //     const remoteExecutor = buildHTTPExecutor({
  //       endpoint: url,
  //     });

  //     const postsSubschema = {
  //       schema: await schemaFromExecutor(remoteExecutor),
  //       executor: remoteExecutor,
  //     };

  //     const fields = postsSubschema.schema.getQueryType()?.getFields();
  //     const filters = postsSubschema.schema.getQueryType()?.getInterfaces();
  //     const result = JSON.parse(JSON.stringify(fields));
  //     console.log(fields);
  //   };
  //   a('https://swapi-graphql.netlify.app/.netlify/functions/index');
  // }, []);
  return (
    <>
      <div>
        <Appbar />
      </div>
      <div id="wrapper">
        <div id="left-pane" className="pane">
          <QueryEditor url={url} />
          <VariablesEditor url={url} />
        </div>
        <div id="right-pane" className="pane">
          <ResultsViewer />
          <DocsViewer />
        </div>
      </div>
    </>
  );
};
