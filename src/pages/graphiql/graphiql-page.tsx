import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const GraphiQlPage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="GraphiQlPage__container">
        <h1>{t('editorPageContent')}</h1>
      </div>
    </>
  );
};
