import React, { FunctionComponent } from "react";

export interface IHomePageProps {}

const Home: FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div>
      <p>This is the home page</p>
    </div>
  );
};

export default Home;
