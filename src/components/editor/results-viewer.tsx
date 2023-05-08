import { editor } from 'monaco-editor';
import { FC, useEffect, useRef, useState } from 'react';
import { createEditor, getOrCreateModel } from './helpers';

export const ResultsViewer: FC = () => {
  const resultsRef = useRef(null);
  const [resultsViewer, setResultsViewer] = useState<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const resultsModel = getOrCreateModel('results.json', '{}');

    resultsViewer ??
      setResultsViewer(
        createEditor(resultsRef, {
          model: resultsModel,
          readOnly: true,
          smoothScrolling: true,
        })
      );
  }, [resultsViewer]);

  return <div ref={resultsRef} className="editor" />;
};
