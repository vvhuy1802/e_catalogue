import {StyleProp, View} from 'react-native';
import React from 'react';
import FastImage, {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '~/constants/global';

type ContainerImageProps = {
  children?: React.ReactNode;
  style?: StyleProp<ImageStyle>;
  source: any;
  resizeMode?: ResizeMode;
};

const ContainerImage = ({
  children,
  style,
  source,
  resizeMode,
}: ContainerImageProps) => {
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
  return (
    <FastImage style={styleContainer} resizeMode={resizeMode} source={source}>
      {children}
    </FastImage>
  );
};

export default ContainerImage;
