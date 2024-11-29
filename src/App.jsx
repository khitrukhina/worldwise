import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css'
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Homepage from './pages/Homepage.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './pages/AppLayout.jsx';
import Login from './pages/Login.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import { CitiesProvider } from './context/CitiesContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';


function App() {
    return <AuthProvider>
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Homepage/>} path="/"></Route>
                    <Route element={<Product/>} path="product"></Route>
                    <Route element={<Pricing/>} path="pricing"></Route>
                    <Route element={<Login/>} path="login"></Route>
                    <Route element={<ProtectedRoute><Layout/></ProtectedRoute>} path="app">
                        <Route index element={<Navigate replace to="cities"/>}></Route>

                        <Route path="cities" element={<CityList/>}></Route>
                        <Route path='cities/:id' element={<City/>}></Route>
                        <Route path="countries" element={<CountryList/>}></Route>
                        <Route path="form" element={<Form/>}></Route>
                    </Route>
                    <Route element={<NotFound/>} path='*'/>
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    </AuthProvider>;
}

export default App;
