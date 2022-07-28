export const priceCalculator = (
  amount: string | number, currencyType: string,
) => {
  let fixedPrice;
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  if (amount) {
    fixedPrice = Number(amount).toLocaleString('en', options);
  } else {
    fixedPrice = 0;
  }
  return `${currencyType}${fixedPrice}`;
};

export const numberFormat = (
  amount: string | number,
) => {
  let fixedPrice;
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  if (amount) {
    fixedPrice = Number(amount).toLocaleString('en', options);
  } else {
    fixedPrice = 0;
  }
  return `${fixedPrice}`;
};