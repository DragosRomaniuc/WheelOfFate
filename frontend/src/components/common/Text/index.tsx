// just copy this code from the driving repo :)
import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { colors, sizes, fonts } from "utils/ui";

const Typography = (props: any) => {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      italic,
      semibolditalic,
      bolditalic,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      green,
      darkGrey,
      style,
      children,
      ...rest
    } = props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      italic && styles.italic,
      semibolditalic && styles.semibolditalic,
      bolditalic && styles.bolditalic,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      green && styles.green,
      darkGrey && styles.darkGrey,
      style // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...rest}>
        {children}
      </Text>
    );
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: sizes.font,
    color: colors.black,
    fontFamily: 'EuclidCircularB-Regular'
  },
  // variations
  regular: {
    fontFamily: 'EuclidCircularB-Regular'
  },
  bold: {
    fontFamily: 'EuclidCircularB-Bold'
  },
  semibold: {
    fontFamily: 'EuclidCircularB-SemiBold'
  },
  medium: {
    fontFamily: 'EuclidCircularB-Medium'
  },
  light: {
    fontFamily: 'EuclidCircularB-Light'
  },
  italic: {
    fontFamily: 'EuclidCircularB-Italic'
  },
  semibolditalic: {
    fontFamily: 'EuclidCircularB-SemiBoldItalic'
  },
  bolditalic: {
    fontFamily: 'EuclidCircularB-BoldItalic'
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  // colors
  accent: { color: colors.accent },
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  tertiary: { color: colors.tertiary },
  black: { color: colors.black },
  white: { color: colors.white },
  gray: { color: colors.gray },
  gray2: { color: colors.gray2 },
  green: { color: colors.linkGreen },
  darkGrey: { color: colors.darkLink70 },
  // fonts
  h1: fonts.h1,
  h2: fonts.h2,
  h3: fonts.h3,
  title: fonts.title,
  body: fonts.body,
  caption: fonts.caption,
  small: fonts.small
});

export default Typography;