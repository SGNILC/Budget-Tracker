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
  console.log("Credentials check:", VERYFI_CLIENT_ID ? "present" : "MISSING");
  console.log("Base URL:", VERYFI_BASE_URL);
  
  // Convert the image to base64 so it can be sent in the request body
  const base64 = await readAsStringAsync(photoUri, {
    encoding: EncodingType.Base64,
  });

  console.log("Base64 image length:", base64.length);

  const fullUrl = `${VERYFI_BASE_URL}/documents/`;
  console.log("Full URL:", fullUrl);
  console.log("Client-Id:", VERYFI_CLIENT_ID);
  console.log("Username:", VERYFI_USERNAME);

  const requestBody = {
    file_data: base64,
  };

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": VERYFI_CLIENT_ID,
      "Authorization": `apikey ${VERYFI_USERNAME}:${VERYFI_API_KEY}`,
      "X-Veryfi-Client-Secret": VERYFI_CLIENT_SECRET,
    },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();
  console.log("Veryfi response status:", response.status);
  console.log("Veryfi response body:", responseText);

  if (!response.ok) {
    throw new Error(`Veryfi API error: ${response.status} - ${responseText}`);
  }

  return JSON.parse(responseText);
}
