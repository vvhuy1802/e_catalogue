import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import BlurContainer from './BlurContainer';
import {isIOS} from '~/constants/global';

type BlurBackgroundProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  blurStyle?: StyleProp<ViewStyle>;
  contentWrapperStyle?: StyleProp<ViewStyle>;
  blurAmount?: number;
  typeBlur?: 'blur' | 'webview';
  blurType?:
    | 'dark'
    | 'light'
    | 'xlight'
    | 'prominent'
    | 'regular'
    | 'transparent';
};

const BlurBackground: React.FC<BlurBackgroundProps> = ({
  children,
  style,
  blurStyle,
  contentWrapperStyle,
  blurAmount = 10,
  typeBlur = 'blur',
  blurType = 'transparent',
}) => {
  return isIOS ? (
    <View style={[styles.container, style]}>
      <BlurView
        style={[styles.blurView, blurStyle]}
        overlayColor=""
        blurType={blurType}
        blurAmount={blurAmount}>
        <View style={[styles.containerView, contentWrapperStyle]}>
          {children}
        </View>
      </BlurView>
    </View>
  ) : typeBlur === 'blur' ? (
    <View style={[styles.container, style]}>
      <BlurView
        style={[styles.blurView, blurStyle]}
        overlayColor=""
        blurType={blurType}
        blurAmount={blurAmount}>
        <View style={[styles.containerView, contentWrapperStyle]}>
          {children}
        </View>
      </BlurView>
    </View>
  ) : (
    <View style={[styles.containerWebview, style]}>
      <BlurContainer style={style} blurRadius={blurAmount}>
        <View style={[styles.containerView, contentWrapperStyle]}>
          {children}
        </View>
      </BlurContainer>
    </View>
  );
};

export default BlurBackground;

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  containerWebview: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  blurView: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF14',
  },
  containerView: {
    backgroundColor: 'transparent',
    width: '100%',
    overflow: 'hidden',

    height: '100%',
  },
});
