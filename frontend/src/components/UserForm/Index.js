import React, { useState, useEffect, useRef } from "react";
import { Grid, Button } from "@mui/material";
import UserPage from "../General/UserPage";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FormLabel, TextField, Box, Typography } from "@mui/material";
import useData from "../../hooks/useData";
import { USER_DATA_KEY } from "../../helpers/variables";
import SignaturePad from "react-signature-canvas";
import Checkbox from '@mui/material/Checkbox';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import InfoIcon from '@mui/icons-material/Info';
import Map from '../OpenstreetMap/Index';
import { Link } from "react-router-dom";


import { useTranslation } from 'react-i18next';


export default function UserForm() {

  const fileInput = React.useRef();

  const { t, i18n } = useTranslation();

  // const handleClick = (e) => {
  //   i18n.changeLanguage(e.target.value)
  // };

  const { sendFormData } = useData();


  const [lang, setLang] = useState("en");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: null,
    placeOfBirth: "",
    phone: null,
    asylum: null,
    geolocationCorrect: null,
    underage: null,
    signature: null,
    passport: "",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/678111-map-marker-512.png",

  });
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [privacy, setPrivacy] = useState(false);

  const [captcha, setCaptch] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])



  const [info, setInfo] = useState(false);
  const [apply, setApply] = useState(false);

  const [vulOpen, setVulOpen] = useState(false);
  const [famBOpen, setfamBOpen] = useState(false);

  const [locationInfo, setLocationInfo] = useState({
    location: {},
    center: {
      lat: 36.41319,
      lng: 22.27239,
    },
    zoom: 11,
  });

  const sigCanvas = useRef({});

  useEffect(() => {
    loadCaptchaEnginge(6); 
    navigator.geolocation.getCurrentPosition(function (position) {
      locationInfo.location.lat = position.coords.latitude;
      locationInfo.location.lng = position.coords.longitude;
      locationInfo.center.lat = position.coords.latitude;
      locationInfo.center.lng = position.coords.longitude;
      setLocationInfo({ ...locationInfo });
    });


    const language = localStorage.getItem('language');

    if (language) {
      i18n.changeLanguage(language);
    }

  }, []);





  function handleChange(e) {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }


  function imagePreviewer(e) {

    console.log(e.target.files[0]);
  }


  async function submitForm() {

    let jsonContent = JSON.stringify(form);
    console.log(jsonContent);

    for (const prop in form) {
      if (prop !== "passport") {
        if (!form[prop]) {
          return alert("Please fill the form correctly!");
        }
      }
    }

    alert("Form added successfully!");

    form.locationInfo = locationInfo;
    // Save data in local storage since apis are not working yet so to show this data on other page we will mimic data storage.
     jsonContent = JSON.stringify(form);
    localStorage.setItem(USER_DATA_KEY, jsonContent);

    // this api call throw an network error since api does not exist actually right now. This is just to mimic api call process
    await sendFormData(form);

    // const fileName = "output";
    // const json = jsonContent;
    // const blob = new Blob([json], { type: "application/json" });
    // const href = await URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = href;
    // link.download = fileName + ".json";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }

  const outerGridStyle = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "top",
    width: "100%",
    padding: "0 5%",
    marginTop: "1rem",
  };

  const enclosingGrid = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  };

  const clearSignature = () => sigCanvas.current.clear();

  const saveSignature = () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setForm({ ...form, signature });
  };

  const inputConStyle = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    width: "100%",
    padding: "0 5%",
    marginTop: "1rem",
  };


  const language = localStorage.getItem('language');

  const onSubmitCaptcha = () => {
    if(validateCaptcha(captcha) === true) {
      setIsCaptchaValid(true);
    } 
    else {
      alert('Captcha Does Not Match');
      setIsCaptchaValid(false);
    }
  }

  return (

    <UserPage>
      <Grid container>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          width="100%"
          padding="0 5%"
        >

         
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          width="100%"
          padding="0 5%"
        >
          <Grid item>
            <Typography variant="h6" component="h2" sx={{ width: "100%", marginTop: "2em", marginBottom: "2em", marginTop: "2em", textAlign: "center" }}>
            {t('languageDescription')}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={12}
          md={12}
          lg={12}
        >
          <a href="#form" className="linkBtn">
            {t('Apply')}
          </a>
          <a href="#info" className="linkBtn">
            {t('Info')}
          </a>
        </Grid>
      </Grid>

      <div id="form">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid {...outerGridStyle} container>
            <FormControl sx={enclosingGrid}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                {t('Apply asylum?')}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="asylum"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "1.5rem" }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={t('Yes')}
                  style={{ padding: 0 }}
                />
                <FormControlLabel value="no" control={<Radio />} label={t('No')} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item {...inputConStyle}>
            
            <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Name')} </Typography>
            <TextField
              value={form.name}
              type="text"
              name="name"
              id=""
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>
          <Grid item {...inputConStyle}>
          <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Email')} <span tabindex="0" title={t("Email info")}><InfoIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: '4px' }} /></span></Typography>
            <TextField
              value={form.email}
              type="email"
              name="email"
              id=""
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>
          <Grid item {...inputConStyle}>
            <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Date Of Birth')} </Typography>
            <TextField
              value={form.dob}
              type="date"
              name="dob"
              id=""
              focused
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>
          <Grid item {...inputConStyle}>
            <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Place of Birth')} </Typography>
            <TextField
              value={form.placeOfBirth}
              type="text"
              name="placeOfBirth"
              id=""
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>
          <Grid item {...inputConStyle}>
          <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Phone No')} <span tabindex="0" title={t("Phone info")}><InfoIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: '4px' }} /></span></Typography>
            <TextField
              value={form.phone}
              type="text"
              name="phone"
              id=""
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>

          <Grid container {...outerGridStyle}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{display: "flex", justifyContent: "center"  }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {t('Are you underage?')}
                </FormLabel>
                <span tabindex="0" title={t("Are you a minor")}><InfoIcon sx={{ fontSize: 16, marginLeft: '4px', color: '#6a6a6a' }} /></span>
              </div>
                
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="underage"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "1.5rem" }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={t('Yes')}
                  style={{ padding: 0 }}
                />
                <FormControlLabel value="no" control={<Radio />} label={t('No')} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid container {...outerGridStyle}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{display: "flex", justifyContent: "center"  }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {t('Is geolocation correct?')}
                </FormLabel>
                <span tabindex="0" title={t("Geolocation")}><InfoIcon sx={{ fontSize: 16, marginLeft: '4px', color: '#6a6a6a' }} /></span>
              </div>
             
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="geolocationCorrect"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "1.5rem" }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={t('Yes')}
                  style={{ padding: 0 }}
                />
                <FormControlLabel value="no" control={<Radio />} label={t('No')} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid container {...outerGridStyle}>
            <Grid item sm={12} lg={12}>

            </Grid>

            {locationInfo.center.lat && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Map />
              </Grid>
            )}
          </Grid>


          <Grid item {...inputConStyle}>
            <div>
              <div><p>{t('TextPhoto')}</p></div>
              <div style={{display:'inline-block',width:'20%'}}>
                <Button
                  style={{ width: '100%', backgroundColor: '#ec5e2a'}}
                  variant="contained"
                  onClick={() => fileInput.current.click()}
                >
                  {t('upload file')}
                </Button>

                <input
                  ref={fileInput}
                  type="file"
                  name="image"
                  id=""
                  style={{ display: 'none' }}
                  onChange={(e) => onSelectFile(e)}
                  required
                />
              </div>
              <Grid>
          </Grid>
              <div style={{ display: "inline-block", float: "right", width: "50%", textAlign: "center" }}>
                {selectedFile && <img style={{ height: "200px", borderRadius: "5px" }} src={preview} />}
              </div>
            </div>


          </Grid>





          {/* <Grid {...outerGridStyle} marginTop='1rem' className='descCont'>
            <div className="flexed" onClick={() => setVulOpen((pS) => !pS)}>
              <h3 className="theme">{t('Vulnerablities')}</h3>
              <i
                className={`fa fa-angle-${!famBOpen ? "down" : "up"} `}
                style={{
                  fontSize: "2rem",
                  color: "#1976d2",
                  marginLeft: "0.5rem",
                  marginTop: "0.2rem",
                }}
              ></i>
             </div>

            {vulOpen && (
              <p style={{ marginTop: "-0.5rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                enim at blanditiis rerum repellat sint amet, maiores, autem
                aliquam cupiditate, possimus quam earum officiis sequi. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. At tempora
                quisquam dolorem, maiores veritatis exercitationem itaque
                eligendi ipsum impedit vel ad nulla repellat error nostrum.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                autem natus reiciendis ad, sint nobis, optio facilis itaque,
                cumque eaque a quos molestiae delectus voluptates.
              </p>
            )}
          </Grid>
          <Grid container {...outerGridStyle} marginTop="0"  className='descCont'>
            <div className="flexed" onClick={() => setfamBOpen((pS) => !pS)}>
              <h3 className="theme">{t('Family Bindings')}</h3>
              <i
                className={`fa fa-angle-${!famBOpen ? "down" : "up"} `}
                style={{
                  fontSize: "2rem",
                  color: "#1976d2",
                  marginLeft: "0.5rem",
                  marginTop: "0.2rem",
                }}
              ></i>
            </div>
            {famBOpen && (
              <p style={{ marginTop: "-0.5rem" }}>
                {t('Family Bindings Value')}
             
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              enim at blanditiis rerum repellat sint amet, maiores, autem
              aliquam cupiditate, possimus quam earum officiis sequi. quisquam
              dolorem, maiores veritatis exercitationem itaque eligendi ipsum
              impedit vel ad nulla repellat error nostrum. Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. Beatae autem natus
              reiciendis ad, sint nobis, optio facilis itaque, cumque eaque a
              quos molestiae delectus voluptates.
              </p>
            )}
          </Grid> */}

          <Grid item {...inputConStyle}>
          <h4 className="theme" style={{display: "flex", alignItems : "center"}} >{t('Sign bellow(Draw)')}  <span tabindex="0" title={t("Signature")}><InfoIcon sx={{ fontSize: 16, marginLeft: '3px', marginTop: '4px' }} /></span></h4>
            <div className="signature__box">
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
            </div>
            <div className="signature__buttons">
              <div className="signature__buttons__icons">
                <i class="fa fa-undo" onClick={clearSignature}></i>
                <i className="fa fa-save" onClick={saveSignature}></i>
              </div>
            </div>
          </Grid>
          <Grid item {...inputConStyle}>
          <Typography color={'#6a6a6a'} style={{alignItems: 'center', display: 'flex'}}>{t('Passwort (Not mandatory)')} <span tabindex="0" title={t("Pass info")}><InfoIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: '4px' }} /></span></Typography>
            <TextField
              value={form.passwort}
              type="text"
              name="passwort"
              id=""
              sx={{ width: "100%" }}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>
            
          <div>
              <a href='/impressum'>{t('Privacy')}</a> <Checkbox checked={privacy} onChange={ (e) => setPrivacy(e.target.checked) } style={{alignItems: 'center', display: 'flex'}}inputProps={{'aria-label': 'Checkbox demo'}} />
            </div>
            <div>
              <a href='/impressum'>{t('Statistics')}</a> <Checkbox checked={privacy} onChange={ (e) => setPrivacy(e.target.checked) } style={{alignItems: 'center', display: 'flex'}}inputProps={{'aria-label': 'Checkbox demo'}} />
            </div>
            <div className="captcha">
              <LoadCanvasTemplateNoReload  onChange={(val) => console.log(val)} />
              <input type="text" value={captcha} onChange={(e) => setCaptch(e.target.value)} />
              <Button
                  style={{ width: '100%', backgroundColor: '#ec5e2a' }}
                  variant="contained"
                  onClick={onSubmitCaptcha}
                >
                  {t('Send captcha')}
                </Button>
            </div>
            <Grid item>
            <Typography variant="p" component="p" sx={{ width: "100%", textAlign: "center" }}>
            {t('SubmitText')}
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            sx={{ width: "200px", m: "10px",  }}
            onClick={submitForm}
            color="primary"
            disabled={!privacy || !isCaptchaValid}
          >
            {t('Submit')}
          </Button>

        </Grid>
      </div>


      <div id="info" style={{ marginBottom: "1rem" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "5ch" }}
        >
          <Grid item {...inputConStyle}>
            <Typography
              variant="h2"
              component="h2"
              style={{ fontWeight: "bold", fontSize: "25px" }}
              className="theme"
            >
              {t('Info')}
            </Typography>
          </Grid>
          <Grid item {...inputConStyle}>
            {t('Info Value')}
          </Grid>
        </Grid>
      </div>
      <div id="info" style={{ marginBottom: "15rem" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "5ch" }}
        >
          <Grid item {...inputConStyle}>
            <Typography
              variant="h2"
              component="h2"
              style={{ fontWeight: "bold", fontSize: "25px" }}
              className="theme"
            >
              {t('Further Support')}
            </Typography>
          </Grid>
          <Grid item {...inputConStyle}>
            {t('FurtherSupportText')}      
          </Grid>
        </Grid>
      </div>
    </UserPage>
  );
}
