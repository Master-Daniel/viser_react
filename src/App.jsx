import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoute';
import Welcome from './dashboard/Welcome';
import FDRList from './dashboard/fdr/list';
import FDRPlansPage from './dashboard/fdr/Plans';
import LoanPlansPage from './dashboard/loans/Plans';
import DPSList from './dashboard/dps/List';
import Airtime from './dashboard/Airtime';
import TransfersList from './dashboard/transfer/list';
import WithinTransfer from './dashboard/transfer/Within';
import Others from './dashboard/transfer/Others';
import WireTransfer from './dashboard/transfer/Wire';
import Transactions from './dashboard/Transactions';
import SupportTicket from './dashboard/support/Tickets';
import NewTicket from './dashboard/support/NewTicket';
import Profile from './dashboard/settings/profile';
import TwoFactor from './dashboard/settings/2factor';
import Password from './dashboard/settings/Password';
import WithdrawHistory from './dashboard/withdraw/history';
import Withdraw from './dashboard/withdraw/withdraw';
import Register from './Register';
import DepositHistory from './dashboard/deposit/history';
import Deposit from './dashboard/deposit/deposit';
import LoanPreview from './dashboard/loans/LoanPreview';
import BeneficiariesWithin from './dashboard/transfer/beneficiaries-within';
import Confirm from './dashboard/deposit/confirm';
import Otp from './dashboard/Otp';
import LoanList from './dashboard/loans/List';
import WithdrawPreview from './dashboard/withdraw/preview';
import ConfirmWireTransfer from './dashboard/transfer/confirmWireTransfer';
import BeneficiariesOthers from './dashboard/transfer/beneficiaries-others';
import ViewTicket from './dashboard/support/viewTicket';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/dashboard/welcome" element={
        <PrivateRoute>
          <Welcome />
        </PrivateRoute>
      } />
      <Route path="/dashboard/deposit/history" element={
        <PrivateRoute>
          <DepositHistory />
        </PrivateRoute>
      } />
      <Route path="/dashboard/deposit/confirm" element={
        <PrivateRoute>
          <Confirm />
        </PrivateRoute>
      } />
      <Route path="/dashboard/deposit" element={
        <PrivateRoute>
          <Deposit />
        </PrivateRoute>
      } />
      <Route path="/dashboard/withdraw/history" element={
        <PrivateRoute>
          <WithdrawHistory />
        </PrivateRoute>
      } />
      <Route path="/dashboard/withdraw/preview/:trx" element={
        <PrivateRoute>
          <WithdrawPreview />
        </PrivateRoute>
      } />
      <Route path="/otp-verification/:id/:section?/:action?/:optional?" element={
        <PrivateRoute>
          <Otp />
        </PrivateRoute>
      } />
      <Route path="/dashboard/withdraw" element={
        <PrivateRoute>
          <Withdraw />
        </PrivateRoute>
      } />
      <Route path="/dashboard/fdr/list" element={
        <PrivateRoute>
          <FDRList />
        </PrivateRoute>
      } />
      <Route path="/dashboard/fdr/plans" element={
        <PrivateRoute>
          <FDRPlansPage />
        </PrivateRoute>
      } />
      <Route path="/dashboard/loan/list" element={
        <PrivateRoute>
          <LoanList />
        </PrivateRoute>
      } />
      <Route path="/dashboard/loan/plans" element={
        <PrivateRoute>
          <LoanPlansPage />
        </PrivateRoute>
      } />
      <Route path="/dashboard/loan/application-preview" element={
        <PrivateRoute>
          <LoanPreview />
        </PrivateRoute>
      } />
      <Route path="/dashboard/dps/list" element={
        <PrivateRoute>
          <DPSList />
        </PrivateRoute>
      } />
      <Route path="/dashboard/mobile-top-up" element={
        <PrivateRoute>
          <Airtime />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/all" element={
        <PrivateRoute>
          <TransfersList />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/with-in" element={
        <PrivateRoute>
          <WithinTransfer />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/others" element={
        <PrivateRoute>
          <Others />
        </PrivateRoute>
      } />
      <Route path="/dashboard/wire-transfer/confirm/:trx" element={
        <PrivateRoute>
          <ConfirmWireTransfer />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/wire" element={
        <PrivateRoute>
          <WireTransfer />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/beneficiaries/within" element={
        <PrivateRoute>
          <BeneficiariesWithin />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transfer/beneficiaries/others" element={
        <PrivateRoute>
          <BeneficiariesOthers />
        </PrivateRoute>
      } />
      <Route path="/dashboard/transactions" element={
        <PrivateRoute>
          <Transactions />
        </PrivateRoute>
      } />
      <Route path="/dashboard/support/list" element={
        <PrivateRoute>
          <SupportTicket />
        </PrivateRoute>
      } />
      <Route path="/dashboard/support/ticket/view/:id" element={
        <PrivateRoute>
          <ViewTicket />
        </PrivateRoute>
      } />
      <Route path="/dashboard/support/ticket/new" element={
        <PrivateRoute>
          <NewTicket />
        </PrivateRoute>
      } />
      <Route path="/dashboard/settings/profile-setting" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/dashboard/settings/change-password" element={
        <PrivateRoute>
          <Password />
        </PrivateRoute>
      } />
      <Route path="/dashboard/settings/twofactor" element={
        <PrivateRoute>
          <TwoFactor />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;
