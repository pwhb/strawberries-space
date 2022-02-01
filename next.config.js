const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "cdn.pixabay.com",
      "bayut-production.s3.eu-central-1.amazonaws.com",
    ],
  },
};
