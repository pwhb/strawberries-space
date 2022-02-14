import Layout from "../components/layout";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import jsonFile from "../public/locales/en/new-listing.json";

import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["new-listing", "common"])),
    },
  };
}

const CreateNewListing = () => {
  const [formData, setFormData] = useState({
    is_rental: true,
  });
  const { t } = useTranslation("new-listing");
  const states_or_divisons = Object.keys(jsonFile.states);

  console.log(states_or_divisons);
  return (
    <Layout title={"Create New Listing"}>
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              {t("title")}
            </Heading>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "2xl" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.9}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                {t("subtitle")}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder="Firstname"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="firstname@lastname.io"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  placeholder="+1 (___) __-___-___"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Button
                  fontFamily={"heading"}
                  bg={"gray.200"}
                  color={"gray.800"}
                >
                  Upload CV
                </Button>
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreateNewListing;
