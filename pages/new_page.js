import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function NewPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  console.log(router.asPath);
  return (
    <>
      <main>
        <div>
          <h1>{t("hi")}</h1>
          <Link
            passHref
            href={router.asPath}
            locale={router.locale === "en" ? "my" : "en"}
          >
            <button>{t("change-locale")}</button>
          </Link>
          <Link passHref href="/second-page">
            <button type="button">{t("to-second-page")}</button>
          </Link>
        </div>
      </main>
    </>
  );
}
