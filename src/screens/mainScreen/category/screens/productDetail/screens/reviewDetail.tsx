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
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {ProductDetailStackParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '~/components/global/iconSvg';

const ReviewDetail = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProductDetailStackParamList>>();
  const onGoBack = () => {
    navigation.goBack();
  };

  const [dataReview, setDataReview] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      const random = Math.floor(Math.random() * 5) + 1;
      const data = {
        id: Math.random(),
        avatar: images.home.CategoryMen,
        name: `Julves Tan`,
        rating: random,
        comment: 'Absolute LOVE this shirt. Perfect color and awesome',
        time: 'March 01 06:23',
      };
      setDataReview((prev: any) => [...prev, data]);
    }
  }, []);

  const tabs = [
    {
      id: 0,
      title: 'Total',
    },
    {
      id: 1,
      title: '1',
    },
    {
      id: 2,
      title: '2',
    },
    {
      id: 3,
      title: '3',
    },
    {
      id: 4,
      title: '4',
    },
    {
      id: 5,
      title: '5',
    },
  ];

  const calculateRating = (rating: string) => {
    let total = 0;
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;

    dataReview.map((item: any) => {
      total += item.rating;
      if (item.rating === 1) {
        count1 += 1;
      }
      if (item.rating === 2) {
        count2 += 1;
      }
      if (item.rating === 3) {
        count3 += 1;
      }
      if (item.rating === 4) {
        count4 += 1;
      }
      if (item.rating === 5) {
        count5 += 1;
      }
    });
    switch (rating) {
      case 'total':
        return (total / dataReview.length).toFixed(1);
      case '1':
        return count1;
      case '2':
        return count2;
        break;
      case '3':
        return count3;
        break;
      case '4':
        return count4;
        break;
      case '5':
        return count5;
        break;
      default:
        break;
    }
  };

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct title="Reviews" onPressBack={onGoBack} showBag={false} />
      <View
        style={{
          paddingTop: HeightSize(32),
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: WidthSize(16),
            marginLeft: WidthSize(20),
          }}>
          {tabs.map((item, index) => {
            return index === 0 ? (
              <Pressable
                key={index}
                onPress={() => setCurrentTab(item.id)}
                style={{
                  paddingHorizontal: WidthSize(
                    currentTab === item.id ? 15 : 16,
                  ),
                  paddingVertical: HeightSize(8),
                  backgroundColor: '#EFEFE8',
                  borderWidth: currentTab === item.id ? WidthSize(1) : 0,
                  borderColor: '#836E44',
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.SM,
                    color: '#000000',
                  }}>
                  Total
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconSvg
                    icon="IconStarYellow"
                    width={WidthSize(12)}
                    height={WidthSize(12)}
                  />
                  <Text
                    style={{
                      ...TextFont.SMedium,
                      ...TextStyle.XS,
                      color: '#000000',
                      marginLeft: WidthSize(4),
                    }}>
                    {calculateRating('total')}
                    <Text
                      style={{
                        ...TextFont.SLight,
                        ...TextStyle.XXS,
                        color: '#000000',
                      }}>
                      {' '}
                      {`/${dataReview.length} Reviews`}
                    </Text>
                  </Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setCurrentTab(item.id)}
                key={index}
                style={{
                  padding: WidthSize(currentTab === item.id ? 9 : 10),
                  backgroundColor: '#EFEFE8',
                  borderWidth: currentTab === item.id ? WidthSize(1) : 0,
                  borderColor: '#836E44',
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...TextFont.SMedium,
                      ...TextStyle.XS,
                      color: '#000000',
                    }}>
                    {item.title}
                  </Text>
                  <IconSvg
                    icon="IconStarYellow"
                    width={WidthSize(12)}
                    height={WidthSize(12)}
                  />
                </View>
                <Text
                  style={{
                    ...TextFont.SLight,
                    ...TextStyle.XS,
                    color: '#000000',
                  }}>
                  {calculateRating(item.title)}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: WidthSize(20),
            marginTop: HeightSize(12),
          }}
          contentContainerStyle={{
            paddingBottom: HeightSize(120),
          }}
          data={
            currentTab === 0
              ? dataReview
              : dataReview.filter((item: any) => item.rating === currentTab)
          }
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  padding: HeightSize(16),
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: HeightSize(48),
                      height: HeightSize(48),
                      borderRadius: 16,
                    }}
                    source={item.avatar}
                  />
                  <View
                    style={{
                      marginLeft: WidthSize(20),
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          ...TextFont.SMedium,
                          color: '#3B3021',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          ...TextFont.SLight,
                          ...TextStyle.SM,
                          color: '#C3C3C3',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: WidthSize(4),
                        marginTop: HeightSize(2),
                      }}>
                      {Array.from({length: item.rating}).map((_, index) => {
                        return (
                          <IconSvg
                            key={index}
                            icon="IconStarBrown"
                            width={HeightSize(8)}
                            height={HeightSize(8)}
                          />
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        marginTop: HeightSize(8),
                        ...TextFont.SLight,
                        ...TextStyle.SM,
                        color: '#3B3021',
                      }}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ContainerImage>
  );
};

export default ReviewDetail;

const styles = StyleSheet.create({});
