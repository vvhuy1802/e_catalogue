import React from 'react';
import {View, Dimensions, Animated} from 'react-native';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {CarouselCard} from '~/types/CarouselCard';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
type CardItemProps = {
  item: any;
  index: number;
  scrollX: any;
};
const CardItem = ({item, index, scrollX}: CardItemProps) => {
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
    outputRange: [0.7, 1, 1.1],
  });

  return (
    <View>
      <Animated.View
        style={[
          {
            width: HeightSize(256),
            borderRadius: 24,
            transform: [
              {
                scale,
              },
              {
                rotateY: scrollX.interpolate({
                  inputRange,
                  outputRange: ['0deg', '0deg', '-90deg'],
                }),
              },
              {
                perspective: 1000,
              },
            ],
            opacity: scrollX.interpolate({
              inputRange: [
                (index - 1) * cardWidth,
                (index + 0.3) * cardWidth,
                (index + 1) * cardWidth,
              ],
              outputRange: [1, 1, 0],
            }),
            left: scrollX.interpolate({
              inputRange,
              outputRange: [0, 0, -cardWidth / 4],
            }),
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
            borderRadius: 12,
            width: WidthSize(44),
            height: WidthSize(44),
            bottom: HeightSize(20),
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
    </View>
  );
};

export default CardItem;
