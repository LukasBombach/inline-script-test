import type { NextPage } from "next";
import InlineScript from "../lib/test.macro";

const Home: NextPage = () => {
  return (
    <p>
      this is a test
      <InlineScript>
        {() => {
          console.log("hooray" as string);
        }}
      </InlineScript>
    </p>
  );
};

export default Home;
