import { FC, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '../routes';
import { useTranslation } from 'react-i18next';
import { UserMenu } from './userMenu';

export const Header: FC = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const refModal = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (refModal.current && !refModal.current?.contains(target)) {
      setIsUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  });

  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <Link className="header__logo" to={routesMap.home.path}>
            <img className="header__logo-icon" src="./logo.svg" />
          </Link>

          <ul className="header__list">
            <li className="header__item">
              <Link to={routesMap.home.path}>{t('homePage')}</Link>
            </li>
            <li className="header__item">
              <Link to={routesMap.graphiql.path}>{t('editorPage')}</Link>
            </li>
          </ul>
        </nav>
        <div className="header__user">
          <img onClick={() => setIsUserMenu(true)} className="header__user-icon" src="./user.svg" />
          <div className="header__user-menu" ref={refModal}>
            {isUserMenu && <UserMenu />}
          </div>
        </div>
      </div>
    </header>
  );
};
