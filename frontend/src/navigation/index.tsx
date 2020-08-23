import React, { Component } from 'react';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import UnauthenticatedScreen from './Unauthenticated';

export const isMountedRef: any = React.createRef();
export const navigationRef: any = React.createRef();

export function navigate(name: any, params: any) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  // const navigation = useNavigation();
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.goBack();
    // navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

type RootStackParamList = {
  AUTHENTICATED: undefined;
}

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator = (props: any) => {

    return (
      <RootStack.Navigator {...props} headerMode='none'>
        <RootStack.Screen name={'UNAUTHENTICATED'} component={UnauthenticatedScreen} />
      </RootStack.Navigator>
    )
  
};

export default AppNavigator;

