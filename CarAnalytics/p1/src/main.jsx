import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import HighlightedCars from "./pages/HighlightedCars";
import ErrorPage from "./pages/ErrorPage";
import CarDetails from './components/CarDetails';
import carData from './data/taladrod-cars.min.json'; // Import your car data
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/highlighted-cars",
    element: <HighlightedCars />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view/:brand", 
    element: <CarDetails cars={carData.Cars} />, // Pass car data to CarDetails
    errorElement: <ErrorPage />,
  },
] ,{ basename: "/CarAnalytics" });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
