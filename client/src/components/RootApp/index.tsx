import * as React from "react";
import { Outlet } from "react-router-dom";

export const RootApp: React.FC = () => {
  return <Outlet />;
};
