// Enable React 19 act() environment for @testing-library/react-native.
console.log("JEST SETUP LOADED");
global.IS_REACT_ACT_ENVIRONMENT = true;
if (typeof globalThis !== "undefined") globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Silence noisy act warnings? keep visible.
