import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
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
  const changeColor = React.useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(changeColor, {
      toValue: enable ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [enable]);
  //enable ? '#2D2516' : '#BDBDBD'
  return (
    <TouchableOpacity
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
      <Animated.View
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
        ]}>
        <Text
          style={{
            color: 'white',
            ...TextStyle.LG,
            ...TextFont.SBold,
          }}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
