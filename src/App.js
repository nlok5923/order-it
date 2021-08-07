import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./Pages/User/Login/index"
import AdminLogin from "./Pages/Admin/Login/index"
import AdminDetailsForm from "./Pages/Admin/Form/index"
import LandingPage from "./Pages/index";
import RestaurantDashboard from "./Pages/Admin/Dashboard/dashboard"
import Navbar from "./Components/Navigation/Navbar/Navbar";
import DishPage from "./Components/Page/Page"
import addDishPage from "./Pages/Admin/addDishes/addDish"
import UserCart from "./Pages/User/Cart/Cart";
import PaymentMethod from "./Pages/User/PaymentMethod/PaymentMethod";
import ShippingForm from "./Pages/User/Shipping/Shipping";
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
              <Route exact path="/restaurant/details" component={AdminDetailsForm} />
              <Route exact path="/restaurant" component={RestaurantDashboard} />
              <Route exact path="/restaurant/add-dish" component={addDishPage} />
              <Route exact path="/admin/details" component={AdminDetailsForm} />
              <Route exact path="/user/cart" component={UserCart} />
              <Route exact path="/user/cart/payment" component={PaymentMethod} />
              <Route exact path="/user/cart/shipping" component={ShippingForm} />
              <Route exact path="/dish" component={DishPage} />
              <Route exact path="/" component={LandingPage} />
            </Switch>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
