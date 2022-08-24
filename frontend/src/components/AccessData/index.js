import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import UserPage from "../General/UserPage";
import useData from "../../hooks/useData";
import { USER_DATA_KEY } from "../../helpers/variables";


import { useTranslation } from 'react-i18next';

const AccessData = () => {

  const { t } = useTranslation();

  const [isLogged, setIsLogged] = useState(false);
  const { postAccessData, getFormData } = useData();
  const [data, setData] = useState();

  const [form, setForm] = useState({
    code: "",
    lastName: "",
  });

  useEffect(() => {
    let homeData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    console.log(homeData);
    setData(homeData);
  }, []);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async () => {
    for (let prop in form) {
      console.log(form);
      if (!form[prop]) return alert("Please fill the form correctly!");
    }


    await postAccessData(form);
    await getFormData();


    let homeData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    console.log(homeData);
    setData(homeData);
    setIsLogged(true)
  };

  return (
    <UserPage>
      <Grid container>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          width="100%"
          padding="0 5%"
        >
          {!isLogged ? (
            <>
              <Typography
                variant="h"
                component="h2"
                sx={{ color: "#1f1f1f", width: "100%", margin: "20px" }}
                className="centerText"
              >
                {t('access_data')}
              </Typography>
              <TextField
                type="number"
                name="code"
                label={t('Code')}
                onChange={changeHandler}
                id=""
                sx={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                type="text"
                name="lastName"
                label={t('last_name')}
                onChange={changeHandler}
                id=""
                sx={{ width: "100%", marginTop: "10px" }}
              />
              <div className="centerContent">
                <Button
                  variant="outlined"
                  sx={{ width: "200px", m: "10px", fontWeight: "bold" }}
                  color="primary"
                  onClick={submitHandler}
                >
                  {t('Submit')}
                </Button>
              </div>
            </>
          ) : (
            <div className="accessData__data">
              {data && <UserData data={data} />}
            </div>
          )}
        </Grid>
      </Grid>
      <p className="centerText theme">{t('AccessDataValue')}</p>
    </UserPage>
  );
};

const UserData = ({ data }) => {
  return (
    <div className="userData">
      <div className="userData__item">
        <b className="userData__heading">Name:</b>
        <span className="userData__content">{data.name}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Phone:</b>
        <span className="userData__content">{data.phone}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Email:</b>
        <span className="userData__content">{data.email}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Passport:</b>
        <span className="userData__content">{data.passport}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Date of Birth:</b>
        <span className="userData__content">{data.dob}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Place of Birth:</b>
        <span className="userData__content">{data.placeOfBirth}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Asylum:</b>
        <span className="userData__content">{data.asylum}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Underage:</b>
        <span className="userData__content">{data.underage}</span>
      </div>
      <div className="userData__item">
        <b className="userData__heading">Geolocation Correct:</b>
        <span className="userData__content">{data.geolocationCorrect}</span>
      </div>

      <div className="userData__signature">

        <img src={data.signature} alt="" />

      </div>
    </div>
  );
};

export default AccessData;
