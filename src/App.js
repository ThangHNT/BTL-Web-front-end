import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/register';
import Logined from '~/pages/Logined';
import Admin from '~/pages/Admin';
import NotFound from '~/pages/NotFound';
import BookDetail from '~/pages/BookDetail';
import Order from '~/pages/Order';
import Cart from '~/pages/Cart';
import AddBook from '~/pages/AddBook';
import EditBook from '~/pages/EditBook';

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
                    <Route path="/user">
                        <Route path="cart" element={<Cart />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin">
                        <Route index path="" element={<Admin />} />
                        <Route path="add-book" element={<AddBook />} />
                        <Route path="edit-book">
                            <Route path=":bookId" element={<EditBook />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
