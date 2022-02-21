import Layout from "../components/layout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/react";

import ListingForm from "../components/listing_form";

export async function getServerSideProps(ctx) {
  const { locale } = ctx;
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      base_url: process.env.BASE_URL,
      ...(await serverSideTranslations(locale, ["listing", "common"])),
    },
  };
}

const CreateNewListing = ({ base_url }) => {
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Layout title={"Create New Listing"}>
      <ListingForm base_url={base_url} />
    </Layout>
  );
};

export default CreateNewListing;
