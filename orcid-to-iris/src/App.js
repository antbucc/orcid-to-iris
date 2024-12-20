import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrcidAuthorization from "./components/OrcidAuthorization";
import Callback from "./components/Callback";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <OrcidAuthorization />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
