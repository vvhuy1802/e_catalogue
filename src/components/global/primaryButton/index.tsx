import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {width, HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
type PrimaryButtonProps = {
  title: string;
  handlePress: () => void;
  style?: StyleProp<ViewStyle>;
  enable?: boolean;
};

const PrimaryButton = ({
  title,
  handlePress,
  style,
  enable = true,
}: PrimaryButtonProps) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: enable ? '#2D2516' : '#BDBDBD',
          width: '100%',
          height: HeightSize(50),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          transform: [{scale}],
        },
        style,
      ]}
      activeOpacity={0.7}
      onPress={async () => {
        enable && handlePress();
      }}
      onPressIn={() => {
        enable &&
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }).start();
      }}
      onPressOut={() => {
        enable &&
          Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start();
      }}>
      <Text
        style={{
          color: 'white',
          ...TextStyle.LG,
          ...TextFont.SBold,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
