import type { NextPage } from "next";
import Script from "../lib/test.macro";

const Home: NextPage = () => {
  return (
    <p>
      This is calculated at compile-time:
      <Script>
        {() => {
          console.log("hooray");
        }}
      </Script>
    </p>
  );
};

export default Home;
