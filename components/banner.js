/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Text,
  useColorModeValue,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import GradientButton from "./gradient_button";
import Image from "next/image";

const Banner = ({
  purpose,
  title,
  desc,
  buttonText,
  linkName,
  imageUrl,
  right,
}) => {
  const left = right ? useBreakpointValue({ base: true, lg: false }) : true;
  return (
    <Flex
      flexWrap="wrap"
      // justifyContent={left ? "start" : "end"}
      justifyContent={{ base: "start", lg: "center" }}
      // justifyContent={"start"}
      alignItems={"center"}
      m={{ base: 4, md: 10 }}
    >
      {left ? (
        <>
          <Image src={imageUrl} width={600} height={300} alt={`${purpose}`} />
          <Box p={{ base: "2", md: "5" }} w={"md"}>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              fontWeight="medium"
              my={2}
            >
              {purpose}
            </Text>
            <Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize={{ md: "lg" }}
              marginTop={2}
              marginBottom={6}
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {desc}
            </Text>
            <GradientButton buttonText={buttonText} href={linkName} />
          </Box>
        </>
      ) : (
        <>
          <Box p={{ base: "2", md: "5" }} w={"md"}>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
              fontWeight="medium"
              my={2}
            >
              {purpose}
            </Text>
            <Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize={{ md: "lg" }}
              marginTop={2}
              marginBottom={6}
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {desc}
            </Text>
            <GradientButton buttonText={buttonText} href={linkName} />
          </Box>
          <Image src={imageUrl} width={600} height={300} alt={`${purpose}`} />
        </>
      )}
    </Flex>
  );
};

export default Banner;
