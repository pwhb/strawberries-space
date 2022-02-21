export const validateForm = (formData) => {
  const newError = {};
  if (formData.title.trim() === "") {
    newError.title = true;
  }
  if (formData.category === "") {
    newError.category = true;
  }
  if (
    (formData.category === "apartment" || formData.category === "condo") &&
    formData.floor_level === ""
  ) {
    newError.floor_level = true;
  }
  const minPrice = formData.purpose === "rent" ? 100000 : 1000000;
  if (formData.price < minPrice) {
    newError.price = true;
  }
  if (formData.currency === "") {
    newError.currency = true;
  }
  if (
    (formData.category === "apartment" || formData.category === "condo") &&
    formData.width === 0
  ) {
    newError.width = true;
  }
  if (
    (formData.category === "apartment" || formData.category === "condo") &&
    formData.length === 0
  ) {
    newError.length = true;
  }
  if (
    (formData.category === "house" || formData.category === "lot") &&
    formData.lot_width === 0
  ) {
    newError.lot_width = true;
  }
  if (
    (formData.category === "house" || formData.category === "lot") &&
    formData.lot_length === 0
  ) {
    newError.lot_length = true;
  }
  if (formData.township === "") {
    newError.township = true;
  }
  if (formData.state === "") {
    newError.state = true;
  }
  if (formData.phone_numbers[0] === "") {
    newError.phone_numbers = true;
  }

  return newError;
};
