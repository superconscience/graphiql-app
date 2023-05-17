import { FC } from 'react';
import { useTypedTranslation } from '../../i18n/hooks';

export const HomePage: FC = () => {
  const { t } = useTypedTranslation();
  return (
    <>
      <div className="homePage__container">
        <h1>{t('homePageContent')}</h1>
      </div>
    </>
  );
};
