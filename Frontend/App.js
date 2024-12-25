import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Admin from './pages/Admin'
import CreatePost from './pages/createPost';
import PostType from './components/PostType';
import Profile from './pages/Profile';
import Settings from './pages/settings';
import General from'./pages/Home/General';
import Announcements from'./pages/Home/Announcements';
import Complaints from './pages/Home/Complaints';
import Polls from'./pages/Home/Polls';
import UserProfile from './pages/userProfile';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/register" element={<SignUp />} />
          <Route path='/' element={<Login/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/reset' element={<ResetPassword/>}/>
          <Route path='/moderate' element={<Admin/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/show' element={<PostType name="Your"/>}/>
          <Route path='/profile' element={<Profile self={true}/>}/>
          <Route path='/showUser' element={<UserProfile />}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/general' element={<General/>}/>
          <Route path='/announcements' element={<Announcements/>}/>
          <Route path='/complaints' element={<Complaints/>}/>
          <Route path='/polls' element={<Polls/>}/>
        </Routes>
      </Router>
  
  );
}

export default App;