// const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
//   currency: 'USD',
//   style: 'currency',
//   currencyDisplay: 'symbol',
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });

// export function formatCurrency(priceInCents: number) {
//   // Przekształć cenę w cenę w dolarach
//   const priceInDollars = priceInCents / 100;
//   return CURRENCY_FORMATER.format(priceInDollars);
// }

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

export function formatCurrency(priceInCents: number, currencyCode: string = 'PL') {
  let currencySymbol;
  switch (currencyCode) {
    case 'PL':
      currencySymbol = 'PLN';
      break;
    // Tutaj możesz dodać obsługę innych walut, jeśli jest to potrzebne
    default:
      currencySymbol = 'USD';
      break;
  }

  // Przekształć cenę w cenę w złotówkach
  const priceInZloty = priceInCents / 100;
  return `${priceInZloty.toFixed(2)} ${currencySymbol}`;
}
