import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createTenant, getTenants } from "../services/apiHelper";


const ListTenants = () => {
  const dispatch = useDispatch();
  const tenant = useSelector((state) => state.tenant);

  useEffect(() => {
    getTenants(dispatch);
    createTenant(
      {
        name: "Autobits",
        creator: 7,
        teams: [],
      },
      dispatch
    );
  }, []);

  const createTenantHandler = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    createTenant(
      {
        name: "",
        creator: userData.id,
        teams: [],
      },
      dispatch
    );
  };

  return (
    <div className="flex flex-col mt-7 justify-center">
      <div className="text-2xl font-normal text-center">Individual</div>
      {Boolean(Array.isArray(tenant.tenants.tenants)) &&
        tenant.tenants.tenants.map((tenant) => (
          <div className="text-2xl font-normal text-center">{tenant.name}</div>
        ))}
      <div
        className="text-2xl font-normal text-center"
        onClick={createTenantHandler}
      >
        Create New tenant
      </div>
    </div>
  );
};

export default ListTenants;

// get all tanent
// show all
// create new
