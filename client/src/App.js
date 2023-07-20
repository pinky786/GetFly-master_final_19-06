import { useState, useEffect } from 'react';
import { useRoutes, Navigate ,useNavigate} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/dashboard/Dashboard';
import Login from './Pages/login/Login';
import AddBooks from './Pages/addbooks/AddBooks';
import IssueBooks from './Pages/issuebooks/IssueBooks';
import ReissueBooks from './Pages/reissuebooks/ReissueBooks';
import Report from './Pages/report/Report';
const localStorage = window.localStorage;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const isAuthenticated = !!token;
  useEffect(() => {
    // Save token to localStorage when it changes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const navigate=useNavigate()
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);

  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token', token);
    navigate('/');
  };

  const routes = useRoutes([
    {
      path: '/',
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: '/dashboard',
      element: isAuthenticated ? <Dashboard onLogout={handleLogout} token={token}/> : <Navigate to="/" replace />,
    },
    {
      path: '/addbooks',
      element: isAuthenticated ? <AddBooks onLogout={handleLogout} token={token}/> : <Navigate to="/" replace />,
    },
    {
      path: '/issuebooks',
      element: isAuthenticated ? <IssueBooks onLogout={handleLogout} token={token}/> : <Navigate to="/" replace />,
    },
    {
      path: '/reissuebooks',
      element: isAuthenticated ? <ReissueBooks onLogout={handleLogout} token={token}/> : <Navigate to="/" replace />,
    },
    {
      path: '/report',
      element: isAuthenticated ? <Report onLogout={handleLogout} token={token}/> : <Navigate to="/" replace />,
    },
  ]);

  return routes;
}

export default App;