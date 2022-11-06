import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { UserNew } from "../pages/users/UserNew";
import { UserProfile } from "../pages/users/UserProfile";
import { UserEdit } from "../pages/users/UserEdit";
import { NotFound } from "../layouts/NotFound"
import { LoginForm } from "../pages/sessions/LoginForm";
import { ItemIndex } from "../pages/items";
import { ItemShow } from "../pages/items/show";

export const Container = () => {
    return(
      <div className="container">
        <h1>Container</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users">
            <Route path="sign_up" element={<UserNew />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="profile/edit" element={<UserEdit />} />
          </ Route>
            <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="items" >
            <Route path="" element={<ItemIndex/>} />
            <Route path=":itemId" element={<ItemShow/>}/>
          </ Route>
          
        </Routes>
      </div>
    );
}


