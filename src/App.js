import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import UserLogin from "./Pages/User/Login/index"

const App = () => {
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/user/login" component={UserLogin} />
            </Switch>
        </Router> 
    </div>
  );
};

export default App;
