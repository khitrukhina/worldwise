import {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

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

const url = 'http://localhost:9000'

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true);
                const res = await fetch(`${url}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }

        }

        fetchCities();
    }, []);

    return <BrowserRouter>
        <Routes>
            <Route element={<Homepage/>} path="/"></Route>
            <Route element={<Product/>} path="product"></Route>
            <Route element={<Pricing/>} path="pricing"></Route>
            <Route element={<Login/>} path="login"></Route>
            <Route element={<Layout/>} path="app">
                <Route index element={<Navigate replace to="cities"/>}></Route>

                <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}></Route>
                <Route path='cities/:id' element={<City/>}></Route>
                <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}></Route>
                <Route path="form" element={<Form/>}></Route>
            </Route>
            <Route element={<NotFound/>} path='*'/>
        </Routes>
    </BrowserRouter>;
}

export default App
