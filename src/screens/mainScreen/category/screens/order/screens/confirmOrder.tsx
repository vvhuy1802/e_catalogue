import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectOrder, setDataOrder} from '~/redux/reducers/orderSlice';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryButton from '~/components/global/primaryButton';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {HomeStackParamList, Normalized, OrderStackParamList} from '~/types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getUrl} from '~/utils';
import {CartVariant, NormalizeCartVariant, OrderParams} from '~/types/order';
import {OrderStackContext} from '~/utils/context';
import {orderService} from '~/services/service/order.service';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import {FAB} from 'react-native-paper';
import {AddPopupMessage} from '~/redux/reducers/popupMessageSlice';
import {userInfoService} from '~/services/service/userInfo.service';
import {
  selectAddressTree,
  selectNormalizedAddressTree,
  selectAllUserContact,
} from '~/redux/reducers/contactSlice';
import {selectUserInfo} from '~/redux/reducers/userInfo';
import {ContactAPIReponse} from '~/types/contact';

type Props = {
  route: RouteProp<OrderStackParamList, 'ConfirmOrder'>;
};
const ConfirmOrder = ({route}: Props) => {
  const dataOrder = route.params.dataOrder as NormalizeCartVariant;
  const navigation = useNavigation<StackNavigationProp<OrderStackParamList>>();
  const rootNavigation =
    useNavigation<StackNavigationProp<HomeStackParamList>>();
  const onGoBack = () => {
    navigation.goBack();
  };
  const [paymentMethod, setPaymentMethod] = React.useState<'COD' | 'Momo'>(
    'COD',
  );
  const {localAddress, dataAddress} = useContext(OrderStackContext);
  const dispatch = useDispatch<AppDispatch>();

  const bottomSheetBoardRef = useRef<BottomSheet>(null);
  const snapPointsBoard = useMemo(() => ['60%'], []);
  const handleAddressSnapPress = useCallback((index: number) => {
    bottomSheetBoardRef.current?.snapToIndex(index);
    if (index == 0) {
    }
  }, []);
  const handleCloseBoardPress = useCallback(() => {
    bottomSheetBoardRef.current?.close();
  }, []);

  const addressTree = useSelector(selectAddressTree);
  const normalizedAddressTree = useSelector(selectNormalizedAddressTree);
  const allUserContact = useSelector(selectAllUserContact);
  const userInfo = useSelector(selectUserInfo);

  const [choosedAddress, setChoosedAddress] = useState<ContactAPIReponse>(
    allUserContact[0],
  );
  return (
    <ContainerImage
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: HeightSize(10),
        }}>
        <Pressable
          onPress={onGoBack}
          style={{
            width: HeightSize(80),
            height: HeightSize(50),
            borderTopRightRadius: 36,
            borderBottomRightRadius: 36,
            backgroundColor: '#EFEFE8',
            marginTop: HeightSize(3),
            justifyContent: 'center',
            paddingLeft: HeightSize(20),
            zIndex: 99,
          }}>
          <IconSvg
            icon="IconArrowLeftBlack"
            width={HeightSize(32)}
            height={HeightSize(32)}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: HeightSize(170),
        }}>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.text4XL,
            color: '#3B3021',
            paddingLeft: WidthSize(32),
            marginTop: WidthSize(32),
          }}>
          Confirm Order
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: WidthSize(32),
            marginTop: HeightSize(32),
          }}>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            Shipping
          </Text>
          <Pressable
            onPress={() => {
              // navigation.navigate('EditAddress');
              handleAddressSnapPress(0);
            }}>
            <Text
              style={{
                ...TextFont.SMedium,
                ...TextStyle.Base,
                color: '#836E44',
              }}>
              Edit
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: HeightSize(12),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: WidthSize(32),
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
                {userInfo?.fullname ? userInfo?.fullname : 'Vũ Viết Huy'} |{' '}
                {choosedAddress?.phone}
              </Text>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#836E44',
                }}>
                {choosedAddress?.address?.details || ''},{' '}
                {
                  localAddress?.entities[choosedAddress?.address?.province]
                    ?.districts.entities[choosedAddress?.address?.district]
                    ?.wards.entities[choosedAddress?.address?.ward]?.name
                }
                ,{' '}
                {
                  localAddress?.entities[choosedAddress?.address?.province]
                    ?.districts.entities[choosedAddress?.address?.district]
                    ?.name
                }
                ,{' '}
                {
                  localAddress?.entities[choosedAddress?.address?.province]
                    ?.name
                }
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: WidthSize(32),
            marginTop: HeightSize(32),
          }}>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            {`Order item${dataOrder.ids.length > 1 ? 's' : ''}`}
          </Text>
          <Text
            style={{
              ...TextFont.SRegular,
              ...TextStyle.Base,
              color: '#CCCBD3',
            }}>{`${dataOrder.ids.length} item${
            dataOrder.ids.length > 1 ? 's' : ''
          }`}</Text>
        </View>
        <View
          style={{
            marginTop: HeightSize(12),
            height: WidthSize(282),
            paddingBottom: HeightSize(32),
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: WidthSize(16),
              paddingHorizontal: WidthSize(32),
            }}>
            {dataOrder.ids.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: WidthSize(168),
                    height: WidthSize(250),
                    borderRadius: 16,
                    backgroundColor: '#F1EFE9',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                  }}>
                  <Image
                    source={getUrl(dataOrder.entities[item].image)}
                    style={{
                      width: WidthSize(148),
                      height: WidthSize(148),
                      borderRadius: 12,
                      marginTop: WidthSize(10),
                      alignSelf: 'center',
                    }}
                  />
                  <View
                    style={{
                      marginTop: HeightSize(14),
                      paddingHorizontal: WidthSize(12),
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: WidthSize(148),
                        ...TextFont.SMedium,
                        ...TextStyle.Base,
                        color: '#3B3021',
                      }}>
                      {dataOrder.entities[item].product.name}
                    </Text>
                    <Text
                      style={{
                        ...TextFont.SMedium,
                        ...TextStyle.SM,
                        color: '#CCCBD3',
                      }}>
                      {`${dataOrder.entities[item].size} - ${dataOrder.entities[item].color}`}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: HeightSize(16),
                      }}>
                      <Text
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.Base,
                          color: '#3B3021',
                        }}>
                        ${dataOrder.entities[item].price}
                      </Text>
                      <Text
                        style={{
                          ...TextFont.SMedium,
                          ...TextStyle.SM,
                          color: '#CCCBD3',
                        }}>
                        x{dataOrder.entities[item].quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{paddingHorizontal: WidthSize(32)}}>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            Payment
          </Text>
          <Pressable
            onPress={() => setPaymentMethod('COD')}
            style={{
              width: '100%',
              height: HeightSize(45),
              borderRadius: 12,
              backgroundColor: '#EFEFE8',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: WidthSize(12),
              marginTop: HeightSize(12),
            }}>
            <Text
              style={{
                ...TextFont.SLight,
                ...TextStyle.Base,
                color: '#3B3021',
              }}>
              Cash on Delivery
            </Text>
            {paymentMethod === 'COD' && (
              <IconSvg
                icon="IconCheckLightBrown"
                width={HeightSize(16)}
                height={HeightSize(16)}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => setPaymentMethod('Momo')}
            style={{
              width: '100%',
              height: HeightSize(45),
              borderRadius: 12,
              backgroundColor: '#EFEFE8',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: WidthSize(12),
              marginTop: HeightSize(12),
            }}>
            <Text
              style={{
                ...TextFont.SLight,
                ...TextStyle.Base,
                color: '#3B3021',
              }}>
              Momo e-wallet
            </Text>
            {paymentMethod === 'Momo' && (
              <IconSvg
                icon="IconCheckLightBrown"
                width={HeightSize(16)}
                height={HeightSize(16)}
              />
            )}
          </Pressable>
        </View>

        <View
          style={{marginTop: HeightSize(32), paddingHorizontal: WidthSize(32)}}>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            Payment Detail
          </Text>
          <View
            style={{
              marginTop: HeightSize(12),
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(20),
              borderRadius: 16,
              backgroundColor: '#EFEFE8',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Sub Total
              </Text>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                $
                {dataOrder.ids.reduce(
                  (a, b) =>
                    a +
                    dataOrder.entities[b].price *
                      dataOrder.entities[b].quantity,
                  0,
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Shipping
              </Text>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                ${' '}
                {dataOrder.ids.reduce(
                  (a, b) =>
                    a +
                    dataOrder.entities[b].price *
                      dataOrder.entities[b].quantity,
                  0,
                ) * 0.05}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                marginVertical: HeightSize(24),
                borderStyle: 'dashed',
                borderWidth: 0.5,
                borderColor: '#836E44',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Total
              </Text>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                $
                {dataOrder.ids.reduce(
                  (a, b) =>
                    a +
                    dataOrder.entities[b].price *
                      dataOrder.entities[b].quantity,
                  0,
                ) * 1.05}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          paddingTop: HeightSize(29),
          paddingHorizontal: WidthSize(24),
        }}>
        <PrimaryButton
          style={{
            marginTop: HeightSize(8),
            height: HeightSize(68),
            backgroundColor: '#836E44',
            borderRadius: 20,
            marginBottom: HeightSize(32),
          }}
          title="Place Order"
          handlePress={async () => {
            let params: OrderParams = {
              contact_id: Number(choosedAddress.id),
              items: dataOrder.ids,
            };
            await orderService.makeOrder(params).then(res => {
              if (res.status != 400) {
                dispatch(
                  AddPopupMessage({
                    title: 'Success!',
                    type: 'success',
                    message: 'Order success!',
                    size: 'small',
                    time: 'long',
                  }),
                );
              } else {
                dispatch(
                  AddPopupMessage({
                    title: 'Error!',
                    type: 'warning',
                    message: 'Order failed!',
                    size: 'small',
                    time: 'long',
                  }),
                );
              }
              dispatch(SetDirectionBottomBar('up'));
              rootNavigation.navigate('Home');
            });
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetBoardRef}
        index={-1}
        snapPoints={snapPointsBoard}
        enablePanDownToClose={true}
        onClose={() => {}}
        handleIndicatorStyle={{backgroundColor: '#3B3021'}}
        handleStyle={{
          backgroundColor: '#F0EFE9',
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={true}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.7}>
            <Pressable style={{flex: 1}} />
          </BottomSheetBackdrop>
        )}
        style={{
          backgroundColor: '#F0EFE9',
          borderColor: '#000',
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}>
        <View
          style={{
            marginHorizontal: WidthSize(16),
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.Base,
              color: '#3B3021',
              marginTop: HeightSize(16),
            }}>
            Choose address
          </Text>
          <ScrollView>
            {allUserContact.map(item => {
              return (
                <Pressable
                  onPress={() => {
                    setChoosedAddress(item);
                    handleCloseBoardPress();
                  }}
                  style={{
                    marginTop: HeightSize(12),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: WidthSize(32),
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
                          color: '#3B3021',
                        }}>
                        {userInfo.fullname} | {item?.phone}
                      </Text>
                      <Text
                        style={{
                          ...TextFont.SMedium,
                          ...TextStyle.Base,
                          color: '#836E44',
                        }}>
                        {item.address.details || ''},{' '}
                        {
                          normalizedAddressTree?.entities[item.address.province]
                            ?.districts.entities[item?.address?.district]?.wards
                            .entities[item?.address?.ward]?.name
                        }
                        ,{' '}
                        {
                          normalizedAddressTree?.entities[
                            item?.address?.province
                          ]?.districts.entities[item?.address?.district]?.name
                        }
                        ,{' '}
                        {
                          normalizedAddressTree?.entities[
                            item?.address?.province
                          ]?.name
                        }
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </BottomSheet>
    </ContainerImage>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
