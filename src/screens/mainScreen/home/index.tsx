import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {HeightSize} from '~/theme/size';
import CardSlide from './components/styleIdea/cardSlide';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  SetCurrentDropDown,
  SetDirectionBottomBar,
} from '~/redux/reducers/globalSlice';
import CardCategorySlide from './components/category/cardCategorySlide';
import PopularChoice from './components/popularChoice';
import HotLooks from './components/hotLooks';
import DropDown from './components/dropDown';
import SearchHomeScreen from './components/search';
import DropDownComponent from '~/components/global/dropDown';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flex: 1,
        }}>
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
              }
            } else if (
              lastContentOffset.value < event.nativeEvent.contentOffset.y &&
              isScrolling.value
            ) {
              if (translateY.value === 0) {
                translateY.value = 100;
                dispatch(SetDirectionBottomBar('down'));
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
          <DropDown setIsShow={setIsShowDropDown} />
          <SearchHomeScreen navigation={navigation} />
          <CardSlide />
          <CardCategorySlide />
          <PopularChoice />
          <HotLooks />
        </ScrollView>
      </View>
      <DropDownComponent
        isShow={isShowDropDown}
        onPress={(item: any) => {
          dispatch(SetCurrentDropDown(item));
          setIsShowDropDown(false);
        }}
      />
    </ContainerImage>
  );
};

export default HomeScreen;
