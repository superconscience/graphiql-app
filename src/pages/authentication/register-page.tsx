import { FC } from 'react';
import { SignForm } from '../../components/signForm';
import { Footer } from '../../components/footer';
import { useTranslation } from 'react-i18next';
import { Language } from '../../components/language';

export type FormInputs = {
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="language__container">
        <Language />
      </div>
      <SignForm title={t('signTitleCreate')} typeForm="Register" />
      <Footer />
    </>
  );
};
