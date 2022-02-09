import { ThemeProvider } from "styled-components";

import GlobalStyles from "./global";

import Header from "./Header";

const theme = {
  font: {
    main: "Helvetica, Courier New, monospace",
    serif: "Baskerville",
    mono: "Courier New, monospace",
  },
  colors: {
    highlight: "#bbff00",
    body: "#999999",
  },
  viewport: {
    mobile: "800px",
    desktop: "1196px",
    largedesktop: "1540px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "2rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  calendarItemSize: "7rem",
};

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
