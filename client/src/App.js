import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile'
import LoginForm from './components/LoginForm';
import ResetPassword from './components/resetpassword';
import Workoutplan from './components/workoutplan';
import Progress from './components/Progress';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import './App.css'
import ForgotPassword from './components/forgotPassword';
import DietPlan from './components/dietplan';
import ExerciseDetail from './pages/ExerciseDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/ResetPassword' element={<ResetPassword/>} />
        <Route path='/workoutplan' element={<Workoutplan />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/dietplan' element={<DietPlan />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </Router>
  );
};

export default App;