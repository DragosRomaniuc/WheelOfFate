import React, { useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";

interface Props {
  onPress: () => any;
  style?: any
}

const Pushable: React.FC<Props> = ({ children, onPress, style }) => {
  const [pressAnim] = useState(new Animated.Value(1));

  const pressAnimation = () => {
    Animated.timing(pressAnim, {
      toValue: 0.8,
      duration: 100,
    }).start();
  };

  const releaseAnimation = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 100,
    }).start();
  };
  
  return (
    <TouchableWithoutFeedback
      onPressIn={pressAnimation}
      onPressOut={releaseAnimation}
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: pressAnim }],
          },
          style
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Pushable;
