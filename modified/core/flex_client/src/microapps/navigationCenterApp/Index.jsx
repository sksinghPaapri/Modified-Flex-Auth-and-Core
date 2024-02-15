import React from "react";
import Class from "../navigationCenterApp/Class";
import ClassList from "../navigationCenterApp/ClassList";
import { Routes, Route } from "react-router-dom";

export default function NavigationCenterApp() {
  return (
    <Routes>
      <Route path={`/`} element={<ClassList />} />
      <Route path={`/list`} element={<ClassList />} />
      <Route path={`/add`} element={<Class />} />
      <Route path={`/edit/:id`} element={<Class />} />
    </Routes>
  );
}
