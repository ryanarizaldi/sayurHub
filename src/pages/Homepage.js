import React, { useState } from "react";
import Head from "../components/Home/head";
import Body from "../components/Home/body";
import Bottom from "../components/Home/bottom";

function Homepage() {
  const [token] = useState(localStorage.getItem("token"));
  return (
    <div>
      <Head />
      <Body />
      {!token && <Bottom />}
    </div>
  );
}

export default Homepage;
