import { Dimensions } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
    
    export const colors = {
      ...DefaultTheme.colors,
      accent: "#F3534A",
      primary: "#0AC4BA",
      primary10: "#B9EDEB",
      primary20: "#DCF6F5",
      secondary: "#2BDA8E",
      tertiary: "#FFE358",
      black: "#323643",
      white: "#FFFFFF",
      gray: "#9DA3B4",
      gray2: "#C5CCD6",
      // text: "#fff",
      background: "#f1f2f7",
      placeholderText: "#7d7f86",
      inputBackground: "#dee1e7",
      secondaryText: "#666",
      accentBackground: "rgba(10, 132, 255, 0.1)",
      uiAccent: "#c3c4c6",
      linkGreen: "#4BB377",
      linkGreen10: "#DCF0E5",
      darkLink: "#111714",
      darkLink70: "#585D5B",
      red: '#ff6666',
      blue: '#3498db',
      green: '#2ecc71',
      midnightBlue: '#2c3e50',
      lightGray: '#ecf0f1',
      iOSBlue: '#007aff',
      pistachioGreen: '#98c379',
      malibu: '#61afef',
      chalky: '#e5c07b',
      softPurple: '#C678DD',
      cadetBlue: '#ABB2BF',
      froly: '#e06c75'

  };
  
  export const sizes = {
    // global sizes
    base: 12,
    font: 13,
    radius: 4,
    padding: 24,

    // font sizes
    h1: 32,
    h2: 22,
    h3: 18,
    title: 16,
    subtitle: 12,
    caption: 10,
    small: 8,
  
    // app dimensions
    width,
    height
  };
  
  export const fonts = {
    h1: { fontSize: sizes.h1, letterSpacing: 0.15 },
    h2: { fontSize: sizes.h2, letterSpacing: 0 },
    h3: { fontSize: sizes.h3, letterSpacing: 0.15 },
    title: { fontSize: sizes.title, letterSpacing: 0.15 },
    subtitle: { fontSize: sizes.subtitle },
    caption: { fontSize: sizes.caption, letterSpacing: 0.4 },
    small: { fontSize: sizes.small, letterSpacing: 1.5 }
  };
  
  export const weights = {
    regular: "normal",
    bold: "bold",
    semibold: "500",
    medium: "400",
    light: "300"
  };
  
  export {
    width, height
  };

  