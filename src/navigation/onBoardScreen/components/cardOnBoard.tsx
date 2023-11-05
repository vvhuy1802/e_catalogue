import React, {useRef, useState} from 'react';
import {Animated, FlatList, Text, View} from 'react-native';
import CarouselCardItem from './cardItems';
import {images} from '~/assets';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  onPress: () => void;
};

const CardOnBoard = ({onPress}: Props) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef: any = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollToNextItem = () => {
    if (flatListRef.current) {
      const newIndex = visibleIndex + 1;
      flatListRef.current.scrollToIndex({index: newIndex, animated: true});
      setVisibleIndex(newIndex);
      setActiveCardIndex(newIndex);
    }
  };

  const data = [
    {
      id: '1',
      title: 'Mikasa',
      body: 'She is the adoptive daughter of Grisha and Carla Jaeger and the adoptive sister of Eren Jaeger. She is also the last descendant of the Shogun clan that stayed on Paradis Island',
      imgUrl: images.onBoard.Onboard1,
    },
    {
      id: '2',
      title: `Eren Yeager`,
      body: 'He lived a peaceful life in Shiganshina District with his parents Grisha and Carla Yeager, and his adoptive sister Mikasa Ackerman, until the town was destroyed by Titans during the fall of Wall Maria',
      imgUrl: images.onBoard.Onboard2,
    },
    {
      id: '3',
      title: 'Livai Ackerman',
      body: 'He is the current inheritor of the Attack Titan and a former member of the Survey Corps. He ranked 2nd in the 104th Training Corps and is the former captain of the Survey Corps',
      imgUrl: images.onBoard.Onboard3,
    },
  ];
  const cardWidth = WidthSize(250);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  const scale = React.useRef(new Animated.Value(1)).current;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{height: HeightSize(400)}}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => `${item.id}`}
          data={data}
          renderItem={({item, index}) => (
            <CarouselCardItem index={index} item={item} scrollX={scrollX} />
          )}
          onMomentumScrollEnd={e => {
            setActiveCardIndex(
              Math.round(e.nativeEvent.contentOffset.x / cardWidth),
            );
          }}
          scrollEnabled={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
              listener: (event: any) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / width);
                setVisibleIndex(index);
              },
            },
          )}
          contentContainerStyle={{
            marginLeft: width / 2 - cardWidth / 2,
            paddingRight: width / 2,
          }}
          initialScrollIndex={visibleIndex}
          snapToInterval={cardWidth}
          viewabilityConfig={viewConfig}
        />
      </View>
      <Animated.View
        style={{
          marginTop: HeightSize(50),
          paddingHorizontal: WidthSize(20),
          opacity: scrollX.interpolate({
            inputRange: [
              (activeCardIndex - 1) * cardWidth,
              activeCardIndex * cardWidth,
              (activeCardIndex + 1) * cardWidth,
            ],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        }}>
        <Text
          style={{
            ...TextFont.Bold,
            fontWeight: 'bold',
            ...TextStyle.Title,
            color: 'blue',
          }}>
          {data[activeCardIndex].title}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            ...TextStyle.SM,
            color: 'gray',
            marginTop: HeightSize(10),
          }}>
          {data[activeCardIndex].body}
        </Text>
      </Animated.View>

      <View
        style={{
          width: width,
          height: HeightSize(50),
          paddingHorizontal: WidthSize(20),
          position: 'absolute',
          bottom: HeightSize(100),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            width: '100%',
            height: HeightSize(60),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            transform: [{scale}],
          }}
          activeOpacity={0.7}
          onPress={async () => {
            if (activeCardIndex < 2) {
              scrollToNextItem();
              Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: scrollX,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: false,
                },
              );
            } else {
              onPress();
            }
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
              ...TextStyle.Base,
              fontWeight: 'bold',
            }}>
            {activeCardIndex < 2 ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardOnBoard;
