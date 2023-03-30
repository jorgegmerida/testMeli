import * as React from "react";
import { Outlet } from "react-router-dom";

export const Items: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
