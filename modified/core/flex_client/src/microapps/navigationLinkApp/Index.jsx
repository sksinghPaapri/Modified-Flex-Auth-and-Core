import React from "react";
import { Routes, Route } from "react-router-dom";
import Class from "./Class";
import ClassList from "./ClassList";

export default function NavigationLinkApp() {
  return (
    <Routes>
      <Route path={`/`} element={<ClassList />} />
      <Route path={`/list`} element={<ClassList />} />
      <Route path={`/add`} element={<Class />} />
      <Route path={`/edit/:id`} element={<Class />} />
    </Routes>
  );
}
