const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
  currencyDisplay: 'symbol',
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATER.format(number);
}

// export function formatCurrency(number: number, countryCode: string) {
//   let currencyCode;
//   switch (countryCode) {
//     case 'PL':
//       currencyCode = 'PLN';
//       break;
//     case 'CZ':
//       currencyCode = 'CZK';
//       break;
//     case 'SK':
//       currencyCode = 'EUR'; // W Słowacji używamy euro
//       break;
//     default:
//       currencyCode = 'USD'; // Domyślnie używamy dolara
//       break;
//   }

//   const currencyFormatter = new Intl.NumberFormat(undefined, {
//     currency: currencyCode,
//     style: 'currency',
//     currencyDisplay: 'symbol',
//   });

//   return currencyFormatter.format(number);
// }
