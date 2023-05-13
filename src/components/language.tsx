import { FC } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from './Radio';

export const Language: FC = () => {
  const [language, setLanguage] = React.useState(localStorage.getItem('i18nextLng') || 'en');
  const { i18n, t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value as string);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language">
      <Radio
        name="lang"
        value="en"
        label={t('en')}
        checked={language === 'en'}
        onChange={handleChange}
      />
      <Radio
        name="lang"
        value="ru"
        label={t('ru')}
        checked={language === 'ru'}
        onChange={handleChange}
      />
      <Radio
        name="lang"
        value="ua"
        label={t('ua')}
        checked={language === 'ua'}
        onChange={handleChange}
      />
    </div>
  );
};
