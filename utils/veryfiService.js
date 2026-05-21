import { EncodingType, readAsStringAsync } from "expo-file-system/legacy";
import {
    VERYFI_API_KEY,
    VERYFI_BASE_URL,
    VERYFI_CLIENT_ID,
    VERYFI_CLIENT_SECRET,
    VERYFI_USERNAME,
} from "../constants/veryfi";

/**
 * Sends a photo URI to Veryfi and returns raw receipt data.
 * @param {string} photoUri - Local file URI from expo-camera
 * @returns {Promise<object>} - Raw Veryfi JSON response
 */
export async function scanReceiptWithVeryfi(photoUri) {
  // checks if the credentials are arriving
  console.log("Credentials check:", VERYFI_CLIENT_ID ? "present" : "MISSING");
  // Convert the image to base64 so it can be sent in the request body
  const base64 = await readAsStringAsync(photoUri, {
    encoding:  EncodingType.Base64,
  });

  const response = await fetch(`${VERYFI_BASE_URL}/documents/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": VERYFI_CLIENT_ID,
      "Authorization": `apikey ${VERYFI_USERNAME}:${VERYFI_API_KEY}`,
      "X-Veryfi-Client-Secret": VERYFI_CLIENT_SECRET,
    },
    body: JSON.stringify({
      file_data: base64,
      // Ask Veryfi to auto-detect category
      categories: ["Food", "Transport", "Shopping", "Health", "Entertainment", "Utilities", "Other"],
    }),
  });

  if (!response.ok) {
    throw new Error(`Veryfi API error: ${response.status}`);
  }

  return response.json();
}
