import "./App.css";
import { history } from "./helpers/history";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import UserForm from "./components/UserForm/Index";
import AccessData from "./components/AccessData";
import Contact from "./components/Contact/Index";
import Impressum from "./components/Impressum/Index";
import './i18n';
import { green, orange } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#1f1f1f',
    },
    secondary: {
      main: '#f50057',
    },
    
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={outerTheme}>
        <Router history={history}>
          <Switch>
          useEffect(() = {
          document.title = "Claimasylum"}, [])
              <Route exact path="/" component={UserForm} />
            
            <Route exact path="/accessdata" component={AccessData} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/impressum" component={Impressum} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

