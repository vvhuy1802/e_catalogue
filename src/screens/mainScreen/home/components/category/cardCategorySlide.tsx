import {FlatList, ImageBackground, Pressable, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import BlurBackground from '~/components/global/blurBackground';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAllCategories,
  selectLoadingGetAllCategories,
} from '~/redux/reducers/productSlice';
import {getUrl} from '~/utils';
import navigation from '~/navigation';
import {
  SetDirectionBottomBar,
  selectCurrentDropDown,
  setCurrentTabRedux,
} from '~/redux/reducers/globalSlice';
import {ProductCategoryResponse} from '~/types/product';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList, HomeStackParamList} from '~/types';
import {AppDispatch} from '~/app/store';
import {getProductsByCategory} from '~/redux/actions/productAction';
import {CATEGORY, CATEGORYSCREEN} from '~/constants/routeNames';
import {IconSvg} from '~/components/global/iconSvg';

const CardCategorySlide = () => {
  const allCategories = useSelector(selectAllCategories);
  const currentDropDown = useSelector(selectCurrentDropDown);
  const loadingGetCategories = useSelector(selectLoadingGetAllCategories);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const handleNavigate = (category: ProductCategoryResponse) => {
    dispatch(SetDirectionBottomBar('down'));
    navigation.navigate('Category', {
      screen: 'DetailCategoryScreen',
      params: {
        category: category,
      },
    });
  };
  return (
    <View
      style={{
        marginTop: HeightSize(30),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: WidthSize(30),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Category
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Category', {
              screen: 'CategoryScreen',
            });
            dispatch(setCurrentTabRedux('Category'));
          }}
          style={{
            width: WidthSize(80),
            height: HeightSize(40),
            backgroundColor: '#EFEFE8',
            borderTopLeftRadius: 36,
            borderBottomLeftRadius: 36,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSvg
            icon="IconArrowRightBlack"
            width={WidthSize(32)}
            height={WidthSize(32)}
          />
        </Pressable>
      </View>
      <FlatList
        style={{
          marginTop: HeightSize(20),
          paddingRight: HeightSize(20),
          height: WidthSize(200),
        }}
        data={
          loadingGetCategories === 'fulfilled'
            ? allCategories?.filter(
                item => item.name === currentDropDown.title,
              )[0].children
            : []
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: WidthSize(30),
          gap: WidthSize(20),
        }}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              handleNavigate(item);
            }}>
            <ImageBackground
              source={getUrl(item.image)}
              imageStyle={{borderRadius: 20}}
              style={{
                width: WidthSize(150),
                height: WidthSize(200),
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: HeightSize(44),
                  width: WidthSize(150),
                  justifyContent: 'center',
                  backgroundColor: '#D8D2C414',
                }}>
                <BlurBackground
                  // blurType="light"
                  blurAmount={15}
                  style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                />
                <Text
                  style={{
                    color: '#3B3021',
                    marginHorizontal: WidthSize(16),
                    ...TextFont.SMedium,
                    ...TextStyle.LG,
                  }}>
                  {item.name}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CardCategorySlide;
