
import { Currency } from '../types';

// Hardcoded exchange rates relative to USD for simplicity.
// In a real app, these would come from an API.
const rates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.93, // 1 USD = 0.93 EUR
    MAD: 9.98, // 1 USD = 9.98 MAD
};

export const convertCurrency = (
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency
): number => {
    if (fromCurrency === toCurrency) {
        return amount;
    }
    // Convert the initial amount to USD first
    const amountInUSD = amount / rates[fromCurrency];
    // Then convert from USD to the target currency
    const convertedAmount = amountInUSD * rates[toCurrency];
    return convertedAmount;
};
