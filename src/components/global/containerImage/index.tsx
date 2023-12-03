import {Animated, StyleProp, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import FastImage, {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '~/constants/global';

type ContainerImageProps = {
  children?: React.ReactNode;
  style?: StyleProp<ImageStyle>;
  source: any;
  resizeMode: ResizeMode;
  isOpacity?: boolean;
};

const ContainerImage = ({
  children,
  style,
  source,
  resizeMode,
  isOpacity = false,
}: ContainerImageProps) => {
  const insets = useSafeAreaInsets();
  const opacityRef = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(opacityRef.current, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);
  const styleContainer = [
    {flex: 1},
    style,
    isIOS && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  ];
  return (
    <Animated.View
      style={[
        {
          flex: 1,
        },
        isOpacity && {
          opacity: opacityRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
        },
      ]}>
      <FastImage style={styleContainer} resizeMode={resizeMode} source={source}>
        {children}
      </FastImage>
    </Animated.View>
  );
};

export default ContainerImage;
