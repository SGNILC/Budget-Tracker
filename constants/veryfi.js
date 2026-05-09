import Constants from "expo-constants";

const {
  veryfiClientId,
  veryfiClientSecret,
  veryfiUsername,
  veryfiApiKey,
} = Constants.expoConfig.extra;

export const VERYFI_CLIENT_ID = veryfiClientId;
export const VERYFI_CLIENT_SECRET = veryfiClientSecret;
export const VERYFI_USERNAME = veryfiUsername;
export const VERYFI_API_KEY = veryfiApiKey;

export const VERYFI_BASE_URL = "https://api.veryfi.com/api/v8/partner";
