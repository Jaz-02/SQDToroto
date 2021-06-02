import "./App.css";
import Map from "./Map";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LagunaOm from "./LagunaOm";
import NuevoBacal from "./NuevoBecal";
import MasInfo from "./MasInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (<div className="App">
    
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Map />
        </Route>
        <Route exact path="/lagunaOm">
          <LagunaOm />
        </Route>
        <Route exact path="/nuevobecal">
          <NuevoBacal />
        </Route>
        <Route exact path="/MasInfo">
          <MasInfo />
        </Route>
      </Switch>
      <Footer />
    </Router>
    
    
  </div>);
}
export default App;