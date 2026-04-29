import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import References from "./pages/References.js";
import Contact from "./pages/Contact.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" index element={<About />} />
                    <Route path="/about/team" index element={<About />} />
                    <Route path="/references" index element={<References />} />
                    <Route path="/contact" index element={<Contact />} />
                    <Route path="*" index element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);