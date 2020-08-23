import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from 'screens/Unauthenticated/Welcome';

export type UnauthenticatedStackParamList = {
  WELCOME: undefined;

}

const Stack = createStackNavigator<UnauthenticatedStackParamList>();

const Unauthenticated = () => (
  <Stack.Navigator headerMode='screen' >
    <Stack.Screen name={"WELCOME"} component={WelcomeScreen} options={WelcomeScreen.navigationOptions} />
  </Stack.Navigator>
);

export default Unauthenticated;