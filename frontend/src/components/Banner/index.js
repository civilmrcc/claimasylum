import { Banner } from "material-ui-banner";
import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
import { Paper, Button, Typography } from "@material-ui/core";


const useStyle = makeStyles(theme => ({
  button: {
    margin: 10,
    height: 250,
    background: "rgb(120, 169, 230)",
    border: "1px solid rgb(58, 148, 207)",
    display: "flex"
  },
  typo: {
    marginTop: 2,
    marginLeft: 10,
    background: "inherit",
    flexGrow: 1,
  },
  success: {
    height: 36,
    margin: -7,
    display: "flex",
    border: "1px solid green",
    background: "lightgreen",
    content: "Success",
  },
  error: {
    margin: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    border: "1px solid red",
    content: "failure"
  }
}
));

export default () => {

  const { t, i18n } = useTranslation();
  const [show, hide] = React.useState(true);
  const [success, change] = React.useState(null);
  const classes = useStyle();
  const Switch = () => change(!success);
  const Dismiss = () => {
    hide(!show);
  };
  return (
    <Fragment>
      {show ? (
        <Paper
          className={success ? classes.success : classes.error}
          square
          elevation={2}
        >
          <Typography className={classes.typo}>{t('Banner')}</Typography>
          <Button
            onClick={Dismiss}
            style={{ borderRadius: "100%", height: 35, width: 25 }}
          >
            x
          </Button>
        </Paper>
      ) : null}
    </Fragment>
  );
};

