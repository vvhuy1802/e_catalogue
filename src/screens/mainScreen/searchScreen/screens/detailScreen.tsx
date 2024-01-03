import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CategoryStackParamList,
  Normalized,
  SearchStackParamList,
} from '~/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {SEARCHSCREEN} from '~/constants/routeNames';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryHeart from '~/components/global/primaryHeart';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {getUrl} from '~/utils';
import category from '../../category';
import CategoryFilter from '../../category/components/categoryFilter';
import {getProductsByCategory} from '~/redux/actions/productAction';
import {selectProductsByCategory} from '~/redux/reducers/productSlice';
import axios from 'axios';

type Props = {
  route: RouteProp<SearchStackParamList, 'DetailSearchScreen'>;
};
const DetailScreen = ({route}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = route.params.searchQuery;
  const navigation =
    useNavigation<
      StackNavigationProp<SearchStackParamList, 'DetailSearchScreen'>
    >();

  const [currentTab, setCurrentTab] = useState(
    // category?.children.length === 0 ? 0 : category?.children[0].id,
    0,
  );

  useEffect(() => {
    dispatch(getProductsByCategory(currentTab as number));
  }, [currentTab]);

  const [filter, setFilter] = useState<Normalized<string, any>>({
    ids: [],
    entities: {},
  });

  const [dataFilter, setDataFilter] = useState<
    Array<{
      id: number;
      name: string;
      actualId: string;
    }>
  >([]);

  const navigations =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();

  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigation.goBack();
  };

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `https://e-catalogue.abcdavid.top/product/filter?name=${searchQuery}`,
      )
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        isShowBottomBarWhenBack={true}
        title="Search"
        onPressBack={onGoBack}
      />

      {/* <CategoryFilter
        navigation={navigation}
        categoryId={category?.name}
        filter={filter}
        setFilter={setFilter}
      /> */}
      <View
        style={{
          marginTop: HeightSize(32),
        }}>
        <ScrollView>
          <View
            style={{
              marginTop: HeightSize(20),
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: WidthSize(16),
              marginBottom: HeightSize(120),
              paddingHorizontal: WidthSize(32),
            }}>
            {data.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    dispatch(SetDirectionBottomBar('down'));
                    navigations.navigate('ProductStack', {
                      screen: 'ProductDetailScreen',
                      params: {
                        productId: item.id.toString(),
                      },
                    });
                  }}
                  key={index}
                  style={{
                    width: width / 2 - WidthSize(40),
                    borderRadius: 16,
                    backgroundColor: '#F1EFE9',
                    paddingHorizontal: HeightSize(10),
                    paddingTop: HeightSize(10),
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 2.22,
                  }}>
                  <Image
                    source={getUrl(item.image)}
                    style={{
                      width: width / 2 - WidthSize(60),
                      height: width / 2,
                      alignSelf: 'center',
                      borderRadius: 16,
                    }}
                    resizeMode="cover"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: width / 2 - WidthSize(60),
                      marginTop: HeightSize(14),
                      color: '#3B3021',
                      ...TextStyle.Base,
                      ...TextFont.SMedium,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: '#CCCBD3',
                      ...TextStyle.SM,
                      ...TextFont.SMedium,
                    }}>
                    ''
                  </Text>
                  <Text
                    style={{
                      color: '#3B3021',
                      ...TextStyle.Base,
                      ...TextFont.SBold,
                      marginTop: HeightSize(16),
                      marginBottom: HeightSize(15),
                    }}>
                    {item?.minPrice ? '$' + item?.minPrice : 'No price'}
                  </Text>
                  <PrimaryHeart
                    styleView={{
                      position: 'absolute',
                      width: WidthSize(36),
                      height: WidthSize(36),
                      bottom: HeightSize(12),
                      right: HeightSize(16),
                    }}
                    widthIcon={WidthSize(16)}
                    heightIcon={WidthSize(16)}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        {/* <FlatList
          data={category?.children}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: WidthSize(32),
            paddingHorizontal: WidthSize(32),
          }}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                setCurrentTab(item.id);
              }}
              key={index}
              style={{}}>
              <Text
                style={{
                  color: currentTab === item.id ? '#3B3021' : '#CCCBD3',
                  ...TextStyle.Base,
                  ...TextFont.SBold,
                }}>
                {item.name}
              </Text>
              {currentTab === item.id && (
                <View
                  style={{
                    width: WidthSize(28),
                    height: HeightSize(2.5),
                    backgroundColor: '#836E44',
                    borderRadius: 8,
                    position: 'absolute',
                    bottom: 0,
                  }}
                />
              )}
            </Pressable>
          )}
        /> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingHorizontal: WidthSize(32),
          marginTop: HeightSize(20),
          gap: WidthSize(16),
        }}>
        {dataFilter?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: '#EFEFE8',
                borderRadius: 16,
                paddingLeft: WidthSize(16),
                paddingRight: WidthSize(8),
                paddingVertical: HeightSize(12),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.SLight,
                  color: '#3B3021',
                }}>
                {item.name}
              </Text>
              <IconSvg
                onPress={() => handleDeleteFilter(item.actualId)}
                style={{
                  marginLeft: WidthSize(8),
                }}
                icon="IconCloseBoldBrown"
              />
            </View>
          );
        })}
      </View>

      <ScrollView
        style={{
          marginTop: HeightSize(20),
          flex: 1,
          paddingHorizontal: WidthSize(32),
        }}>
        <View
          style={{
            marginTop: HeightSize(20),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: WidthSize(16),
            marginBottom: HeightSize(120),
          }}>
          {/* {products?.products?.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  dispatch(SetDirectionBottomBar('down'));
                  navigation.navigate('ProductStack', {
                    screen: 'ProductDetailScreen',
                    params: {
                      productId: item.id.toString(),
                    },
                  });
                }}
                key={index}
                style={{
                  width: width / 2 - WidthSize(40),
                  borderRadius: 16,
                  backgroundColor: '#F1EFE9',
                  paddingHorizontal: HeightSize(10),
                  paddingTop: HeightSize(10),
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 2.22,
                }}>
                <Image
                  source={getUrl(item.image)}
                  style={{
                    width: width / 2 - WidthSize(60),
                    height: width / 2,
                    alignSelf: 'center',
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
                <Text
                  numberOfLines={1}
                  style={{
                    width: width / 2 - WidthSize(60),
                    marginTop: HeightSize(14),
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SMedium,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: '#CCCBD3',
                    ...TextStyle.SM,
                    ...TextFont.SMedium,
                  }}>
                  {item?.type ? item?.type : 'No type'}
                </Text>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SBold,
                    marginTop: HeightSize(16),
                    marginBottom: HeightSize(15),
                  }}>
                  {item?.minPrice ? '$' + item?.minPrice : 'No price'}
                </Text>
                <PrimaryHeart
                  styleView={{
                    position: 'absolute',
                    width: WidthSize(36),
                    height: WidthSize(36),
                    bottom: HeightSize(12),
                    right: HeightSize(16),
                  }}
                  widthIcon={WidthSize(16)}
                  heightIcon={WidthSize(16)}
                />
              </Pressable>
            );
          })} */}
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
