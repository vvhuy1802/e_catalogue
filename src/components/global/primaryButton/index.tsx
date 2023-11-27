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
};

const PrimaryButton = ({title, handlePress, style}: PrimaryButtonProps) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  return (
    <View
      style={[
        {
          width: '100%',
          height: HeightSize(50),
        },
        style,
      ]}>
      <TouchableOpacity
        style={{
          backgroundColor: '#2D2516',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          transform: [{scale}],
        }}
        activeOpacity={0.7}
        onPress={async () => {
          handlePress();
        }}
        onPressIn={() => {
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
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
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
