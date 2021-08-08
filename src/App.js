import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./Pages/User/Login/index"
import AdminLogin from "./Pages/Admin/Login/index"
import AdminDetailsForm from "./Pages/Admin/Form/index"
import LandingPage from "./Pages/index";
import RestaurantDashboard from "./Pages/Admin/Dashboard/dashboard"
import Navbar from "./Components/Navigation/Navbar/Navbar";
import DishPage from "./Pages/Page/Page"
import addDishPage from "./Pages/Admin/addDishes/addDish"
import EditDishPage from "./Pages/Admin/EditDish/EditDish"
import UserCart from "./Pages/User/Cart/Cart";
import SearchPage from "./Pages/User/Search/Search"
import PaymentMethod from "./Pages/User/PaymentMethod/PaymentMethod";
import ShippingForm from "./Pages/User/Shipping/Shipping";
import UserOrders from "./Pages/User/Orders/Order"
import 'semantic-ui-css/semantic.min.css'
import Footer from "./Components/Footer/Footer";
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
              <Route exact path="/restaurant/edit-dish" component={EditDishPage} />
              <Route exact path="/admin/details" component={AdminDetailsForm} />
              <Route exact path="/user/cart" component={UserCart} />
              <Route exact path="/user/cart/payment" component={PaymentMethod} />
              <Route exact path="/user/cart/shipping" component={ShippingForm} />
              <Route exact path="/user/orders" component={UserOrders} />
              <Route exact path="/restaurant/:id" component={DishPage} />
              <Route exact path="/search/:pinCode/:searchText" component={SearchPage} />
              <Route exact path="/" component={LandingPage} />
            </Switch>
            <Footer />
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;