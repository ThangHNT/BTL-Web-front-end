import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/register';
import Logined from '~/pages/Logined';
import Admin from '~/pages/Admin';
import NotFound from '~/pages/NotFound';
import BookDetail from '~/pages/BookDetail';
import Order from '~/pages/Order';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Logined />} />
                    <Route path="/book">
                        <Route path="detail">
                            <Route path=":bookId" element={<BookDetail />} />
                        </Route>
                        <Route path="order">
                            <Route path=":bookId" element={<Order />} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
