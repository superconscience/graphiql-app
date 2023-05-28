import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
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
  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });
    return () => AuthCheck();
  }, [auth, navigate]);
  return (
    <>
      <div className="background">
        <img className="background__img" src="./bg.jpg" alt="background" />
      </div>
      <div className="language__container">
        <Language />
      </div>
      <SignForm title={t('signTitleCreate')} typeForm="Register" />
      <div className="content"></div>
      <Footer />
    </>
  );
};
