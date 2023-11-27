import React, {LegacyRef, useContext, useRef, useState} from 'react';
import {Easing, ScrollView, Text, View} from 'react-native';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {HeightSize, WidthSize} from '~/theme/size';
import {IconSvg} from '~/components/global/iconSvg';
import {TextFont, TextStyle} from '~/theme/textStyle';
import CardSlide from './components/styleIdea/cardSlide';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import CardCategorySlide from './components/category/cardCategorySlide';

const HomeScreen = () => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginTop: HeightSize(10),
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: WidthSize(20),
          }}>
          <View
            style={{
              width: WidthSize(29),
              height: WidthSize(32),
              justifyContent: 'flex-end',
            }}>
            <IconSvg
              icon="IconBagBlack"
              width={WidthSize(24)}
              height={WidthSize(24)}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: WidthSize(16),
                height: WidthSize(16),
                borderRadius: HeightSize(10),
                backgroundColor: 'white',
                padding: HeightSize(2),
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#433229',
                  borderRadius: HeightSize(10),
                }}>
                <Text
                  style={{color: 'white', ...TextStyle.XS, ...TextFont.SLight}}>
                  2
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          scrollEventThrottle={16}
          onScroll={event => {
            if (
              lastContentOffset.value > event.nativeEvent.contentOffset.y &&
              isScrolling.value
            ) {
              if (translateY.value === 100) {
                translateY.value = 0;
                dispatch(SetDirectionBottomBar('up'));
                console.log('scrolling up');
              }
            } else if (
              lastContentOffset.value < event.nativeEvent.contentOffset.y &&
              isScrolling.value
            ) {
              if (translateY.value === 0) {
                translateY.value = 100;
                dispatch(SetDirectionBottomBar('down'));
                console.log('scrolling down');
              }
            }
            lastContentOffset.value = event.nativeEvent.contentOffset.y;
          }}
          onScrollBeginDrag={() => {
            isScrolling.value = true;
          }}
          onScrollEndDrag={() => {
            isScrolling.value = false;
          }}
          style={{
            flex: 1,
            marginTop: HeightSize(10),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: HeightSize(20),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: WidthSize(30),
            }}>
            <Text
              style={{
                ...TextStyle.Title,
                ...TextFont.SBold,
                color: '#3B3021',
              }}>
              Find the one {'\n'}you prefer.
            </Text>
            <View
              style={{
                width: WidthSize(100),
                height: WidthSize(80),
                borderTopLeftRadius: WidthSize(36),
                borderBottomLeftRadius: WidthSize(36),
                backgroundColor: '#EFEFE8',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconSvg
                icon="IconSearchBrown"
                width={WidthSize(28)}
                height={WidthSize(28)}
              />
            </View>
          </View>
          <CardSlide />
          <CardCategorySlide />
        </ScrollView>
      </View>
    </ContainerImage>
  );
};

export default HomeScreen;
