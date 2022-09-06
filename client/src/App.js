import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Personal from './components/Personal/Personal';
import Formapost from './components/Posts/Formapost/Formapost';
import PostsList from './components/Posts/PostsList/PostsList';
import OnePostPage from './components/Posts/OnePostPage/OnePostPage';
import ExcursionList from './components/Excursions/ExcursionList/ExcursionList';
import ExcursionForm from './components/Excursions/ExcursionForm/ExcursionForm';
import OneExcursionPage from './components/Excursions/OneExcursionPage/OneExcursionPage';
import YandexMap from './components/YandexMap/YandexMap.jsx';
import OrderCheckOut from './components/Order/OrderCheckOut/OrderCheckOut';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/post" element={<Formapost />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<OnePostPage />} />
        <Route path="/excursions/:id" element={<OneExcursionPage />} />
        <Route path="/excursions" element={<ExcursionList />} />
        <Route path="/excursion" element={<ExcursionForm />} />
        <Route path="/map" element={<YandexMap />} />
        <Route path="/order" element={<OrderCheckOut />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
