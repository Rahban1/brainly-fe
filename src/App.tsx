import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from "./pages/Dashboard";
import { Signin }from './pages/Signin';
import { Signup } from './pages/Signup';
import { SharedContent } from './pages/SharedContent';
import { Home } from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/share/:shareLink" element={<SharedContent/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
