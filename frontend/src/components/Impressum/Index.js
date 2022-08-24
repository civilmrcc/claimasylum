import React, { useEffect } from "react";
import UserPage from "../General/UserPage";
import { useTranslation } from 'react-i18next';

const Impressum = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const language = localStorage.getItem('language');

    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <UserPage>
      <h1 className="centerText theme">{t('Impressum')}</h1>
      <p className="centerText theme">{t('ImpressumValue')}</p>
    </UserPage>
  );
};

export default Impressum;
