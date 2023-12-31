import {useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
import {WidthSize, width} from '~/theme/size';

export const MyBagFacade = () => {
  const MAX_TRANSLATE_X = -WidthSize(50);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValueDelete = useRef(new Animated.Value(0)).current;
  const lastGestureDx = useRef(0);

  const [disable, setDisable] = useState(false);

  const springAnimation = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(animatedValueDelete, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: () => {
        // if (lastGestureDx.current < -50) return;
        animatedValue.setOffset(lastGestureDx.current);
        animatedValueDelete.setOffset(lastGestureDx.current);
        lastGestureDx.current = 0;
      },
      onPanResponderMove: (e, gesture) => {
        if (gesture.dx > 0) return;
        setDisable(true);
        animatedValue.setValue(gesture.dx);
        animatedValueDelete.setValue(gesture.dx);
      },
      onPanResponderRelease: (e, gesture) => {
        setDisable(false);
        lastGestureDx.current += gesture.dx;
        animatedValue.flattenOffset();
        animatedValueDelete.flattenOffset();
        if (WidthSize(gesture.dx) > WidthSize(50)) {
          springAnimation();
        } else if (WidthSize(gesture.dx) < -WidthSize(50)) {
        } else {
          springAnimation();
        }
      },
    }),
  ).current;
  return {
    panResponder,
    animatedValue,
    animatedValueDelete,
    MAX_TRANSLATE_X,
    lastGestureDx,
    disable,
  };
};
