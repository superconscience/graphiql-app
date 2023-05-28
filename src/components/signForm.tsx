import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '../i18n/hooks';
import { routesMap } from '../routes';

export type FormInputs = {
  email: string;
  password: string;
};

type SignFormProps = {
  title: string;
  typeForm: string;
};

export const SignForm: FC<SignFormProps> = ({ title, typeForm }) => {
  const { t } = useTypedTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const onLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch(() => {});
  };

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setAuthing(false);
      });
  };
  const signInWitEmail = async (email: string, password: string) => {
    setAuthing(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch(() => {});
  };

  const onSubmit = (data: FieldValues) => {
    if (typeForm === 'Register') {
      signInWitEmail(data.email, data.password);
    } else {
      onLogin(data.email, data.password);
    }
    reset();
  };

  return (
    <>
      <div className="sign">
        <div className="sign__title">{title}</div>
        <form className="sign__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="sign__field">
            <label className="sign__form-label" htmlFor="name">
              {t('signEmail')}
            </label>
            <input
              {...register('email', {
                required: t('formReq'),
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('formValidEmail'),
                },
              })}
              className="sign__input"
              type="email"
            />
            <div className="sign__error">{errors.email?.message}</div>
          </div>
          <div className="sign__field">
            <label className="sign__form-label" htmlFor="name">
              {t('signPassword')}
            </label>
            <input
              type="password"
              className="sign__input"
              {...register('password', {
                required: t('formReq'),
                minLength: {
                  value: 8,
                  message: t('formReqEight'),
                },
                validate: (value) => {
                  return (
                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                      pattern.test(value)
                    ) || t('formReqChars')
                  );
                },
              })}
            />
            <div className="sign__error">{errors.password?.message}</div>
          </div>
          <button className="sign__btn" type="submit">
            {typeForm === 'Register' ? t('signRegister') : t('signLogin')}
          </button>
        </form>

        <div className="sign__or">{t('signTextOr')}</div>

        <button className="sign__btn-google" onClick={() => signInWithGoogle()} disabled={authing}>
          {typeForm === 'Register' ? t('signRegisterWithGoogle') : t('signLoginWithGoogle')}
        </button>

        <div className="sign__auth-box">
          {typeForm !== 'Register' && <span className="sign__text">{t('signText')}</span>}
          <Link
            to={typeForm === 'Register' ? routesMap.login.path : routesMap.register.path}
            className="sign__btn-auth"
          >
            {typeForm !== 'Register' ? t('signRegister') : t('signLinkRegister')}
          </Link>
        </div>
      </div>
    </>
  );
};
