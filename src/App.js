import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./Pages/User/Login/index"
import AdminLogin from "./Pages/Admin/Login/index"
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/user/login" component={UserLogin} />
              <Route exact path="/admin/login" component={AdminLogin} />
            </Switch>
        </Router> 
    </div>
  );
};

export default App;
