import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { lime } from "@material-ui/core/colors";
import Dashboard from "./Components/DashBoard/Dashboard";
const theme = createTheme({
  palette: {
    primary: lime,
    secondary: {
      main: "#ff8a65",
    },
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const getAuthenticated = () => {
    setAuthenticated(true);
  };

  console.log(localStorage.getItem("authenticated"));
  console.log("authenticated: " + authenticated);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard authenticated={authenticated} />
          </Route>
          <Route exact path="/login">
            <Login getAuthenticated={getAuthenticated} />
          </Route>
          <Route path="*" render={() => "404 not found!"} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
