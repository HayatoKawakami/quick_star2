import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { UserProfile } from "../pages/users/UserProfile";
import { NotFound } from "../layouts/NotFound"

export const Container = () => {
    return(
      <div className="container">
        <h1>これはcontainerです</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users">
            <Route path=":userId" element={<UserProfile />} />
          </ Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
}

