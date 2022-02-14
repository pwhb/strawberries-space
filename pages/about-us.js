import { Text, Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import about from "../public/locales/en/about.json";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about", "common"])),
    },
  };
}
const AboutUs = () => {
  const router = useRouter();
  const { t } = useTranslation("about");
  // console.log(about.p);
  return (
    <Layout title={"About Us"}>
      <Box maxW={"2xl"} mx={"auto"}>
        <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
          {t("m-title")}
        </Text>
        <UnorderedList>
          {Object.keys(about.m).map((name, idx) => (
            <ListItem key={`mission-${idx}`}>
              <Text>{t(`m.${name}`)}</Text>
              <br />
            </ListItem>
          ))}
        </UnorderedList>

        <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
          {t("faq-title")}
        </Text>
        <UnorderedList>
          {Object.keys(about.faq).map((faq, idx) => (
            <ListItem key={`faq-${idx}`}>
              <Text>
                <strong>{t("faq-q")}: </strong>
                {t(`faq.${faq}.question`)}
              </Text>
              <Text>
                <strong>{t("faq-a")}: </strong>
                {t(`faq.${faq}.answer`)}
              </Text>
              <br />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Layout>
  );
};

export default AboutUs;
