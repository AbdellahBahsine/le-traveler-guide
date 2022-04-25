import {useEffect} from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from './pages/home';
import ArticlesPage from './pages/articles';
import ArticlePage from './pages/article';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';

import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from './features/user/userSlice';

import Cookies from 'js-cookie';

function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!Cookies.get('authToken') || Cookies.get('authToken') === 'undefined'){
      dispatch(setLogout())
    }
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/articles' element={<ArticlesPage />} />
        <Route path='/article/:id' element={<ArticlePage />} />
        <Route exact path='/login' element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route exact path='/dashboard' element={isLoggedIn ?  <DashboardPage /> : <Navigate to="/login" />}  />
      </Routes>
    </div>
  );
}

export default App;
