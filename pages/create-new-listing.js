import Layout from "../components/layout";
import { Text } from "@chakra-ui/react";

const CreateNewListing = () => {
  return (
    <Layout title={"Create New Listing"}>
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        Create New Listing
      </Text>
    </Layout>
  );
};

export default CreateNewListing;
