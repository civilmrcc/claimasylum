import React from "react";
import UserPage from "../General/UserPage";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <UserPage>
      <h1 className="centerText theme">{ t('Contact') }</h1>
      <p className="centerText theme">{ t('ContactValue') }</p>
    </UserPage>
  );
};

export default Contact;
