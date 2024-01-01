import {
  Image,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {HeightSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllOrder} from '~/redux/reducers/orderSlice';
import {Normalized, OrderStackAdminStoreParamList} from '~/types';
import {NormalizeCartVariant, OrderAdminStore} from '~/types/order';
import {formatDate, getUrl} from '~/utils';
import {NormalizeColor} from '~/types/color';
import {getAllOrder} from '~/redux/actions/orderAction';
import {orderService} from '~/services/service/order.service';
import {AppDispatch} from '~/app/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const DeliveringScreen = () => {
  const allOrder = useSelector(selectAllOrder);
  const [dataDelivered, setDataDelivered] =
    React.useState<Normalized<string, Array<OrderAdminStore>>>();
  const dispatch = useDispatch<AppDispatch>();

  const navigation =
    useNavigation<
      StackNavigationProp<
        OrderStackAdminStoreParamList,
        'OrderScreenAdminStore'
      >
    >();

  useEffect(() => {
    const data: Normalized<string, Array<OrderAdminStore>> = {
      ids: [],
      entities: {},
    };
    allOrder.length >= 0 &&
      allOrder.forEach(item => {
        if (item.deliver_status === 'delivering') {
          const date = new Date(item.order_date);
          const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          if (data.ids.indexOf(dateString) === -1) {
            data.ids.push(dateString);
            data.entities[dateString] = [];
          }
          data.entities[dateString].push(item);
        }
      });
    setDataDelivered(data);
  }, [allOrder]);

  const totalOrder = (items: NormalizeCartVariant) => {
    let total = 0;
    let totalItem = 0;
    items.ids.map(item => {
      totalItem += items.entities[item].quantity;
      total += items.entities[item].price * items.entities[item].quantity;
    });
    return {
      total,
      totalItem,
    };
  };

  return dataDelivered ? (
    <View
      style={{
        flex: 1,
      }}>
      <SectionList
        style={{
          paddingTop: HeightSize(16),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: HeightSize(32),
        }}
        sections={dataDelivered.ids
          .map(item => ({
            title: item,
            data: dataDelivered.entities[item],
          }))
          .reverse()}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('DetailOrderScreenAdminStore', {
                order: item,
              });
            }}
            style={{
              gap: HeightSize(16),
              backgroundColor: '#EFEFE8',
              padding: HeightSize(16),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
            }}>
            {item.items.ids.map((variant, index) => {
              return (
                <View
                  key={variant}
                  style={{
                    backgroundColor: '#EFEFE8',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    padding: HeightSize(16),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={getUrl(item.items.entities[variant].image)}
                      style={{
                        width: HeightSize(90),
                        height: HeightSize(90),
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        paddingLeft: HeightSize(8),
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.LG,
                          color: '#3B3021',
                          width: width - HeightSize(154),
                        }}>
                        {item.items.entities[variant].product.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: HeightSize(4),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#E8E8E8',
                              paddingHorizontal: HeightSize(6),
                              paddingVertical: HeightSize(2),
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderRadius: 4,
                              shadowColor: '#000',
                              shadowOffset: {width: 1, height: 1},
                              shadowOpacity: 0.1,
                              gap: HeightSize(8),
                            }}>
                            {item.items.entities[variant].color && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    width: HeightSize(12),
                                    height: HeightSize(12),
                                    borderRadius: 6,
                                    backgroundColor:
                                      NormalizeColor.entities[
                                        item.items.entities[
                                          variant
                                        ].color.toLocaleLowerCase()
                                      ],
                                    marginRight: HeightSize(4),
                                  }}
                                />
                                <Text
                                  style={{
                                    ...TextFont.SRegular,
                                    ...TextStyle.SM,
                                    color: '#3B3021',
                                  }}>
                                  {item.items.entities[variant].color}
                                </Text>
                              </View>
                            )}

                            {item.items.entities[variant].size && (
                              <Text
                                style={{
                                  ...TextFont.SRegular,
                                  ...TextStyle.SM,
                                  color: '#3B3021',
                                }}>
                                - {item.items.entities[variant].size}
                              </Text>
                            )}
                          </View>
                        </View>
                        <Text
                          style={{
                            ...TextFont.SLight,
                            ...TextStyle.Base,
                            color: '#3B3021',
                          }}>
                          x{item.items.entities[variant].quantity}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            ...TextFont.SMedium,
                            ...TextStyle.Base,
                            color: 'red',
                          }}>
                          ${item.items.entities[variant].price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
            <View
              style={{
                marginTop: HeightSize(8),
                backgroundColor: '#836E4452',
                height: 1,
                width: '100%',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.SM,
                  color: '#3B3021',
                }}>
                {totalOrder(item.items).totalItem}{' '}
                {totalOrder(item.items).totalItem > 1 ? 'items' : 'item'}
              </Text>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.LG,
                  color: '#3B3021',
                }}>
                Total: ${totalOrder(item.items).total}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#836E4452',
                height: 1,
                width: '100%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                orderService
                  .updateStatusOrder(item.id, {status: 'delivered'})
                  .then(res => {
                    console.log(res);
                    res.status === 200 && dispatch(getAllOrder());
                  });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: HeightSize(48),
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#836E44',
                  paddingVertical: HeightSize(8),
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    ...TextFont.SRegular,
                    ...TextStyle.SM,
                    color: 'white',
                  }}>
                  Delivering
                </Text>
              </View>
            </TouchableOpacity>
          </Pressable>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={{}}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.XL,
                color: '#3B3021',
                marginLeft: HeightSize(16),
              }}>
              {formatDate(title)}
            </Text>
          </View>
        )}
      />
    </View>
  ) : null;
};

export default DeliveringScreen;
