export const numInBurmese = (num) => {
  const arr = num.toString().split("");
  let burmeseNumber = "";
  for (let digit of arr) {
    const burmeseDigit = switchDigit(digit);
    burmeseNumber += burmeseDigit;
  }
  return burmeseNumber;
};

const switchDigit = (digit) => {
  switch (digit) {
    case "0":
      return "၀";
    case "1":
      return "၁";
    case "2":
      return "၂";
    case "3":
      return "၃";
    case "4":
      return "၄";
    case "5":
      return "၅";
    case "6":
      return "၆";
    case "7":
      return "၇";
    case "8":
      return "၈";
    case "9":
      return "၉";
  }
};

export const formatPrice = (price, locale) => {
  const inLakhs = price / 100000;
  if (locale === "en") {
    const unit = inLakhs >= 2 ? "Lakhs" : "Lakh";
    return `${inLakhs} ${unit}`;
  }
  if (inLakhs < 100) {
    return `${numInBurmese(inLakhs)} သိန်း`;
  }

  return `သိန်း ${numInBurmese(inLakhs)}`;
};
