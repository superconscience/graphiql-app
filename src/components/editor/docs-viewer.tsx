import { editor } from 'monaco-editor';
import { FC, useRef, useState } from 'react';

export const DocsViewer: FC = () => {
  const docsRef = useRef(null);
  const [docsViewer, setDocsViewer] = useState<editor.IStandaloneCodeEditor | null>(null);

  return <></>;
};
