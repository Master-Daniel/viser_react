import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoute';
import Welcome from './dashboard/Welcome';
import Deposit from './dashboard/Deposit';
import Withdraw from './dashboard/Withdraw';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Welcome />
        </PrivateRoute>
      } />
      <Route path="/dashboard/deposit" element={
        <PrivateRoute>
          <Deposit />
        </PrivateRoute>
      } />
      <Route path="/dashboard/withdraw" element={
        <PrivateRoute>
          <Withdraw />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;
