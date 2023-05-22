import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { routesMap } from '../../routes';
//import { useTypedTranslation } from '../../i18n/hooks';
//import { Loader } from '../../components/loader';

export const HomePage: FC = () => {
  //const { t } = useTypedTranslation();
  return (
    <>
      <div className="homePage__container">
        {/*<h1>{t('homePageContent')}</h1>*/}
        <div className="homePage__logo"></div>

        <div className="homePage__button">
          <span>Welcome to</span>
          <NavLink to={routesMap.graphiql.path} className="homePage__link">
            GraphQL!
          </NavLink>
        </div>
        <div className="homePage__description">
          GraphQL is a query language for APIs and a runtime for fulfilling those queries with your
          existing data. GraphQL provides a complete and understandable description of the data in
          your API, gives clients the power to ask for exactly what they need and nothing more,
          makes it easier to evolve APIs over time, and enables powerful developer tools.
        </div>
      </div>
    </>
  );
};
