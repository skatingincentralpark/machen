import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import { AuthProvider } from "../src/hooks/auth";
import AuthStateChanged from "../src/components/layout/AuthStateChanged";
import ErrorPopup from "../src/components/ui/ErrorPopup";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Layout>
        <ErrorPopup />
        <AuthStateChanged>
          <Component {...pageProps} />
        </AuthStateChanged>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
