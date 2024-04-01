/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";
import "./App.css";
/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/AdminUserListScreen";
import UserEditScreen from "./screens/AdminUserEditScreen";
import ProductListScreen from "./screens/AdminProductListScreen";
import ProductEditScreen from "./screens/AdminProductEditScreen";
import OrderListScreen from "./screens/AdminOrderListScreen";
import Reviews from "./components/Reviews"; // Make sure the path is correct
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

/* REACT ROUTER */
import { HashRouter as Router, Route } from "react-router-dom";

import GoToTop from "./components/GoToTop";

function App() {
  return (
    <Router>
      <Header />
      {/* <OffcanvasExample/> */}
      <Container className="container-fluid mt-5">
        <main className="m">
          <GoToTop />
          <Route exact path="/" component={HomeScreen} />

          <Route path="/login" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />

          <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />

          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/editProfile" component={ProfileEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} />

          {/* <Route path="/products/:id/reviews" component={Reviews} /> */}
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
