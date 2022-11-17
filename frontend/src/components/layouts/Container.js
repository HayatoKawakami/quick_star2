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
import { ItemNew } from "../pages/items/new";
import { ItemEdit } from "../pages/items/edit";
import { CostIndex } from "../pages/costs";
import { CostNew } from "../pages/costs/new";
import { CostEdit } from "../pages/costs/edit";

export const Container = () => {
    return(
      <div className="container">
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
            <Route path=":itemId/edit" element={<ItemEdit/>} />
            <Route path="new" element={<ItemNew/>}/>
          </ Route>
          <Route path="costs">
            <Route path="" element={<CostIndex/>}/>
            <Route path="new" element={<CostNew/>} />
            <Route path=":costId/edit" element={<CostEdit/>}/>
          </Route>
        </Routes>
      </div>
    );
}
