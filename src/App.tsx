import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard";
import { Signin }from './pages/Signin';
import { Signup } from './pages/Signup';
import { SharedContent } from './pages/SharedContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/share/:shareLink" element={<SharedContent/>} />

      </Routes>
    </Router>
  )
}

export default App
