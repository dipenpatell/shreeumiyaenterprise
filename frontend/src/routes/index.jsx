import React from "react";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import PhotographyGallery from "../pages/Gellary";

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/contact-us", component: <ContactUs /> },
  { path: "/portfolio", component: <PhotographyGallery /> },
];

export { publicRoutes };
