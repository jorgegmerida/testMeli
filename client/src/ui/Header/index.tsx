import * as React from "react";
import { SearchBar } from "../../components/SearchBar";

export const Header: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "100vw",
      }}
    >
      <SearchBar />
    </div>
  );
};
