import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./Pages/User/Login/index"
import AdminLogin from "./Pages/Admin/Login/index"
import LandingPage from "./Pages/index";
import 'semantic-ui-css/semantic.min.css'
import UserProvider from './Providers/UserProvider';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/user/login" component={UserLogin} />
            <Route exact path="/admin/login" component={AdminLogin} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
