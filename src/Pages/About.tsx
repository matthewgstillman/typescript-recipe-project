import React, { FunctionComponent } from "react";

export interface IAboutPageProps {}

const About: FunctionComponent<IAboutPageProps> = (props) => {
  return (
    <div>
      <p>This is the About Page</p>
    </div>
  );
};

export default About;
