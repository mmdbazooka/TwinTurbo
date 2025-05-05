import { RouterProvider } from "react-router-dom"
import { Authorize , UnAuthorize } from './config/Router'
import { useSelector } from "react-redux";
import { useState } from "react";

const App = () => {
  let reduxToken = useSelector(state => state.user.token)
  let token = localStorage.getItem("token")
  ondragstart = () => false
  
  return (
    <RouterProvider router={(token || reduxToken !== "") ? Authorize : UnAuthorize} />
  )
};

export default App;