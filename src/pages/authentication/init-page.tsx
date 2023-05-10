import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '../../routes';

export const InitPage: FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={routesMap.login.path}>Login</Link>
        </li>
        <li>
          <Link to={routesMap.register.path}>Register</Link>
        </li>
      </ul>
    </>
  );
};
