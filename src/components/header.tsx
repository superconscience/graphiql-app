import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '../routes';

export const Header: FC = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to={routesMap.home.path}>Home</Link>
        </li>
        <li>
          <Link to={routesMap.graphiql.path}>GraphiQL</Link>
        </li>
      </ul>
    </header>
  );
};
