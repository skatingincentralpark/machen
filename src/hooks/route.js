import { useRouter } from "next/router";
import useAuth from "./auth";

export function withPublic(Component) {
  return function WithPublic(props) {
    const { user } = useAuth();
    const router = useRouter();

    if (user) {
      router.push("/calendartest");
      return <></>; // Could be loading component here
    }

    return <Component {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
      router.push("/");
      return <></>; // Could be loading component here
    }

    return <Component {...props} />;
  };
}

export const Loading = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <p>Loading...</p>
    </div>
  );
};
