import React from "react";

import Header from "./components/layouts/Header/Header";
import Sidebar from "./components/layouts/sidebar/Sidebar";
import Sidebaruser from "./components/layouts/sidebar/Sidebaruser";
import Home from "./Views/Home";
import Homeacc from "./Views/Homeacceuil";
import Homeaccuser from "./Views/Homeacceuiluser";
import CardEvent from "./pages/CardEvents";
import Payment from "./pages/payement";
import Details from "./pages/Details";
import ArtistRoute from "./components/AkremComponents/ArtistRouter";

//akrem
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Navbar from "./components/AkremComponents/Navbar";
import NotFound from "./pages/NotFound";
import NoAccess from "./pages/NoAccess";
import PrivateRouter from "./components/AkremComponents/PrivateRouter";
import AdminRouter from "./components/AkremComponents/AdminRouter";
import ForceRedirect from "./components/AkremComponents/ForceRedirect";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { Logout, setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import { setAuth } from "./util/setAuth";
import Events from "../src/pages/Home";
import MUSIC from "../src/pages/MusicMixer";
import Chat from './chatapp';
import PL from './pages/playlist';

if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div className="bg-light" style={{ height: "100vh" }}>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/home"
              element={
                <PrivateRouter user={user}>
                  <Sidebar />
                  <Homeacc />
                </PrivateRouter>
              }
            />
            <Route
              path="/homeuser"
              element={
                <PrivateRouter user={user.role == "USER"}>
                  <Sidebaruser />
                  <Homeaccuser />
                </PrivateRouter>
              }
            />

            <Route
              path="/profil"
              element={
                <PrivateRouter user={user}>
                  <Profile />
                </PrivateRouter>
              }
            />
            <Route
              path="/login"
              element={
                <ForceRedirect user={user}>
                  <Login />
                </ForceRedirect>
              }
            />

            <Route
              path="/register"
              element={
                <ForceRedirect user={user}>
                  <Register />
                </ForceRedirect>
              }
            />

            <Route
              path="/ADDEvent"
              element={
                <ArtistRoute user={user.role == "ARTIST"}>
                   <Sidebar />
                  <Events />
                </ArtistRoute>
              }
            />
            <Route
              path="/MusicMix"
              element={
                <PrivateRouter user={user}>
                  <MUSIC />
                </PrivateRouter>
              }
            />
            <Route
              path="/card"
              element={
              
                  <CardEvent user={user.role == "USER"}/>
              }
            />

            <Route
              path="/:id"
              element={
                <PrivateRouter user={user}>
                  <Details />
                </PrivateRouter>
              }
            />

            <Route
              path="/Payment/:id"
              element={
                <PrivateRouter user={user.role == "USER"}>
                  <Payment />
                </PrivateRouter>
              }
            />
            <Route
              path="/Payment/:id"
              element={
                <PrivateRouter user={user.role == "ARTIST"}>
                  <Payment />
                </PrivateRouter>
              }
            />




            <Route
              path="/admin"
              element={
                <AdminRouter user={user}>
                  <Admin />
                </AdminRouter>
              }
            />
                      <Route path="/chat" element={  <Chat />} />
                      <Route path="/playlist" element={  <PL />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/noaccess" element={<NoAccess />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
