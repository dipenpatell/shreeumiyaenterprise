import React from "react";
import { Navigate } from "react-router-dom";
import Tenants from "../tenants/pages/ListTenants";
import CreateTenant from "../tenants/create_tenants/CreateTenant";
import CreateTenatsParent from "../tenants/create_tenants/CreateTenatsParent";
import Auth from "../authentication";
import RegistrationForm from "../authentication/pages/RegistrationForm";
import LoginForm from "../authentication/pages/LoginForm";
import FormPage from "../flo/FormPage";
import FloBuilder from "../flo_builder/pages/FloBuilder";
import NewFloBuilder from "../flo_builder/pages/NewFloBuilder";
import FloBuilderWorkflow from "../flo_builder/pages/FloBuilderWorkflow";

// Authentication related pages

const authProtectedRoutes = [
  
  // Tenants
  { path: "/tenants", component: <Tenants /> },
  { path: "/tenants/create", component: <CreateTenant /> },
  { path: "/tenants/create/new", component: <CreateTenatsParent /> },

  // Flo
  { path: "/flo", exact: true, component: <FormPage /> },
  
  // Flo Builder
  { path: "/flo-builder", exact: true, component: <FloBuilder /> },
  { path: "/flo-builder/workflow", exact: true, component: <FloBuilderWorkflow /> },
  { path: "/flo-builder/create", exact: true, component: <NewFloBuilder /> },
  
  // Defult
  { path: "/", exact: true, component: <Navigate to="/auth" /> },

];

const publicRoutes = [
  { path: "/auth", component: <Auth /> },
  { path: "/auth/register", component: <RegistrationForm /> },
  { path: "/auth/login", component: <LoginForm /> },
];

export { authProtectedRoutes, publicRoutes };
