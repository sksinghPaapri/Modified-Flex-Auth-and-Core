import React from "react";
import { Routes, Route } from "react-router-dom";
import TimeEntry from "./TimeEntry";
import TimeEntryList from "./TimeEntryList";

export default function TimeEntryApp() {
  return (
    <Routes>
      <Route path={`/`} element={<TimeEntryList />} />
      <Route path={`/list`} element={<TimeEntryList />} />
      <Route path={`/add`} element={<TimeEntry />} />
      <Route path={`/edit/:id`} element={<TimeEntry />} />
    </Routes>
  );
}
