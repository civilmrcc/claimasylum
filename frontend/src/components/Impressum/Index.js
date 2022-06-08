import React from "react";
import UserPage from "../General/UserPage";
import { useTranslation } from 'react-i18next';

const Impressum = () => {
  const { t } = useTranslation();
  return (
    <UserPage>
      <h1 className="centerText theme">{t('Impressum')}</h1>
    </UserPage>
  );
};

export default Impressum;
