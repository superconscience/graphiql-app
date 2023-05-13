import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="homePage__container">
        <h1>{t('homePageContent')}</h1>
      </div>
    </>
  );
};
