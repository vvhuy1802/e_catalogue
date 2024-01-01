import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import HeaderAdmin from '~/components/global/headerAdmin';
import {useSelector} from 'react-redux';
import {selectAllOrder} from '~/redux/reducers/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AdminStoreStackParamList} from '~/types';

const HomeScreen = () => {
  const shopInfo = [
    {
      id: 1,
      title: 'Stores',
    },
    {
      id: 2,
      title: 'Income',
    },
    {
      id: 3,
      title: '',
    },
    {
      id: 4,
      title: 'Items Sold',
    },
  ];

  const actionNeeded = [
    {
      id: 1,
      title: 'To Ship',
    },
  ];

  const allOrder = useSelector(selectAllOrder);
  const navigation =
    useNavigation<StackNavigationProp<AdminStoreStackParamList>>();
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Home Screen" />
      <View
        style={{
          paddingHorizontal: WidthSize(32),
          paddingVertical: HeightSize(16),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          E-Catalogue
        </Text>
        <View
          style={{
            paddingTop: HeightSize(16),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: WidthSize(20),
            paddingHorizontal: WidthSize(20),
          }}>
          {shopInfo.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  width: WidthSize(140),
                  padding: HeightSize(16),
                  justifyContent: 'center',
                  backgroundColor: '#EFEFE8',
                  borderRadius: 16,
                }}>
                <Text
                  style={{
                    color: '#836E44',
                    ...TextStyle.Base,
                    ...TextFont.SMedium,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextStyle.text3_5XL,
                    ...TextFont.SMedium,
                    marginTop: HeightSize(16),
                  }}>
                  0
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={{
            marginTop: HeightSize(32),
          }}>
          <Text
            style={{
              color: '#3B3021',
              ...TextStyle.XXXL,
              ...TextFont.GRegular,
            }}>
            Action Needed
          </Text>
          <View
            style={{
              paddingTop: HeightSize(16),
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: WidthSize(20),
              paddingHorizontal: WidthSize(20),
            }}>
            {actionNeeded.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    width: WidthSize(140),
                    padding: HeightSize(16),
                    justifyContent: 'center',
                    backgroundColor: '#EFEFE8',
                    borderRadius: 16,
                  }}>
                  <Text
                    style={{
                      color: '#836E44',
                      ...TextStyle.Base,
                      ...TextFont.SMedium,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: '#3B3021',
                      ...TextStyle.text3_5XL,
                      ...TextFont.SMedium,
                      marginTop: HeightSize(16),
                    }}>
                    {allOrder
                      ? allOrder?.filter(
                          item => item.deliver_status === 'pending',
                        ).length
                      : 0}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('OrderStackAdminStoreParamsList');
                    }}
                    style={{
                      paddingVertical: HeightSize(10),
                      marginTop: HeightSize(16),
                      backgroundColor: '#836E44',
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        ...TextStyle.Base,
                        ...TextFont.SRegular,
                      }}>
                      View
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ContainerImage>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
