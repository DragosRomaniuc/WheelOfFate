import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "styled-components/native";
import { enableScreens } from 'react-native-screens';
import { SplashScreen } from 'expo';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'utils/ui';


import { NavigationContainer } from '@react-navigation/native';
import RootNavigation, { navigationRef, isMountedRef } from 'navigation';
import AnimatedAppLoader from './AnimatedAppLoader';

SplashScreen.preventAutoHide();

enableScreens();

function AppRoot() {

  React.useEffect(():any => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <AnimatedAppLoader image={{ uri: "https://i.imgur.com/xdTwhCL.png" }}>
          <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
              <PaperProvider >
              <ThemeProvider theme={theme.colors}>
                <NavigationContainer theme={theme} ref={navigationRef}>
                    <RootNavigation />
                </NavigationContainer>
                </ThemeProvider>
              </PaperProvider>
          </SafeAreaProvider>
    </AnimatedAppLoader>
    );
};

export default AppRoot;
