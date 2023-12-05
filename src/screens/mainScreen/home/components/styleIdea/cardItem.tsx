import React from 'react';
import {View, Dimensions, Animated, Pressable} from 'react-native';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
type CardItemProps = {
  item: any;
  index: number;
  scrollX: any;
  onPress?: () => void;
};
const CardItem = ({item, index, scrollX, onPress}: CardItemProps) => {
  const cardWidth = HeightSize(256);
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];
  // const opacity = scrollX.interpolate({
  //   inputRange,
  //   outputRange: [0.7, 0, 0.7],
  // });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 1.3],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          {
            width: HeightSize(256),
            backgroundColor: 'white',
            borderRadius: 24,
            elevation: 10,
            backgroundColor: 'white',
            shadowColor: '#D8D2C499',
            shadowOffset: {
              width: scrollX.interpolate({
                inputRange,
                outputRange: [0, WidthSize(10), 0],
              }),
              height: scrollX.interpolate({
                inputRange,
                outputRange: [0, HeightSize(10), 0],
              }),
            },
            shadowOpacity: 1,
            shadowRadius: 4,
            transform: [
              {
                scale,
              },
              {
                rotateY: scrollX.interpolate({
                  inputRange,
                  outputRange: ['0deg', '0deg', '-120deg'],
                }),
              },
              {
                perspective: 1000,
              },
            ],
            opacity: scrollX.interpolate({
              inputRange: [
                (index - 1) * cardWidth,
                index * cardWidth,
                (index + 0.8) * cardWidth,
              ],
              outputRange: [1, 1, 0],
            }),
            left: scrollX.interpolate({
              inputRange,
              outputRange: [0, 0, -cardWidth / 4],
            }),
            height: HeightSize(380),
            justifyContent: 'center',
          },
        ]}>
        <Animated.Image
          source={{uri: item.img}}
          style={{
            width: HeightSize(256),
            height: HeightSize(380),
            resizeMode: 'cover',
            borderRadius: 24,
          }}
        />
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 100,
            width: WidthSize(44),
            height: WidthSize(44),
            bottom: WidthSize(20),
            right: WidthSize(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSvg
            icon="IconHeartGray"
            width={WidthSize(20)}
            height={WidthSize(20)}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default CardItem;
