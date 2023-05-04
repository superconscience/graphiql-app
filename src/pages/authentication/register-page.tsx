import { FC } from 'react';
import React, { FormEvent, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router';

export const RegisterPage: FC = () => {
  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

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
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    console.log(email, password);
    signInWitEmail(email, password);
  };

  return (
    <>
      <div>
        <p>Login Page</p>
        <form onSubmit={onSubmit}>
          <input type="email" ref={emailRef} placeholder="email" />
          <input type="password" ref={passwordRef} />
          <button type="submit">Submit</button>
        </form>

        <button onClick={() => signInWithGoogle()} disabled={authing}>
          Sign in with Google
        </button>
      </div>
    </>
  );
};
