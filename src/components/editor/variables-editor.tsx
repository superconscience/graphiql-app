import debounce from 'lodash.debounce';
import { editor } from 'monaco-editor';
import { FC, useEffect, useRef, useState } from 'react';
import { createEditor, defaultVariables, getOrCreateModel, queryAction } from './helpers';

export type VariablesEditorProps = {
  url: string;
};

export const VariablesEditor: FC<VariablesEditorProps> = ({ url }) => {
  const varsRef = useRef(null);
  const [variablesEditor, setVariablesEditor] = useState<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const variablesModel = getOrCreateModel('variables.json', defaultVariables);

    variablesEditor ??
      setVariablesEditor(
        createEditor(varsRef, {
          model: variablesModel,
        })
      );

    variablesModel.onDidChangeContent(
      debounce(() => {
        localStorage.setItem('variables', variablesModel.getValue());
      }, 300)
    );
  }, [variablesEditor]);

  useEffect(() => {
    variablesEditor?.addAction(queryAction(url));
  }, [variablesEditor, url]);

  return <div ref={varsRef} className="editor" />;
};
