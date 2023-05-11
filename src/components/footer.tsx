import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__course-container">
          <Link className="footer__course-link" to="https://rs.school/js/" target="_blank">
            <img className="footer__course-icon" src="./rs-logo.svg" alt="rs-school logo" />
          </Link>
          <div className="footer__year">©2023</div>
        </div>
        <div className="footer__develops">
          <Link
            className="footer__develop-1"
            to="https://github.com/superconscience"
            target="_blank"
          >
            superconscience
          </Link>
          <Link className="footer__develop-2" to="https://github.com/Alex89198900" target="_blank">
            alex89198900
          </Link>
          <Link className="footer__develop-3" to="https://github.com/akiroi" target="_blank">
            akiroi
          </Link>
        </div>
      </div>
    </footer>
  );
};
