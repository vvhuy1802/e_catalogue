import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import WebView from 'react-native-webview';

export interface BlurContainerProps {
  children?: React.ReactNode;
  blurRadius: number;
  style?: StyleProp<ViewStyle>;
}

const BlurContainer = ({children, blurRadius, style}: BlurContainerProps) => {
  const ConvertBorderRadiusFromReactNativeToReactJs = () => {
    const borderRadius = style?.borderRadius
      ? style?.borderRadius
      : style?.borderTopLeftRadius;
    const ratio = 3;
    return borderRadius * ratio;
  };
  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
        },
      ]}>
      <WebView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          zIndex: 1,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        source={{
          html: `
            <div style="
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: ${ConvertBorderRadiusFromReactNativeToReactJs()}px;
            background: rgba(255, 255, 255, 0.08);
            -webkit-backdrop-filter: blur(${blurRadius}px);
            backdrop-filter: blur(${blurRadius}px);"
            />
      `,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2,
        }}>
        {children}
      </View>
    </View>
  );
};

export default BlurContainer;
