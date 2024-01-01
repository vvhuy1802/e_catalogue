import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {OrderStackAdminStoreParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact} from '~/types/contact';
import {NormalizedLocationVietNam} from '~/types/auth';
import axios from 'axios';
import {WidthSize, HeightSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {AppProvider} from '~/app/appProvider';
import {IconSvg} from '~/components/global/iconSvg';
import {getUrl} from '~/utils';
import {NormalizeColor} from '~/types/color';
import {getAllOrder} from '~/redux/actions/orderAction';
import {orderService} from '~/services/service/order.service';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {NormalizeCartVariant, OrderAdminStore} from '~/types/order';

type Props = {
  route: RouteProp<
    OrderStackAdminStoreParamList,
    'DetailOrderScreenAdminStore'
  >;
};
const DetailOrderScreen = ({route}: Props) => {
  const [order, setOrder] = React.useState<OrderAdminStore>(route.params.order);
  const [status, setStatus] = React.useState<string>(
    route.params.order.deliver_status,
  );
  const [dataContact, setDataContact] = React.useState<Contact | any>();
  const [localAddress, setLocalAddress] =
    React.useState<NormalizedLocationVietNam | null>();
  const navigation =
    useNavigation<
      StackNavigationProp<
        OrderStackAdminStoreParamList,
        'DetailOrderScreenAdminStore'
      >
    >();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .get(`https://e-catalogue.abcdavid.top/contact?id=${order.contact_id}`)
      .then(res => {
        setDataContact(res.data);
      });

    const getLocalAddress = async () => {
      const res = await AppProvider.getLocationVietNam();
      setLocalAddress(res);
    };
    getLocalAddress();
  }, []);

  const formatOrderDate = (date: string) => {
    //format like 12:00:00, 12/08/2021

    const time = new Date(date);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const formatHour = hour < 10 ? `0${hour}` : hour;
    const formatMinute = minute < 10 ? `0${minute}` : minute;
    const formatSecond = second < 10 ? `0${second}` : second;
    const formatDay = day < 10 ? `0${day}` : day;
    const formatMonth = month < 10 ? `0${month}` : month;
    const formatYear = year < 10 ? `0${year}` : year;
    return `${formatHour}:${formatMinute}:${formatSecond}, ${formatDay}/${formatMonth}/${formatYear}`;
  };

  const orderStatusAdapter = (status: string) => {
    switch (status) {
      case 'pending':
        return {color: '#FFC107', text: 'Pending'};
      case 'delivering':
        return {color: '#56AAFF', text: 'Delivering'};
      case 'delivered':
        return {color: '#4CAF50', text: 'Delivered'};
      case 'cancelled':
        return {color: '#F44336', text: 'Cancelled'};
      default:
        return {color: '#FFC107', text: 'Pending'};
    }
  };
  const totalOrder = (items: NormalizeCartVariant) => {
    let total = 15;
    let totalItem = 0;
    items?.ids?.map(item => {
      totalItem += items.entities[item].quantity;
      total += items.entities[item].price * items.entities[item].quantity;
    });
    return {
      total,
      totalItem,
    };
  };

  return (
    <ContainerImage
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        isShowBottomBarWhenBack={false}
        title="Detail Order"
        onPressBack={() => {
          navigation.goBack();
        }}
        showBag={false}
      />
      <ScrollView>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.Title,
            color: '#3B3021',
            paddingLeft: WidthSize(16),
            marginTop: WidthSize(32),
          }}>
          User Information
        </Text>

        <View
          style={{
            marginTop: HeightSize(12),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: WidthSize(16),
            borderRadius: 12,
            backgroundColor: '#EFEFE8',
            paddingHorizontal: WidthSize(16),
          }}>
          <IconSvg icon="IconLocationBrown" />
          <View
            style={{
              flex: 1,
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(16),
            }}>
            <View>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#836E44',
                }}>
                {dataContact?.fullname ? dataContact?.fullname : 'Vũ Viết Huy'}{' '}
                | {dataContact?.phone}
              </Text>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#836E44',
                }}>
                {dataContact?.address?.details || ''},{' '}
                {
                  localAddress?.entities[dataContact?.address.province]
                    ?.districts.entities[dataContact?.address?.district]?.wards
                    .entities[dataContact?.address?.ward]?.name
                }
                ,{' '}
                {
                  localAddress?.entities[dataContact?.address?.province]
                    ?.districts.entities[dataContact?.address?.district]?.name
                }
                , {localAddress?.entities[dataContact?.address?.province]?.name}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.Title,
            color: '#3B3021',
            paddingLeft: WidthSize(16),
            marginTop: WidthSize(32),
          }}>
          Product Information
        </Text>
        <View
          style={{
            marginTop: HeightSize(12),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: WidthSize(16),
            borderRadius: 12,
            backgroundColor: '#EFEFE8',
            paddingHorizontal: WidthSize(16),
            paddingVertical: HeightSize(16),
          }}>
          <View
            style={{
              gap: HeightSize(16),
            }}>
            {order?.items?.ids?.map((id: any) => {
              return (
                <View
                  key={id}
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={getUrl(order.items.entities[id].image)}
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
                        width: width - HeightSize(170),
                      }}>
                      {order.items.entities[id].product.name}
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
                          {order.items.entities[id].color && (
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
                                      order.items.entities[
                                        id
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
                                {order.items.entities[id].color}
                              </Text>
                            </View>
                          )}

                          {order.items.entities[id].size && (
                            <Text
                              style={{
                                ...TextFont.SRegular,
                                ...TextStyle.SM,
                                color: '#3B3021',
                              }}>
                              - {order.items.entities[id].size}
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
                        x{order.items.entities[id].quantity}
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
                        ${order.items.entities[id].price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.Title,
            color: '#3B3021',
            paddingLeft: WidthSize(16),
            marginTop: WidthSize(32),
          }}>
          Order Information
        </Text>
        <View
          style={{
            marginTop: HeightSize(12),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: WidthSize(16),
            borderRadius: 12,
            backgroundColor: '#EFEFE8',
            paddingHorizontal: WidthSize(16),
            paddingVertical: HeightSize(16),
            marginBottom: HeightSize(16),
          }}>
          <View
            style={{
              gap: HeightSize(8),
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
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Order date:
              </Text>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                {formatOrderDate(order.order_date)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Order status:
              </Text>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                  color: orderStatusAdapter(status).color,
                }}>
                {orderStatusAdapter(status).text}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Shipping fee:
              </Text>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                $15
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Total:
              </Text>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                ${totalOrder(order.items).total}
              </Text>
            </View>
          </View>
        </View>
        {status === 'pending' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: HeightSize(48),
              marginHorizontal: WidthSize(16),
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
            }}>
            <TouchableOpacity
              onPress={() => {
                orderService
                  .updateStatusOrder(order.id, {status: 'canceled'})
                  .then(res => {
                    setStatus('canceled');
                    res.status === 200 && dispatch(getAllOrder());
                  });
              }}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FF4D4F',
                paddingVertical: HeightSize(8),
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.SM,
                  color: '#FF4D4F',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                orderService
                  .updateStatusOrder(order.id, {status: 'delivering'})
                  .then(res => {
                    setStatus('delivering');
                    res.status === 200 && dispatch(getAllOrder());
                  });
              }}
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
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {status === 'delivering' && (
          <TouchableOpacity
            onPress={() => {
              orderService
                .updateStatusOrder(order.id, {status: 'delivered'})
                .then(res => {
                  setStatus('delivered');
                  res.status === 200 && dispatch(getAllOrder());
                });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: HeightSize(48),
              marginHorizontal: WidthSize(16),
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
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
        )}
        {status === 'delivered' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: HeightSize(48),
              marginHorizontal: WidthSize(16),
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#5FA758',
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
                Delivered
              </Text>
            </View>
          </View>
        )}
        {status === 'canceled' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: HeightSize(48),
              marginHorizontal: WidthSize(16),
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'red',
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
                Cancelled
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </ContainerImage>
  );
};

export default DetailOrderScreen;
