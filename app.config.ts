const getUniqueIdentifier = () => {
  switch (process.env.APP_VARIANT) {
    case "development":
      return "com.androjlk.boardify.dev";
    case "preview":
      return "com.androjlk.boardify.preview";
    default:
      return "com.androjlk.boardify";
  }
};

const getAppName = () => {
  switch (process.env.APP_VARIANT) {
    case "development":
      return "Boardify Dev";
    case "preview":
      return "Boardify Preview";
    default:
      return "Boardify";
  }
};

export default {
  expo: {
    name: getAppName(),
    slug: "boardify",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [],
    extra: {
      eas: {
        projectId: "1b6c93b3-e0ad-48ad-b226-58f5c0650186",
      },
    },
    owner: "jithinlalk25",
  },
};
