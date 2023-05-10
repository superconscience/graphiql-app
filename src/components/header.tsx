import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '../routes';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <Link className="header__logo" to={routesMap.home.path}>
            <img className="header__logo-icon" src="./logo.svg" />
          </Link>

          <ul className="header__list">
            <li className="header__item">
              <Link to={routesMap.home.path}>Home</Link>
            </li>
            <li className="header__item">
              <Link to={routesMap.graphiql.path}>Editor</Link>
            </li>
          </ul>
        </nav>
        <div>user</div>
      </div>
    </header>
  );
};
