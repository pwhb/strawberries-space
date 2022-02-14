import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ title, children }) => (
  <Container maxW={"8xl"}>
    <Head>
      <title>{title}</title>

      <link rel="icon" href="/images/home.svg" />
    </Head>
    <Box>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </Container>
);

export default Layout;
