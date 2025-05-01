import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 100px)" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
