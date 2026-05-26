import Constants from "expo-constants";

const veryfiClientId = Constants.expoConfig?.extra?.veryfiClientId || process.env.VERYFI_CLIENT_ID;
const veryfiClientSecret = Constants.expoConfig?.extra?.veryfiClientSecret || process.env.VERYFI_CLIENT_SECRET;
const veryfiUsername = Constants.expoConfig?.extra?.veryfiUsername || process.env.VERYFI_USERNAME;
const veryfiApiKey = Constants.expoConfig?.extra?.veryfiApiKey || process.env.VERYFI_API_KEY;

export const VERYFI_CLIENT_ID = veryfiClientId;
export const VERYFI_CLIENT_SECRET = veryfiClientSecret;
export const VERYFI_USERNAME = veryfiUsername;
export const VERYFI_API_KEY = veryfiApiKey;

export const VERYFI_BASE_URL = "https://api.veryfi.com/api/v8/partner";
