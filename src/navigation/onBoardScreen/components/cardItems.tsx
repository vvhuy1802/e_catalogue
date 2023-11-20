import React from 'react';
import {View, Dimensions, Image, Animated} from 'react-native';
import navigation from '~/navigation';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
type CarouselCardItemProps = {
  item: {
    title: string;
    body: string;
    imgUrl: any;
  };
  index: number;
  scrollX: any;
};
const CarouselCardItem = ({item, index, scrollX}: CarouselCardItemProps) => {
  const cardWidth = WidthSize(250);
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
    outputRange: [0.8, 1, 0.8],
  });
  return (
    <View>
      <Animated.View
        style={[
          {
            width: WidthSize(250),
            borderRadius: 25,
            backgroundColor: 'white',
            transform: [
              {
                scale,
              },
            ],
          },
        ]}>
        {/* <Animated.View
            style={{
              height: HeightSize(400),
              backgroundColor: 'white',
              position: 'absolute',
              zIndex: 100,
              width: cardWidth,
              borderRadius: 25,
              opacity,
            }}
          /> */}
        <Animated.Image
          source={item.imgUrl}
          style={{
            width: WidthSize(250),
            height: HeightSize(378),
            resizeMode: 'cover',
            borderRadius: 25,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default CarouselCardItem;
