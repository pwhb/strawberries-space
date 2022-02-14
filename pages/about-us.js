import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { capitalize } from "../lib/helpers";

const AboutUs = () => {
  const router = useRouter();
  return (
    <Layout title={"About Us"}>
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        About Us
      </Text>
      <Text></Text>
    </Layout>
  );
};

export default AboutUs;
