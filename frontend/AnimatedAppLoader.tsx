import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import { useFonts } from '@use-expo/font';

function AnimatedAppLoader({ children, image }: {
  children: any,
  image: any
}) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    
    () => () => Asset.fromURI(image).downloadAsync(),
    [image]
  );

  let [fontsLoaded] = useFonts({
    'EuclidCircularB-Regular': require('./assets/fonts/EuclidCircularB-Regular.otf'),
    'EuclidCircularB-Bold': require('./assets/fonts/EuclidCircularB-Bold.ttf'),
    'EuclidCircularB-Medium': require('./assets/fonts/EuclidCircularB-Medium.ttf'),
    'EuclidCircularB-Light': require('./assets/fonts/EuclidCircularB-Light.ttf'),
    'EuclidCircularB-SemiBold': require('./assets/fonts/EuclidCircularB-SemiBold.ttf'),
    'EuclidCircularB-SemiBoldItalic': require('./assets/fonts/EuclidCircularB-SemiBoldItalic.ttf'),
    'EuclidCircularB-MediumItalic': require('./assets/fonts/EuclidCircularB-MediumItalic.ttf'),
    'EuclidCircularB-Italic': require('./assets/fonts/EuclidCircularB-Italic.ttf'),
    'EuclidCircularB-BoldItalic': require('./assets/fonts/EuclidCircularB-BoldItalic.ttf')
  });


  const onFinish: any = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady && !fontsLoaded) {
    
    return (
      <AppLoading
        startAsync={startAsync}
        onError={console.error}
        onFinish={() => setSplashReady(true)}
      />
    );
  } 
  
  return (
    <AnimatedSplashScreen image={image}>
      {children}
    </AnimatedSplashScreen>
  );
   
};


export default AnimatedAppLoader;