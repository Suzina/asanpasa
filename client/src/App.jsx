
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Categories from './Components/Categories/Categories';
import CategoryView from './Components/Categories/CategoryView';

import Products from './Components/Products/Products';
import ProductView from './Components/Products/ProductView';

import Orders from './Components/Orders/Orders';
import OrderView from './Components/Orders/OrderView';
import OrderAdd from './Components/Orders/OrderAdd';
import UpCommingOrders from './Components/Orders/UpCommingOrders';

import User from './Components/Users/User';

import RawMaterials from './Components/RawMaterials/RawMaterials';

import Vendors from './Components/Vendors/Vendors';

import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Components/NotFound';
import RequireAuth from './Components/RequireAuth';
import RedirectIfAuth from './Components/RedirectIfAuth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RedirectIfAuth />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/categories" element={<Categories />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/category/:id" element={<CategoryView />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/products" element={<Products />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/product/:id" element={<ProductView />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/order/add" element={<OrderAdd />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/order/:id" element={<OrderView />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/order/edit/:id" element={<OrderAdd />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/orders/upcomming-orders" element={<UpCommingOrders />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/users" element={<User />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/admin/raw-materials" element={<RawMaterials />} />
          </Route>
           <Route element={<RequireAuth />}>
            <Route path="/admin/vendors" element={<Vendors />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
