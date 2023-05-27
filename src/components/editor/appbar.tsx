import { ChangeEventHandler } from 'react';
import { useEditorUrl } from '../../hooks/use-editor-url';
import { useTypedTranslation } from '../../i18n/hooks';

export const Appbar = () => {
  const [url, setUrl] = useEditorUrl();
  const { t } = useTypedTranslation();
  const onUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value);
  };
  return (
    <div className="appbar">
      <input
        className="appbar__input"
        value={url}
        onChange={onUrlChange}
        placeholder={t('enterUrl')}
      />
    </div>
  );
};
