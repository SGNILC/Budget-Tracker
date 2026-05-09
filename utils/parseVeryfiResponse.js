/**
 * Maps Veryfi's category labels to the app's known categories.
 * Extend this list as needed.
 */
const CATEGORY_MAP = {
  "Groceries": "Food",
  "Restaurants": "Food",
  "Fast Food": "Food",
  "Coffee Shops": "Food",
  "Gas Stations": "Transport",
  "Parking": "Transport",
  "Taxi": "Transport",
  "Ride Share": "Transport",
  "Pharmacy": "Health",
  "Medical": "Health",
  "Entertainment": "Entertainment",
  "Movies": "Entertainment",
  "Shopping": "Shopping",
  "Clothing": "Shopping",
  "Electronics": "Shopping",
  "Utilities": "Utilities",
  "Internet": "Utilities",
  "Phone": "Utilities",
};

/**
 * Normalizes a raw Veryfi API response into a form-ready object.
 * @param {object} veryfiResponse - Raw JSON from Veryfi API
 * @returns {{ amount: string, date: string, description: string, category: string } | null}
 */
export function parseVeryfiResponse(veryfiResponse) {
  const total = veryfiResponse.total;
  const date = veryfiResponse.date;
  const vendor = veryfiResponse.vendor?.name || "";
  const rawCategory = veryfiResponse.category || "";

  // If there's no total, the receipt couldn't be read
  if (!total) return null;

  // Normalize date to YYYY-MM-DD
  let formattedDate = "";
  if (date) {
    const parsed = new Date(date);
    if (!isNaN(parsed)) {
      formattedDate = parsed.toISOString().split("T")[0];
    }
  }

  // Map Veryfi category to app category, fall back to "Other"
  const category = CATEGORY_MAP[rawCategory] || rawCategory || "Other";

  return {
    amount: total.toString(),
    date: formattedDate,
    description: vendor,
    category,
  };
}
