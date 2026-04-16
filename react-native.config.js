module.exports = {
  dependencies: {
    'react-native-iap': {
      platforms: {
        android: {
          // Disable TurboModule C++ codegen — v13 uses Java bridge only
          libraryName: null,
          componentDescriptors: null,
          cmakeListsPath: null,
        },
      },
    },
  },
};
