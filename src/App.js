import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/register';
import Logined from '~/pages/Logined';
import Admin from '~/pages/Admin';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Logined />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
