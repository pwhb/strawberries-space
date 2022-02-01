import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { capitalize } from "../utils";

const ContactUs = () => {
  const router = useRouter();
  return (
    <Layout title={"Contact Us"}>
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        Contact Us
      </Text>
    </Layout>
  );
};

export default ContactUs;
