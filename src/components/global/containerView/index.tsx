import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '~/constants/global';

type ContainerViewProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ContainerView = ({children, style}: ContainerViewProps) => {
  const insets = useSafeAreaInsets();
  const styleContainer = [
    style,
    !isIOS
      ? {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      : {},
  ];
  return <View style={styleContainer}>{children}</View>;
};

export default ContainerView;
