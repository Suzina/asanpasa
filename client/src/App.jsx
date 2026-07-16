import './assets/css/custom.css'

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
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
         <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
