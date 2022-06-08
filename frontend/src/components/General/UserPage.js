import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";

const UserPage = ({ children }) => {
  const [redirect, setRedirect] = useState(false);

  const callRedirect = () => setRedirect(true);

  const redirectMeToHome = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="userPage">
      {redirectMeToHome()}
      <Navbar />
      <div >
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default UserPage;
