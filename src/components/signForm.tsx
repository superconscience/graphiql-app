//import React, { FC } from 'react';

//export const SignForm: FC = () => {
//  return <div>signForm</div>;
//};

import { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
import { FieldValues, useForm } from 'react-hook-form';
import { routesMap } from '../routes';

export type FormInputs = {
  email: string;
  password: string;
};

type SignFormProps = {
  title: string;
  typeForm: string;
  linkForm: string;
};

export const SignForm: FC<SignFormProps> = ({ title, typeForm, linkForm }) => {
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
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  const signInWitEmail = async (email: string, password: string) => {
    setAuthing(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        //const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
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
        <form className="sign__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="sign__field">
            <label className="sign__form-label" htmlFor="name">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              className="sign__input"
              type="email"
            />
            <div>{errors.email?.message}</div>
          </div>
          <div className="sign__field">
            <label className="sign__form-label" htmlFor="name">
              Password
            </label>
            <input
              type="password"
              className="sign__input"
              {...register('password', {
                required: 'required',
                minLength: {
                  value: 8,
                  message: 'must be 8 chars',
                },
                validate: (value) => {
                  return (
                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                      pattern.test(value)
                    ) || 'must include lower, upper, number, and special chars'
                  );
                },
              })}
            />
            <div>{errors.password?.message}</div>
          </div>
          <button className="sign__btn" type="submit">
            {typeForm}
          </button>
        </form>

        <div className="sign__or">or</div>

        <button className="sign__btn-google" onClick={() => signInWithGoogle()} disabled={authing}>
          {typeForm} with Google
        </button>

        <div className="sign__auth-box">
          {typeForm !== 'Register' && <span className="sign__text">Need an account?</span>}
          <Link
            to={typeForm === 'Register' ? routesMap.login.path : routesMap.register.path}
            className="sign__btn-auth"
          >
            {linkForm}
          </Link>
        </div>
      </div>
    </>
  );
};
