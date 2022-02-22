import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layout";
import axios from "axios";
import { NotFound } from "../../components/common";
import PropertyDetails from "../../components/property_details";

const BASE_URL = process.env.BASE_URL;

export async function getServerSideProps(ctx) {
  const { locale, params } = ctx;

  const { data } = await axios.get(`${BASE_URL}/api/listings/${params.id}`);

  return {
    props: {
      listing: data,
      ...(await serverSideTranslations(locale, ["home", "common", "listing"])),
    },
  };
}

export default function Property({ listing }) {
  if (!listing) {
    return (
      <Layout title={"Not Found"}>
        <NotFound text={"Property Not Found"} />
      </Layout>
    );
  }

  return (
    <Layout title={listing.title}>
      <PropertyDetails listing={listing} />
    </Layout>
  );
}
