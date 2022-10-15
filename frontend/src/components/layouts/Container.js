import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { UserNew } from "../pages/users/UserNew";
import { UserProfile } from "../pages/users/UserProfile";
import { UserEdit } from "../pages/users/UserEdit";
import { NotFound } from "../layouts/NotFound"

export const Container = () => {
    return(
      <div className="container">
        <h1>Container</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users">
            <Route path="sign_up" element={<UserNew />} />
            <Route path=":userId" element={<UserProfile />} />
            <Route path=":userId/edit" element={<UserEdit />} />
          </ Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
}

