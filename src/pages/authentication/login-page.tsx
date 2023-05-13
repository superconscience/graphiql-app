import { FC } from 'react';
import { SignForm } from '../../components/signForm';
import { Footer } from '../../components/footer';
import { useTranslation } from 'react-i18next';
import { Language } from '../../components/language';

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="language__container">
        <Language />
      </div>
      <SignForm title={t('signTitle')} typeForm="Log in" />
      <Footer />
    </>
  );
};
