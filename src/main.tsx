import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/index.css';
import App from './ts/App.tsx';
import Header from './ts/Header.tsx';
import Card from './ts/Card.tsx';
import Customization from './Personalization/customization.tsx';
import Footer from './ts/footer.tsx';
import Login from './Login/Login.tsx'; 
import Categories from './Categories/Categories.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Card />
            <App />
            <Footer />
          </>
        } />
        <Route path="/customization" element={<Customization />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  </StrictMode>
);
