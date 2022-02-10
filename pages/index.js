import { useState } from "react";
import Auth from "../src/components/auth/Auth";
import Landing from "../src/components/landing/landing";
import { withPublic } from "../src/hooks/route";

const Home = () => {
  return <Auth />;

  // Returns either marketing, login or signup pages
  const [isLanding, setIsLanding] = useState(true);
  return <>{isLanding ? <Landing /> : <Auth />}</>;
};

export default withPublic(Home);
