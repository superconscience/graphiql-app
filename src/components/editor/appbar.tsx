import { ChangeEventHandler } from 'react';
import { useEditorUrl } from '../../hooks/use-editor-url';

export const Appbar = () => {
  const [url, setUrl] = useEditorUrl();
  const onUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value);
  };
  return (
    <>
      <input style={{ width: 500 }} value={url} onChange={onUrlChange} />
    </>
  );
};
