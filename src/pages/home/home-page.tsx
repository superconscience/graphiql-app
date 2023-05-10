import { FC } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export const HomePage: FC = () => {
  const auth = getAuth();
  return (
    <>
      <div className="container">
        <h1>Home Page</h1>
        <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
      </div>
    </>
  );
};
