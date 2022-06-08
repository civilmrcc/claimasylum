import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer__inner">
        <Link to="/impressum">{t('Impressum')}</Link>
        <Link to="/contact">{t('Contact')}</Link>
        <Link to="/accessdata">{t('Access Data')}</Link>
      </div>
    </div>
  );
};

export default Footer;
