import { DefaultTheme } from "@react-navigation/native";

import {
  getMargins,
  getPaddings,
  mergeTheme,
  parseSpacing,
  spacing
} from "./helpers";

import {
  colors,
  sizes,
  fonts,
  weights,
  width,
  height
} from './theme'

import rgba from './rgba';

export const red = '#ff6666';
export const blue = '#3498db';
export const green = '#2ecc71';
export const midnightBlue = '#2c3e50';
export const lightGray = '#ecf0f1';
export const iOSBlue = '#007aff';
export const pistachioGreen = '#98c379';
export const malibu = '#61afef';
export const chalky = '#e5c07b';
export const softPurple = '#C678DD';
export const cadetBlue = '#ABB2BF';
export const froly = '#e06c75';

const theme = { 
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors
  },
 sizes,
 fonts,
 tabActiveBackground: '#282c34',
  tabInactiveBackground: 'transparent',
  tabActiveIconTint: 'white',
  tabInactiveIconTint: 'lightgray',
  tabBarOutline: '#535353',
  headerBackground: 'transparent',
  headerTitle: 'white',
  headerBackButton: 'white',

  tabBarUnderlineColor: 'white',

  storyTitle: malibu,
  storyAuthor: chalky,
  storyTimeAgo: cadetBlue,
  storyDivider: froly,
  headerCommentBackground: 'transparent',
  storyBackground: 'transparent' /* #2d323b */,
  storyType: pistachioGreen,
  storyDividingLine: '#282c34',

  pullToSaveStory: pistachioGreen,
  savedStory: chalky,

  upvotesAndComments: '#eee',
  comments: softPurple,

  storyPlaceholderBackground: 'transparent',
  commentText: '#bdc3c7',
  commentURL: pistachioGreen,

  twitter: '#00aced',
  facebook: '#3b5998',
  whatsapp: '#25d366',
  googleplus: '#dd4b39',
  email: '#d7d7d8',
  copylink: '#c4dff6'
};

const getSpacing = spacing;

export {
  rgba,
  getMargins,
  getPaddings,
  getSpacing,
  parseSpacing,
  mergeTheme,
  colors,
  sizes,
  fonts,
  weights,
  width,
  height,
  theme
};

export default theme;