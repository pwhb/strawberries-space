const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "my"],
    defaultLocales: "my",
  },
  images: {
    domains: ["cdn.pixabay.com"],
  },
};
