export interface FormatMoney {
  symbol: string;
  decimals: number;
}

export const formatMoney = (currencyId, amount = 0) => {
  const format: FormatMoney = { symbol: "", decimals: 0 };

  const currency = {
    symbol: currencyId,
    decimals: amount,
    default: (format.symbol = "$"),
  };

  if (currency["symbol"] === "ARS") {
    format.symbol = "$";
    format.decimals = 2;
  }

  return `${format.symbol} ${amount
    .toFixed(format.decimals)
    .replace(/\d(?=(\d{3})+\.)/g, "$&.")}`;
};
