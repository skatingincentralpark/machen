import Auth from "../src/components/auth/Auth";

import { withPublic } from "../src/hooks/route";

const Home = () => {
  // Returns either marketing, login or signup pages

  return (
    <div>
      <Auth />
    </div>
  );
};

export default withPublic(Home);
