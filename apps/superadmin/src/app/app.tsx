// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './privacyPolicy';
import { NavBar } from '../components/navbar/Topbar';
import Home from '../pages/home';
import Merchant from '../pages/merchant';
import Settings from '../pages/settings';
import OrdersCount from '../pages/merchant/stats';
import { LoadComponent } from '../pages/settings/Template/LoadComponent';
import { AddTemplate } from '../pages/settings/Template/AddTemplate';
import { TemplateEditor } from '../pages/settings/Template/TemplateEditor';
export function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <NavBar>
              <Outlet />
            </NavBar>
          }
        >
          <Route index element={<Home />} />
          <Route path="merchant" element={<Merchant />} />
          <Route path="stats/:clientId" element={<OrdersCount />} />
          <Route path="settings">
            <Route index element={<Settings />} />
            <Route path="privacy" element={<PrivacyPolicy path="privacy" />} />
            <Route path="tac" element={<PrivacyPolicy path="tac" />} />
            <Route path="refund" element={<PrivacyPolicy path="refund" />} />
            <Route path="mailtemplates" element={<LoadComponent />}>
              <Route index element={<AddTemplate />} />
              <Route path=":name" element={<TemplateEditor />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
