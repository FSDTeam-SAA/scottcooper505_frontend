
"use client"
import React, { useEffect } from "react";

const EditProjectPage = () => {
  useEffect(() => {
    window.location.href = "/dashboard/projects";
  }, []);
  return <div></div>;
};

export default EditProjectPage;
