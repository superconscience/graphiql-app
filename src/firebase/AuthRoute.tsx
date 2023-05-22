import React, { ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../store/hooks';
import { setIsAuth } from '../store/slices/auth';
import { Loader } from './../components/loader';

export interface IAuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        dispatch(setIsAuth(true));
      } else {
        dispatch(setIsAuth(false));
        navigate('/');
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default AuthRoute;
