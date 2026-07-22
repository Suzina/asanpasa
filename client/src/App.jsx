import './assets/css/custom.css'

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Categories from './Components/Categories/Categories';
import CategoryView from './Components/Categories/CategoryView';

import Products from './Components/Products/Products';
import ProductView from './Components/Products/ProductView';


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
            <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
