import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditComment } from "../Comments/EditComment";
import { Add } from "../Contacts/Add";
import { Contacts } from "../Contacts/Contacts";
import { Details } from "../Contacts/Details";
import { Edit } from "../Contacts/Edit";

import { AddTask } from "../Tasks/AddTask";
import { EditTask } from "../Tasks/EditTask";

export const App = () => {
  return (
    <>
      <div className="container-fluid">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/edit/:id" element={<Edit />} />
            <Route path="/contacts/details/:id" element={<Details />} />
            <Route path="/contacts/add" element={<Add />} />

            <Route path="/comments/edit/:id/:id_contact" element={<EditComment />} />

            <Route path="/tasks/add/:id" element={<AddTask />} />
            <Route path="/tasks/edit/:id/:id_task" element={<EditTask />} />
            <Route path="/tasks/add/:id/:title" element={<AddTask />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}