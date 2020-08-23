import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
// import Text from 'components/common/Text';
import { SplashScreen } from 'expo';
import Constants from 'expo-constants';
import { height } from 'utils/ui';
import { delay } from 'utils/time';

function AnimatedSplashScreen({ children, image } : { 
    children: any, 
    image: string 
  } ) {
    const animation = React.useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = React.useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
      false
    );
  
    React.useEffect(() => {
      if (isAppReady) {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setAnimationComplete(true));
      }
    }, [isAppReady]);
  
    const onImageLoaded = React.useMemo(() => async () => {
      SplashScreen.hide();
      console.disableYellowBox = true;
      try {
        console.log('astept');
        console.log('gata');
        await Promise.all([]);
      } catch (e) {
      } finally {
        setAppReady(true);
      }
    });
  
    return (
      <View style={{ flex: 1 }}>
        {isAppReady && children}
        {!isSplashAnimationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: animation,
              },
            ]}>
            <Animated.Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: Constants.manifest.splash.resizeMode || 'contain',
                transform: [
                  {
                    scale: animation,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          </Animated.View>
        )}
      </View>
    );
  };

  export default AnimatedSplashScreen;