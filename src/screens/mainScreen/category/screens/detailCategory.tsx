import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  CategoryStackParamList,
  Normalized,
  ProductDetailStackParamList,
} from '~/types';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {IconSvg} from '~/components/global/iconSvg';
import {TextStyle, TextFont} from '~/theme/textStyle';
import CategoryFilter from '../components/categoryFilter';
import HeaderProduct from '~/components/global/headerProduct';

type Props = {
  route: RouteProp<CategoryStackParamList, 'DetailCategoryScreen'>;
};

const DetailCategory = ({route}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();
  const tabs = [
    {
      id: 1,
      title: 'Coats',
    },
    {
      id: 2,
      title: 'Cardigans',
    },
    {
      id: 3,
      title: 'Sweater',
    },
    {
      id: 4,
      title: 'Trousers',
    },
  ];
  const dataColoursNormalize = {
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    entities: {
      1: {name: 'Whites', color: '#FFFFFF'},
      2: {name: 'Blacks', color: '#000000'},
      3: {name: 'Greys', color: '#83878D'},
      4: {name: 'Beiges', color: '#A99C82'},
      5: {name: 'Browns', color: '#401D0B'},
      6: {name: 'Reds', color: '#A50221'},
      7: {name: 'Greens', color: '#5FA758'},
      8: {name: 'Blues', color: '#56AAFF'},
      9: {name: 'Purples', color: '#800080'},
      10: {name: 'Yellows', color: '#FFDD00'},
      11: {name: 'Pinks', color: '#FF68B4'},
      12: {name: 'Oranges', color: '#F2520A'},
    },
  };

  const dataSizeNormalize = {
    ids: [1, 2, 3, 4, 5, 6, 7],
    entities: {
      1: {size: 'XS'},
      2: {size: 'S'},
      3: {size: 'S'},
      4: {size: 'M'},
      5: {size: 'L'},
      6: {size: 'XL'},
      7: {size: 'XXL'},
    },
  };
  const [currentTab, setCurrentTab] = useState(1);

  const dataListItems = [
    {
      id: 1,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 2,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 3,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 4,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 5,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 6,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 7,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
  ];

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

  useEffect(() => {
    setDataFilter([]);
    filter.ids.map((item, index) => {
      if (item === 'sortBy') {
        setDataFilter(prev => [
          ...prev,
          {
            id: index,
            name: filter.entities[item as any].name,
            actualId: `sortBy-${filter.entities[item as any].id}`,
          },
        ]);
      } else if (item === 'color') {
        filter.entities[item as any].ids.map(({color, index}: any) => {
          setDataFilter(prev => [
            ...prev,
            {
              id: index,
              name: filter.entities[item as any].entities[color].name,
              actualId: `color-${
                filter.entities[item as any].entities[color].id
              }`,
            },
          ]);
        });
      } else if (item === 'size') {
        filter.entities[item as any].ids.map(({size, index}: any) => {
          setDataFilter(prev => [
            ...prev,
            {
              id: index,
              name: filter.entities[item as any].entities[size].size,
              actualId: `size-${
                filter.entities[item as any].entities[size].id
              }`,
            },
          ]);
        });
      } else if (item === 'price') {
        setDataFilter(prev => [
          ...prev,
          {
            id: index,
            name:
              '$' +
              filter.entities[item as any][0] +
              ' - ' +
              '$' +
              filter.entities[item as any][1],
            actualId: `price-${filter.entities[item as any][0]}-${
              filter.entities[item as any][1]
            }`,
          },
        ]);
      }
      // console.log('filter', JSON.stringify(filter, null, 3));
    });
  }, [filter]);

  const handleDeleteFilter = (id: string) => {
    const splitId = id.split('-');
    switch (splitId[0]) {
      case 'sortBy':
        setFilter(prev => {
          const newFilter = {...prev};
          delete newFilter.entities[splitId[0] as any];
          newFilter.ids = newFilter.ids.filter(item => item !== splitId[0]);
          return newFilter;
        });
        break;
      case 'color':
        setFilter(prev => {
          const newFilter = {...prev};
          const newColor = {...newFilter.entities[splitId[0] as any]};
          newColor.ids.splice(newColor.ids.indexOf(parseInt(splitId[1])), 1);
          delete newColor.entities[splitId[1]];
          newFilter.entities[splitId[0] as any] = newColor;

          return newFilter;
        });
        break;
      case 'size':
        setFilter(prev => {
          const newFilter = {...prev};
          const newSize = {...newFilter.entities[splitId[0] as any]};
          newSize.ids.splice(newSize.ids.indexOf(parseInt(splitId[1])), 1);
          delete newSize.entities[splitId[1]];
          newFilter.entities[splitId[0] as any] = newSize;
          return newFilter;
        });
        break;
      case 'price':
        setFilter(prev => {
          const newFilter = {...prev};
          delete newFilter.entities[splitId[0] as any];
          newFilter.ids = newFilter.ids.filter(item => item !== splitId[0]);
          return newFilter;
        });
        break;
      default:
        break;
    }
  };

  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigation.goBack();
  };

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct onPressBack={onGoBack} />

      <CategoryFilter
        navigation={navigation}
        categoryId={route.params.categoryId}
        filter={filter}
        setFilter={setFilter}
      />
      <View
        style={{
          marginTop: HeightSize(32),
          height: HeightSize(30),
        }}>
        <FlatList
          data={tabs}
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
                {item.title}
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
        />
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
        {dataFilter.map((item, index) => {
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
          }}>
          {dataListItems.map((item, index) => {
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
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2 - WidthSize(60),
                    height: width / 2 - WidthSize(60),
                    alignSelf: 'center',
                    borderRadius: 16,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginTop: HeightSize(14),
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SMedium,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: '#CCCBD3',
                    ...TextStyle.SM,
                    ...TextFont.SMedium,
                  }}>
                  {item.type}
                </Text>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SBold,
                    marginTop: HeightSize(16),
                    marginBottom: HeightSize(15),
                  }}>
                  {item.price}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius: 100,
                    width: WidthSize(36),
                    height: WidthSize(36),
                    bottom: HeightSize(12),
                    right: HeightSize(16),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconSvg
                    icon="IconHeartGray"
                    width={WidthSize(16)}
                    height={WidthSize(16)}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default DetailCategory;

const styles = StyleSheet.create({});
