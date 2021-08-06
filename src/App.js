import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./Pages/User/Login/index"
import AdminLogin from "./Pages/Admin/Login/index"
import AdminDetailsForm from "./Pages/Admin/Form/index"
import LandingPage from "./Pages/index";
import Navbar from "./Components/Navigation/index";
import 'semantic-ui-css/semantic.min.css'
import UserProvider from './Providers/UserProvider';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/user/login" component={UserLogin} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/admin/details" component={AdminDetailsForm} />
              <Route exact path="/" component={LandingPage} />
            </Switch>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
