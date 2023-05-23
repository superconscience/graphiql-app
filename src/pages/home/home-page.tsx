import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { routesMap } from '../../routes';
import { useTypedTranslation } from '../../i18n/hooks';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth';

export const HomePage: FC = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const { t } = useTypedTranslation();
  return (
    <>
      <div className="homePage__container">
        <div className="homePage__logo"></div>
        {isAuth && (
          <div className="homePage__button">
            <span>{t('welcome')}</span>
            <NavLink to={routesMap.graphiql.path} className="homePage__link">
              GraphQL!
            </NavLink>
          </div>
        )}
        <div className="homePage__description">{t('homeDescription')}</div>
      </div>
    </>
  );
};
