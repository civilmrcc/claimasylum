import React, { useEffect, useState } from "react";
import UserPage from "../General/UserPage";
import { USER_DATA_KEY } from "../../helpers/variables";


import { useTranslation } from 'react-i18next';

const AccessData = () => {

  const { t } = useTranslation();


  return (
    <UserPage>
      <p className="centerText theme">{t('AccessDataValue')}</p>
    </UserPage>
  );
};


export default AccessData;
