import { FC } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export const Modal: FC = () => {
  const auth = getAuth();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    signOut(auth);
  };
  return (
    <div className="modal">
      <button className="modal__content" onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};
