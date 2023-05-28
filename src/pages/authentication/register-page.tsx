import { getAuth } from 'firebase/auth';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Footer } from '../../components/footer';
import { Language } from '../../components/language';
import { SignForm } from '../../components/signForm';
import { useTypedTranslation } from '../../i18n/hooks';

export type FormInputs = {
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const { t } = useTypedTranslation();
  const auth = getAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="background"></div>
      <div className="language__container">
        <Language />
      </div>
      <SignForm title={t('signTitleCreate')} typeForm="Register" />
      <div className="content"></div>
      <Footer />
    </>
  );
};
