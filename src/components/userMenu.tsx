import { FC, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Language } from './language';
import { useTranslation } from 'react-i18next';

export const UserMenu: FC = () => {
  const [isOpenLang, setIsOpenLang] = useState(false);
  const { t } = useTranslation();
  const auth = getAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    signOut(auth);
  };

  const handleClickLanguage = () => {
    setIsOpenLang(true);
  };

  return (
    <div className="menu">
      {isOpenLang ? (
        <Language />
      ) : (
        <button className="menu__content" onClick={handleClickLanguage}>
          {t('language')}
        </button>
      )}

      <button className="menu__content" onClick={handleClick}>
        {t('signOut')}
      </button>
    </div>
  );
};
