import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { routesMap } from '../../routes';
import { useTypedTranslation } from '../../i18n/hooks';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth';

export const HomePage: FC = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const { t } = useTypedTranslation();
  return (
    <div className="homePage">
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
        <div className="homePage__description">
          <Link className="homePage__link" to="https://rs.school/" target="_blank">
            RS School
          </Link>
          is free-of-charge and community-based education program conducted by The Rolling Scopes
          developer community since 2013. Everyone can study at RS School, regardless of age,
          professional employment, or place of residence. The mentors and trainers of our school are
          front-end and javascript developers from different companies and countries.
        </div>
        <div className="homePage__description">
          <Link
            className="homePage__link"
            to="https://wearecommunity.io/events/rs-react-2023q1"
            target="_blank"
          >
            React course
          </Link>
          <span>Free | Online | In english</span>
          <div>
            Students of the RS School from the 2022Q3, which has passed RS School Stage #2 as well
            as new students with practical experience and knowledge of:
          </div>
          <ul className="homePage__list">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Git, GitHub</li>
            <li>NPM, Webpack</li>
            <li>CSS3 / HTML5</li>
            <li>Chrome DevTools, Figma</li>
            <li>Understanding of the REST</li>
          </ul>
        </div>

        <div className="homePage__description">
          <div>Our team:</div>
          <ul className="homePage__team">
            <li className="homePage__team-list">
              Team Leader -
              <Link
                className="homePage__team-item"
                to="https://github.com/superconscience"
                target="_blank"
              >
                superconscience
              </Link>
            </li>
            <li className="homePage__team-list">
              FE Developer -
              <Link
                className="homePage__team-item"
                to="https://github.com/Alex89198900"
                target="_blank"
              >
                alex89198900
              </Link>
            </li>
            <li className="homePage__team-list">
              FE Developer -
              <Link className="homePage__team-item" to="https://github.com/akiroi" target="_blank">
                akiroi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
