import React, { Component } from 'react'
import { StyleSheet, View, Animated, SafeAreaView } from 'react-native'

import expoTheme, { getSpacing, mergeTheme, parseSpacing } from "utils/ui";
import { useHeaderHeight } from '@react-navigation/stack';



const Block = (props : any) => {
    const {
      flex,
      noflex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      elevation,
      // colors
      color,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      error,
      warning,
      success,
      info,
      // positioning
      space,
      radius,
      wrap,
      animated,
      theme,
      safe,
      headerMargin,
      style,
      children,
      ...rest
    } = props;

    const headerHeight = useHeaderHeight() - 30;
    // const blockStyles = [
    //   styles.block,
    //   flex && { flex },
    //   flex === false && { flex: 0 }, // reset / disable flex
    //   row && styles.row,
    //   column && styles.column,
    //   center && styles.center,
    //   middle && styles.middle,
    //   left && styles.left,
    //   right && styles.right,
    //   top && styles.top,
    //   bottom && styles.bottom,
    //   margin && { ...this.handleMargins() },
    //   padding && { ...this.handlePaddings() },
    //   card && styles.card,
    //   shadow && styles.shadow,
    //   space && { justifyContent: `space-${space}` },
    //   wrap && { flexWrap: 'wrap' },
    //   color && styles[color], // predefined styles colors for backgroundColor
    //   color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    //   style, // rewrite predefined styles
    // ];


    const getSpacings = (type : any) => {
      const {
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        marginVertical,
        marginHorizontal,
        padding,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        paddingVertical,
        paddingHorizontal,
        theme
      } = props;
  
      const { sizes } = mergeTheme(expoTheme, theme);
  
      if (type === "margin") {
        return [
          margin && getSpacing(type, margin, sizes.base),
          marginTop && parseSpacing("marginTop", marginTop, sizes.base),
          marginRight && parseSpacing("marginRight", marginRight, sizes.base),
          marginBottom && parseSpacing("marginBottom", marginBottom, sizes.base),
          marginLeft && parseSpacing("marginLeft", marginLeft, sizes.base),
          marginVertical &&
            parseSpacing("marginVertical", marginVertical, sizes.base),
          marginHorizontal &&
            parseSpacing("marginHorizontal", marginHorizontal, sizes.base)
        ];
      }
  
      if (type === "padding") {
        return [
          padding && getSpacing(type, padding, sizes.base),
          paddingTop && parseSpacing("paddingTop", paddingTop, sizes.base),
          paddingRight && parseSpacing("paddingRight", paddingRight, sizes.base),
          paddingBottom &&
            parseSpacing("paddingBottom", paddingBottom, sizes.base),
          paddingLeft && parseSpacing("paddingLeft", paddingLeft, sizes.base),
          paddingVertical &&
            parseSpacing("paddingVertical", paddingVertical, sizes.base),
          paddingHorizontal &&
            parseSpacing("paddingHorizontal", paddingHorizontal, sizes.base)
        ];
      }
    };

    const excludeProps = [
      "margin",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "marginVertical",
      "marginHorizontal",
      "padding",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "paddingVertical",
      "paddingHorizontal"
    ];

    const extraProps = Object.keys(rest).reduce((prop:any, key) => {
      if (!excludeProps.includes(`${key}`)) {
        prop[key] = rest[key];
      }
      return prop;
    }, {});
  
    const { sizes, colors } = mergeTheme(expoTheme, theme);
    const marginSpacing = getSpacings("margin");
    const paddingSpacing = getSpacings("padding");
  
    const blockStyles = StyleSheet.flatten([
      styles.block,
      flex && { flex: flex === true ? 1 : flex },
      (!flex || noflex) && { flex: 0 },
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      marginSpacing,
      paddingSpacing,
      wrap && styles.wrap,
      shadow && {
        elevation,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: elevation - 1 },
        shadowOpacity: 0.1,
        shadowRadius: elevation
      },
      space && { justifyContent: `space-${space}` },
      card && { borderRadius: sizes.border },
      radius && { borderRadius: radius },
      // color shortcuts
      primary && { backgroundColor: colors.primary },
      secondary && { backgroundColor: colors.secondary },
      tertiary && { backgroundColor: colors.tertiary },
      black && { backgroundColor: colors.black },
      white && { backgroundColor: colors.white },
      gray && { backgroundColor: colors.gray },
      error && { backgroundColor: colors.error },
      warning && { backgroundColor: colors.warning },
      success && { backgroundColor: colors.success },
      info && { backgroundColor: colors.info },
      color && { backgroundColor: color },
      headerMargin && { paddingTop: headerHeight }, // custom backgroundColor
      style // rewrite predefined styles
    ]);

    if (animated) {
      return (
        <Animated.View {...extraProps} style={blockStyles}>
          {children}
        </Animated.View>
      );
    }
    if (safe) {
      return (
        <SafeAreaView {...extraProps} style={blockStyles}>
          {children}
        </SafeAreaView>
      );
    }

    return (
      <View {...extraProps} style={blockStyles}>
        {children}
      </View>
    );
};

Block.defaultProps = {
  flex: true,
  row: false,
  column: false,
  center: false,
  middle: false,
  left: false,
  right: false,
  top: false,
  bottom: false,
  card: false,
  shadow: null,
  elevation: 3,
  color: null,
  space: null,
  margin: null,
  padding: null,
  radius: null,
  wrap: false,
  animated: false,
  safe: false,
  style: {},
  theme: {}
};

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  center: {
    alignItems: "center"
  },
  middle: {
    justifyContent: "center"
  },
  left: {
    justifyContent: "flex-start"
  },
  right: {
    justifyContent: "flex-end"
  },
  top: {
    justifyContent: "flex-start"
  },
  bottom: {
    justifyContent: "flex-end"
  },
  wrap: { flexWrap: "wrap" }
});

export default Block;