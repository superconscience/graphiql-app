import { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedTranslation } from '../i18n/hooks';
import { routesMap } from '../routes';
import { UserMenu } from './userMenu';

export const Header: FC = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const refModal = useRef<HTMLDivElement>(null);
  const { t } = useTypedTranslation();

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
          <NavLink className="header__logo" to={routesMap.home.path}>
            <img className="header__logo-icon" src="./logo.svg" />
          </NavLink>

          <ul className="header__list">
            <li className="header__item">
              <NavLink
                to={routesMap.home.path}
                className={({ isActive }) => (isActive ? 'header__link-active' : 'header__link')}
              >
                {t('homePage')}
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to={routesMap.graphiql.path}
                className={({ isActive }) => (isActive ? 'header__link-active' : 'header__link')}
              >
                {t('editorPage')}
              </NavLink>
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
