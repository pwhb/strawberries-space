import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
