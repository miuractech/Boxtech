// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './privacyPolicy';
export function App() {
  return (
    <div>
      <Routes>
        <Route path="privacy" element={<PrivacyPolicy path="privacy" />} />
        <Route path="tac" element={<PrivacyPolicy path="tac" />} />
        <Route path="refund" element={<PrivacyPolicy path="refund" />} />S
      </Routes>
    </div>
  );
}

export default App;
