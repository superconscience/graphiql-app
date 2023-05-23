import { ChangeEventHandler } from 'react';
import { useEditorUrl } from '../../hooks/use-editor-url';

export const Appbar = () => {
  const [url, setUrl] = useEditorUrl();
  const onUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value);
  };
  return (
    <div className="appbar">
      <input className="appbar__input" value={url} onChange={onUrlChange} />
    </div>
  );
};
