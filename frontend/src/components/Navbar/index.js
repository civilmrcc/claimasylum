import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PublicIcon from '@mui/icons-material/Public';
import { Collapse } from '@mui/material';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const width = window.innerWidth;

  const [openLangMenu, setOpenLangMenu] = React.useState(false);
  const [lang, setLang] = React.useState("EN");
  const [redirect, setRedirect] = React.useState(false);
  const { t, i18n } = useTranslation();
  const callRedirect = () => setRedirect(true);
  const redirectMeToHome = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
  };

  function handleLang(e) {
    console.log(e.target.dataset.code);
    i18n.changeLanguage(e.target.dataset.code);
    localStorage.setItem('language', e.target.dataset.code);
  }

  function getFullLang(short) {
    switch(short) {
      case "en":
        return "English";
      case "tr":
        return "Türkçe";
      case "ar":
        return "عربي";
      case "fa":
        return "فارسی";
      case "fr":
        return "Français";
       case "sp":
         return "Soomaali";
      }
  }

  const language = localStorage.getItem('language');
  return (
    <Box>
      {redirectMeToHome()}

      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <HomeOutlinedIcon onClick={callRedirect} />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
          { t('claim-asylum.eu')}
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => handleLang(e)}
              style={{ display: "flex", justifyContent: "end", alignItems:"center", gap: 20 }}
            >
              <Collapse orientation={width > 600 ? 'horizontal': 'vertical'} in={openLangMenu} className="langMenu">
              <div style={{ display: "flex", justifyContent: "end", alignItems:"center", gap: 20 }} >
              <p style={{cursor: 'pointer', textDecoration: language === 'en'? 'underline' : null}} onClick={handleLang} data-code="en">English</p>
              <p style={{cursor: 'pointer', textDecoration: language === 'tr'? 'underline' : null}} onClick={handleLang} data-code="tr">Türkçe</p>
              <p style={{cursor: 'pointer', textDecoration: language === 'fa'? 'underline' : null}} onClick={handleLang} data-code="fa">فارسی</p>
              <p style={{cursor: 'pointer', textDecoration: language === 'ar'? 'underline' : null}} onClick={handleLang} data-code="ar">عربي</p>
              <p style={{cursor: 'pointer', textDecoration: language === 'fr'? 'underline' : null}} onClick={handleLang} data-code="fr">Français</p>
              <p style={{cursor: 'pointer', textDecoration: language === 'so'? 'underline' : null}} onClick={handleLang} data-code="so">Soomaali</p>
              </div>
              </Collapse>
              <p style={{fontWeight: 600}}>{getFullLang(language)}</p>
              <PublicIcon style={{cursor: 'pointer'}} onClick={() => setOpenLangMenu(!openLangMenu)} />
            </RadioGroup>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
}