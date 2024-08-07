import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/cors/Auth/PrivateRoute';
import AdminHome from './components/Admin/AdminHome';
import Products from './components/Admin/Products';
import ProductStock from './components/Admin/ProductStock';
import AddNewProduct from './components/Admin/AddNewProduct';
import Cart from "./pages/Cart";
import SpecificProduct from './components/cors/common/SpecificProduct';
import Error from './components/cors/Auth/Error';
function App() {
  return (
    <Routes>
      <Route path="/" element={
          <Signup/>
        }></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path='/error' element={<Error/>}></Route>
      <Route path="/home" element={
        <PrivateRoute>
          <Home/> 
        </PrivateRoute>
        }></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/cart" element={
        <PrivateRoute>
          <Cart/>
        </PrivateRoute>
        } />
      <Route path="/products/:id" element={ <PrivateRoute><SpecificProduct/></PrivateRoute>  } />
      <Route path="/adminhome" element={ <PrivateRoute><AdminHome /></PrivateRoute>}>
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="productstocks" element={<ProductStock />} />
          <Route path="addnewproduct" element={<AddNewProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
