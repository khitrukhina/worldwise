import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import './App.css'
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import { CitiesProvider } from './context/CitiesContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Layout = lazy(() => import('./pages/Layout'));
const Login = lazy(() => import('./pages/Login'));


function App() {
    return <AuthProvider>
        <CitiesProvider>
            <BrowserRouter>
                <Suspense fallback={<SpinnerFullPage/>}>
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
                </Suspense>
            </BrowserRouter>
        </CitiesProvider>
    </AuthProvider>;
}

export default App;
