import { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
import { FieldValues, useForm } from 'react-hook-form';
import { routesMap } from '../../routes';

export type FormInputs = {
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
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
    signInWitEmail(data.email, data.password);
  };

  return (
    <>
      <div className="sign">
        <div className="sign__title">Welcome back!</div>
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
            Sign in
          </button>
        </form>

        <div className="sign__or">or</div>

        <button className="sign__btn-google" onClick={() => signInWithGoogle()} disabled={authing}>
          Sign in with Google
        </button>

        <div className="sign__auth-box">
          <span className="sign__text">Need an account?</span>
          <Link to={routesMap.login.path} className="sign__btn-auth">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

//import { FC } from 'react';
//import { useState } from 'react';
//import { Link } from 'react-router-dom';
//import {
//  getAuth,
//  GoogleAuthProvider,
//  signInWithPopup,
//  createUserWithEmailAndPassword,
//} from 'firebase/auth';
//import { useNavigate } from 'react-router';
//import { FieldValues, useForm } from 'react-hook-form';
//import { routesMap } from '../../routes';

//export type FormInputs = {
//  email: string;
//  password: string;
//};

//export const RegisterPage: FC = () => {
//  const {
//    register,
//    handleSubmit,
//    formState: { errors },
//  } = useForm<FormInputs>({
//    mode: 'onSubmit',
//    reValidateMode: 'onSubmit',
//  });
//  const auth = getAuth();
//  const navigate = useNavigate();
//  const [authing, setAuthing] = useState(false);
//  const signInWithGoogle = async () => {
//    setAuthing(true);

//    signInWithPopup(auth, new GoogleAuthProvider())
//      .then((response) => {
//        console.log(response.user.uid);
//        navigate('/');
//      })
//      .catch((error) => {
//        console.log(error);
//        setAuthing(false);
//      });
//  };
//  const signInWitEmail = async (email: string, password: string) => {
//    setAuthing(true);
//    createUserWithEmailAndPassword(auth, email, password)
//      .then((userCredential) => {
//        //const user = userCredential.user;
//        navigate('/');
//      })
//      .catch((error) => {
//        const errorCode = error.code;
//        const errorMessage = error.message;
//        console.log(errorCode);
//        console.log(errorMessage);
//      });
//  };

//  const onSubmit = (data: FieldValues) => {
//    signInWitEmail(data.email, data.password);
//  };

//  return (
//    <>
//      <div className="sign">
//        <div className="sign__title">Welcome back!</div>
//        <form className="sign__form" onSubmit={handleSubmit(onSubmit)}>
//          <div className="sign__field">
//            <label className="sign__form-label" htmlFor="name">
//              Email
//            </label>
//            <input
//              {...register('email', {
//                required: 'Email is required',
//                pattern: {
//                  value:
//                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                  message: 'Please enter a valid email',
//                },
//              })}
//              className="sign__input"
//              type="email"
//            />
//            <div>{errors.email?.message}</div>
//          </div>
//          <div className="sign__field">
//            <label className="sign__form-label" htmlFor="name">
//              Password
//            </label>
//            <input
//              type="password"
//              className="sign__input"
//              {...register('password', {
//                required: 'required',
//                minLength: {
//                  value: 8,
//                  message: 'must be 8 chars',
//                },
//                validate: (value) => {
//                  return (
//                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
//                      pattern.test(value)
//                    ) || 'must include lower, upper, number, and special chars'
//                  );
//                },
//              })}
//            />
//            <div>{errors.password?.message}</div>
//          </div>
//          <button className="sign__btn" type="submit">
//            Sign in
//          </button>
//        </form>

//        <div className="sign__or">or</div>

//        <button className="sign__btn-google" onClick={() => signInWithGoogle()} disabled={authing}>
//          Sign in with Google
//        </button>

//        <div className="sign__auth-box">
//          <span className="sign__text">Need an account?</span>
//          <Link to={routesMap.login.path} className="sign__btn-auth">
//            Register
//          </Link>
//        </div>
//      </div>
//    </>
//  );
//};
