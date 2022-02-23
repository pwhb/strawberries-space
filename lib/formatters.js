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
    default:
      return digit;
  }
};

export const formatPrice = (price, locale) => {
  const inLakhs = price / 100000;
  if (locale === "en") {
    const unit = inLakhs >= 2 ? "Lakhs" : "Lakh";
    return `${inLakhs.toLocaleString()} ${unit}`;
  }
  if (inLakhs > 20) {
    return `သိန်း ${numInBurmese(inLakhs.toLocaleString())}`;
  }
  return `${numInBurmese(inLakhs)} သိန်း`;
};

export const formatDate = (date, locale) => {
  const prevDate = new Date(date);
  const currDate = new Date();
  const diffInSeconds = (currDate - prevDate) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  if (diffInDays > 3) {
    const dateStr = prevDate.toUTCString().split(currDate.getFullYear())[0];
    const timeStr = prevDate.toLocaleTimeString();
    // const dateStr = (prevDate + 6.5 * 60 * 60 * 1000)
    return `${dateStr} ${timeStr}`;
  }
  if (diffInDays > 1) {
    return locale === "en"
      ? `${diffInDays.toFixed()} ${diffInDays >= 2 ? "days" : "day"} ago`
      : `လွန်ခဲ့တဲ့ ${numInBurmese(diffInDays.toFixed())} ရက်က`;
  }
  if (diffInHours > 1) {
    return locale === "en"
      ? `${diffInHours.toFixed()} ${diffInHours >= 2 ? "hours" : "hour"} ago`
      : `လွန်ခဲ့တဲ့ ${numInBurmese(diffInHours.toFixed())} နာရီက`;
  }
  if (diffInMinutes > 1) {
    return locale === "en"
      ? `${diffInMinutes.toFixed()} ${diffInMinutes >= 2 ? "mins" : "min"} ago`
      : `လွန်ခဲ့တဲ့ ${numInBurmese(diffInMinutes.toFixed())} မိနစ်က`;
  }
  return locale === "en" ? "a moment ago" : "ခုနလေးတင်";
};
