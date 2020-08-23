import React from "react";
import { Text } from "components/common";
import { Appbar } from 'react-native-paper';
import { colors, sizes, fonts } from 'utils/ui';

const navigationOptions = (props: any) => ({
    headerTransparent: true,
    headerTitle: "",
    headerStyle: { backgroundColor: 'transparent' }
});

export default navigationOptions;
