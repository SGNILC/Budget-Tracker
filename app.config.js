import "dotenv/config";

export default ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    package: "com.shojilab2025.budgettracker",
  },
  extra: {
    veryfiClientId: process.env.VERYFI_CLIENT_ID,
    veryfiClientSecret: process.env.VERYFI_CLIENT_SECRET,
    veryfiUsername: process.env.VERYFI_USERNAME,
    veryfiApiKey: process.env.VERYFI_API_KEY,
    eas: {
      projectId: config.extra?.eas?.projectId,
    },
  },
});
