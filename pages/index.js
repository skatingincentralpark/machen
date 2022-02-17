import Landing from "../src/components/landing/landing";
import { withPublic } from "../src/hooks/route";

const Home = () => {
  return <Landing />;
};

export default withPublic(Home);
