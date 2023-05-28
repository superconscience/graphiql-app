import { FC, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/slices/auth';
import { useTypedTranslation } from '../i18n/hooks';
import { routesMap } from '../routes';
import { UserMenu } from './userMenu';
import { Language } from './language';

export const Header: FC = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const refModal = useRef<HTMLDivElement>(null);
  const { isAuth } = useAppSelector(selectAuth);
  const { t } = useTypedTranslation();

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.pageYOffset;

      if (scrollDistance > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <header className={`header ${isSticky ? 'sticky-header' : ''}`}>
      <div className="header__container">
        <nav className="header__nav">
          <NavLink className="header__logo" to={routesMap.home.path}>
            <img className="header__logo-icon" src="./logo.svg" />
          </NavLink>

          {isAuth && (
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
          )}
        </nav>
        {isAuth ? (
          <div className="header__menu">
            <div className="header__button-graph">
              <span>{t('welcome')}</span>
              <NavLink to={routesMap.graphiql.path} className="header__link-graph">
                GraphQL!
              </NavLink>
            </div>

            <div className="header__user">
              <img
                onClick={() => setIsUserMenu(true)}
                className="header__user-icon"
                src="./user.svg"
              />
              <div className="header__user-menu" ref={refModal}>
                {isUserMenu && <UserMenu />}
              </div>
            </div>
          </div>
        ) : (
          <div className="header__auth-box">
            <Link to={routesMap.login.path} className="header__btn-auth">
              {t('signLogin')}
            </Link>
            <span className="header__text">{t('signTextOr')}</span>
            <Link to={routesMap.register.path} className="header__btn-auth">
              {t('signRegister')}
            </Link>
            <div className="header__lang">
              <Language />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
