import Link from "next/link";
import React from "react";

const Layout = ({ children }) => (
  <div>
    <nav style={{ display: "flex", flexFlow: "row wrap" }}>
      <div>
        <Link href="/">Home</Link>
      </div>
    </nav>
    {children}
  </div>
);

export default Layout;
