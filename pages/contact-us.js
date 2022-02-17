import { Text, Box, UnorderedList, ListItem, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
// import contact from "../public/locales/en/about.json";
import { MdOutlineAlternateEmail } from "react-icons/md";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact", "common"])),
    },
  };
}
const ContactUs = () => {
  // const router = useRouter();
  // const { t } = useTranslation("contact");
  return (
    <Layout title={"Contact Us"}>
      <Box maxW={"2xl"} mx={"auto"} minH={"xl"}>
        <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
          Contact Us
        </Text>

        <Link
          href={"mailto:nakedguy@yourmombed.org"}
          color={"teal.400"}
          fontWeight={"semibold"}
        >
          {/* <MdOutlineAlternateEmail /> */}
          nakedguy@yourmombed.org
        </Link>
        <Text my={20}>Nice try, FBI. See ya! 😉</Text>
      </Box>
    </Layout>
  );
};

export default ContactUs;
