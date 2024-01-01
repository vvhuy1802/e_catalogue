import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeightSize, WidthSize, width} from '~/theme/size';
import CardItem from './cardItem';
import {TextStyle, TextFont} from '~/theme/textStyle';

const CardSlide = () => {
  const data = [
    {
      id: 1,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 2,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 3,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 4,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 5,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 6,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 7,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
    {
      id: 8,
      img: 'https://api.bplusfurniture.com.vn/admin/uploads/273bdf3fe66849ac9e622f8a0dfb0b33.jpg',
    },
  ];
  const dataItem = [
    {
      id: 1,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 2,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 3,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 4,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 5,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 6,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 7,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 8,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
  ];
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef: any = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const cardWidth = HeightSize(256);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  const [currentTab, setCurrentTab] = useState(1);
  const moveTabRef = useRef(new Animated.Value(0));

  const handleChangeTab = (tab: number) => () => {
    setCurrentTab(tab);
    Animated.timing(moveTabRef.current, {
      toValue: tab === 0 ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const handlePressItem = (item: any, index: number) => () => {
    console.log('press item', item, index);
  };

  return (
    <View
      style={{
        marginTop: HeightSize(20),
        width: '100%',
        height: HeightSize(450),
      }}>
      <View
        style={{
          height: HeightSize(450),
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: WidthSize(140),
            transform: [
              {rotate: '270deg'},
              {
                translateY: -WidthSize(58),
              },
            ],
            position: 'absolute',
            zIndex: 100,
            left: WidthSize(30),
          }}>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handleChangeTab(0)}>
              <Text
                style={{
                  ...TextStyle.Base,
                  ...TextFont.SMedium,
                  color: currentTab === 0 ? '#000' : '#BBBBC9',
                }}>
                Item
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangeTab(1)}>
              <Text
                style={{
                  ...TextStyle.Base,
                  ...TextFont.SMedium,
                  color: currentTab === 1 ? '#000' : '#BBBBC9',
                }}>
                Style ideas
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: HeightSize(30),
              height: 2,
              backgroundColor: '#3B3021',
              position: 'absolute',
              bottom: 0,
              left: currentTab === 0 ? undefined : 0,
              right: currentTab === 0 ? 0 : undefined,
            }}
          />
        </View>

        <Animated.View
          style={{
            display: currentTab === 0 ? 'flex' : 'none',
            opacity: moveTabRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            position: 'absolute',
          }}>
          <FlatList
            ref={flatListRef}
            style={{
              paddingLeft: WidthSize(30),
              paddingTop: HeightSize(35),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            nestedScrollEnabled
            data={dataItem}
            renderItem={({item, index}) => (
              <CardItem
                onPress={handlePressItem(item, index)}
                index={index}
                item={item}
                scrollX={scrollX}
              />
            )}
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
              marginLeft: width / 2 - (cardWidth * 2) / 3,
              paddingRight: width / 2,
            }}
            initialScrollIndex={visibleIndex}
            snapToInterval={cardWidth}
            viewabilityConfig={viewConfig}
            //each scroll only scroll 1 item
            decelerationRate={0}
          />
        </Animated.View>
        <Animated.View
          style={{
            display: currentTab === 1 ? 'flex' : 'none',
            opacity: moveTabRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            position: 'absolute',
          }}>
          <FlatList
            ref={flatListRef}
            style={{
              paddingLeft: WidthSize(30),
              paddingTop: HeightSize(35),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            nestedScrollEnabled
            data={data}
            renderItem={({item, index}) => (
              <CardItem
                onPress={handlePressItem(item, index)}
                index={index}
                item={item}
                scrollX={scrollX}
              />
            )}
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
              marginLeft: width / 2 - (cardWidth * 2) / 3,
              paddingRight: width / 2,
            }}
            initialScrollIndex={visibleIndex}
            snapToInterval={cardWidth}
            viewabilityConfig={viewConfig}
            //each scroll only scroll 1 item
            decelerationRate={0}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default CardSlide;

const styles = StyleSheet.create({});
