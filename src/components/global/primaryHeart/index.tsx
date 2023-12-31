import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {HeightSize} from '~/theme/size';
import {IconSvg} from '../iconSvg';

type Props = {
  widthIcon?: number;
  heightIcon?: number;
  onPress?: () => void;
  styleView?: StyleProp<ViewStyle>;
};

const PrimaryHeart = ({
  widthIcon = HeightSize(20),
  heightIcon = HeightSize(20),
  styleView,
  onPress,
}: Props) => {
  const scaleRef = React.useRef(new Animated.Value(0)).current;
  const [isLike, setIsLike] = React.useState(false);

  return (
    <Pressable
      onPressIn={() => {
        Animated.timing(scaleRef, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.timing(scaleRef, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setIsLike(!isLike);
          onPress && onPress();
        });
      }}
      style={[
        {
          backgroundColor: 'white',
          borderRadius: 100,
          width: HeightSize(44),
          height: HeightSize(44),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.1,
          elevation: 5,
        },
        styleView,
      ]}>
      <IconSvg
        style={{
          transform: [
            {
              scale: scaleRef.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        }}
        icon={isLike ? 'IconHeartRed' : 'IconHeartGray'}
        width={widthIcon}
        height={heightIcon}
      />
    </Pressable>
  );
};

export default PrimaryHeart;

const styles = StyleSheet.create({});
