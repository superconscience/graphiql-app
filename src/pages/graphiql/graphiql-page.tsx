import { FC } from 'react';
import { Appbar } from '../../components/editor/appbar';
import { QueryEditor } from '../../components/editor/query-editor';
import { ResultsViewer } from '../../components/editor/results-viewer';
import { VariablesEditor } from '../../components/editor/variables-editor';
import { useEditorUrl } from '../../hooks/use-editor-url';

export const GraphiQlPage: FC = () => {
  const [url] = useEditorUrl();

  return (
    <div className="graph__container">
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
        </div>
      </div>
    </div>
  );
};
