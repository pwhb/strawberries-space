const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "my",
    locales: ["en", "my"],
  },
  localePath: path.resolve("./public/locales"),
};
