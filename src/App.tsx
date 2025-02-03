import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard";
import { Signin }from './pages/Signin';
import { Signup } from './pages/Signup';
import { SharedContent } from './pages/SharedContent';
import { Home } from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/share/:shareLink" element={<SharedContent/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
