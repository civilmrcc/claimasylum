import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";
 import Banner from "../Banner"

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
      <Banner />
      <div >
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default UserPage;
