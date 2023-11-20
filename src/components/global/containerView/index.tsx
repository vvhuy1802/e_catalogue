import {Animated, StyleProp, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '~/constants/global';

type ContainerViewProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isOpacity?: boolean;
};

const ContainerView = ({
  children,
  style,
  isOpacity = false,
}: ContainerViewProps) => {
  const insets = useSafeAreaInsets();
  // const opacityRef = useRef(new Animated.Value(0));
  // useEffect(() => {
  //   Animated.timing(opacityRef.current, {
  //     toValue: 1,
  //     duration: 400,
  //     useNativeDriver: false,
  //   }).start();
  // }, []);
  const styleContainer = [
    {flex: 1},
    style,
    !isIOS && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    // isOpacity && {
    //   opacity: opacityRef.current.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 1],
    //   }),
    // },
  ];
  return <Animated.View style={styleContainer}>{children}</Animated.View>;
};

export default ContainerView;
