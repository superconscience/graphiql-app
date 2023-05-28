import { getAuth } from 'firebase/auth';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Footer } from '../../components/footer';
import { Language } from '../../components/language';
import { SignForm } from '../../components/signForm';
import { useTypedTranslation } from '../../i18n/hooks';

export const LoginPage: FC = () => {
  const { t } = useTypedTranslation();
  const auth = getAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="background"></div>
      <div className="language__container">
        <Language />
      </div>
      <SignForm title={t('signTitle')} typeForm="Log in" />
      <div className="content"></div>
      <Footer />
    </>
  );
};
