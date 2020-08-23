import React, { Component } from "react";
import {
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import expoTheme from "utils/ui";
import { LinearGradient } from 'expo-linear-gradient';
import { getSpacing, mergeTheme, parseSpacing, rgba } from "utils/ui";



class Button extends Component<any, any> {
    public static defaultProps = {
        startColor: expoTheme.colors.primary,
        endColor: expoTheme.colors.secondary,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        locations: [0.1, 0.9],
        color: null,
        disabled: false,
        opacity: 0.8,
        outlined: false,
        margin: null,
        padding: null,
        flex: 0,
        height: false,
        transparent: false,
        primary: false,
        secondary: false,
        tertiary: false,
        black: false,
        white: false,
        gray: false,
        error: false,
        warning: false,
        success: false,
        info: false,
        theme: {},
        style: {}
    };

    render() {
        const {
            //   style,
            //   opacity,
            gradient,
            // color,
            startColor,
            endColor,
            end,
            start,
            locations,
            shadow,
            //   children,
            //   ...props
        } = this.props;

        // const buttonStyles = [
        //   styles.button,
        //   shadow && styles.shadow,
        //   color && styles[color], // predefined styles colors for backgroundColor
        //   color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
        //   style
        // ];
        // console.log('gradient')
        // if (gradient == true) {
        //   return (
        //     <TouchableOpacity
        //       style={buttonStyles}
        //       activeOpacity={opacity}
        //       {...props}
        //     >
        //       <LinearGradient
        //         start={start}
        //         end={end}
        //         locations={locations}
        //         style={buttonStyles}
        //         colors={[startColor, endColor]}
        //       >
        //         {children}
        //       </LinearGradient>
        //     </TouchableOpacity>
        //   )
        // } 
        const getSpacings = (type: any) => {
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
            } = this.props;
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

        const {
            disabled,
            opacity,
            outlined,
            flex,
            height,
            // colors
            color,
            transparent,
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
            // support for touchables
            highlight,
            nativeFeedback,
            withoutFeedback,
            theme,
            style,
            children,
            ...rest
        } = this.props;

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
        const extraProps = Object.keys(this.props).reduce((prop: any, key) => {
            if (!excludeProps.includes(`${key}`)) {
                prop[key] = this.props[key];
            }
            return prop;
        }, {});

        const { sizes, colors } = mergeTheme({ ...expoTheme }, theme);
        const marginSpacing = getSpacings("margin");
        const paddingSpacing = getSpacings("padding");

        const buttonStyles = StyleSheet.flatten([
            {
                height: sizes.base * 3,
                borderRadius: sizes.radius,
                backgroundColor: colors.primary,
                justifyContent: "center"
            },
            transparent && { backgroundColor: "transparent" },
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
            color && { backgroundColor: color }, // custom backgroundColor
            flex && { flex }, // flex width
            height && { height }, // custom height
            marginSpacing,
            paddingSpacing,
            style
        ]);

        if (disabled) {
            const backgroundColor = StyleSheet.flatten(buttonStyles).backgroundColor;
            buttonStyles.backgroundColor = rgba(backgroundColor, 0.5);
        }

        if (outlined) {
            const backgroundColor = StyleSheet.flatten(buttonStyles).backgroundColor;
            buttonStyles.borderWidth = 1;
            buttonStyles.borderColor = backgroundColor;
            buttonStyles.backgroundColor = "transparent";
        }

        const ButtonType = highlight
            ? TouchableHighlight
            : nativeFeedback
                ? TouchableNativeFeedback
                : withoutFeedback
                    ? TouchableWithoutFeedback
                    : TouchableOpacity;


        return (
            gradient ? <ButtonType
                {...extraProps}
                disabled={disabled}
                activeOpacity={opacity}
                style={buttonStyles}>
                <LinearGradient
                    start={start}
                    end={end}
                    locations={locations}
                    style={buttonStyles}
                    colors={[startColor, endColor]}
                >
                    {children}

                </LinearGradient>
            </ButtonType> :

                <ButtonType
                    {...extraProps}
                    disabled={disabled}
                    activeOpacity={opacity}
                    style={buttonStyles}>
                    {children}
                </ButtonType>
        );


        // <LinearGradient
        //   start={start}
        //   end={end}
        //   locations={locations}
        //   style={buttonStyles}
        //   colors={[startColor, endColor]}
        // >


    }
}



export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: expoTheme.sizes.radius,
        height: expoTheme.sizes.base * 3,
        justifyContent: 'center',
        marginVertical: expoTheme.sizes.padding / 3,
    },
    shadow: {
        shadowColor: expoTheme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    accent: { backgroundColor: expoTheme.colors.accent, },
    primary: { backgroundColor: expoTheme.colors.primary, },
    secondary: { backgroundColor: expoTheme.colors.secondary, },
    tertiary: { backgroundColor: expoTheme.colors.tertiary, },
    black: { backgroundColor: expoTheme.colors.black, },
    white: { backgroundColor: expoTheme.colors.white, },
    gray: { backgroundColor: expoTheme.colors.gray, },
    gray2: { backgroundColor: expoTheme.colors.gray2 }
});