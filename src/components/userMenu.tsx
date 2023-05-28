import { getAuth, signOut } from 'firebase/auth';
import { FC, useState } from 'react';
import { useTypedTranslation } from '../i18n/hooks';
import { Language } from './language';
import { useAppDispatch } from './../store/hooks';
import { setIsAuth } from './../store/slices/auth';

export const UserMenu: FC = () => {
  const [isOpenLang, setIsOpenLang] = useState(false);
  const { t } = useTypedTranslation();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setIsAuth(false));
    signOut(auth);
  };

  const handleClickLanguage = () => {
    setIsOpenLang(true);
  };

  return (
    <div className="user-menu">
      {isOpenLang ? (
        <Language />
      ) : (
        <button className="user-menu__content" onClick={handleClickLanguage}>
          {t('language')}
        </button>
      )}

      <button className="user-menu__content" onClick={handleClick}>
        {t('signOut')}
      </button>
    </div>
  );
};
