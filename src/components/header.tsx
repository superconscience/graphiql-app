import { FC, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '../routes';
import { Language } from './language';
import { Modal } from './modal';

export const Header: FC = () => {
  const [isModal, setIsModal] = useState(false);
  const refModal = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (refModal.current && !refModal.current?.contains(target)) {
      setIsModal(false);
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
              <Link to={routesMap.home.path}>Home</Link>
            </li>
            <li className="header__item">
              <Link to={routesMap.graphiql.path}>Editor</Link>
            </li>
          </ul>
        </nav>
        <div className="header__user">
          <Language />
          <img onClick={() => setIsModal(true)} className="header__user-icon" src="./user.svg" />
          <div className="header__user-menu" ref={refModal}>
            {isModal && <Modal />}
          </div>
        </div>
      </div>
    </header>
  );
};
