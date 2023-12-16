import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectOrder, setDataOrder} from '~/redux/reducers/orderSlice';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryButton from '~/components/global/primaryButton';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {Normalized, OrderStackParamList} from '~/types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const ConfirmOrder = () => {
  const selectDataOrder = useSelector(selectOrder);
  const navigation = useNavigation<StackNavigationProp<OrderStackParamList>>();
  const onGoBack = () => {
    navigation.goBack();
  };
  const [paymentMethod, setPaymentMethod] = React.useState<'COD' | 'Momo'>(
    'COD',
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
              navigation.navigate('EditAddress');
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
            <Text
              style={{
                ...TextFont.SMedium,
                ...TextStyle.XL,
                color: '#3B3021',
              }}>
              Shipping Address
            </Text>
            <Text
              style={{
                ...TextFont.SMedium,
                ...TextStyle.Base,
                color: '#836E44',
              }}>
              Vũ Viết Huy | 0987134912
            </Text>
            <Text
              style={{
                ...TextFont.SMedium,
                ...TextStyle.Base,
                color: '#836E44',
              }}>
              90m, Hoang Quoc Viet Street, Phu My Residence, Phu My Ward, 7
              Dist, Ho Chi Minh City
            </Text>
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
            {`Order item${selectDataOrder.ids.length > 1 ? 's' : ''}`}
          </Text>
          <Text
            style={{
              ...TextFont.SRegular,
              ...TextStyle.Base,
              color: '#CCCBD3',
            }}>{`${selectDataOrder.ids.length} item${
            selectDataOrder.ids.length > 1 ? 's' : ''
          }`}</Text>
        </View>
        <View
          style={{
            marginTop: HeightSize(12),
            height: WidthSize(250),
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: WidthSize(16),
              paddingHorizontal: WidthSize(32),
            }}>
            {selectDataOrder.ids.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: WidthSize(168),
                    height: WidthSize(250),
                    borderRadius: 16,
                    backgroundColor: '#F1EFE9',
                  }}>
                  <Image
                    source={images.home.ImagePopular}
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
                      style={{
                        ...TextFont.SMedium,
                        ...TextStyle.Base,
                        color: '#3B3021',
                      }}>
                      {selectDataOrder.entities[item].name}
                    </Text>
                    <Text
                      style={{
                        ...TextFont.SMedium,
                        ...TextStyle.SM,
                        color: '#CCCBD3',
                      }}>
                      {`${selectDataOrder.entities[item].size} - ${selectDataOrder.entities[item].color}`}
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
                        ${selectDataOrder.entities[item].price}
                      </Text>
                      <Text
                        style={{
                          ...TextFont.SMedium,
                          ...TextStyle.SM,
                          color: '#CCCBD3',
                        }}>
                        x{selectDataOrder.entities[item].quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{marginTop: HeightSize(32), paddingHorizontal: WidthSize(32)}}>
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
              }}>
              <Text
                style={{
                  ...TextFont.GRegular,
                  ...TextStyle.SM,
                  color: '#3B3021',
                }}>
                Promo/Student code or vouchers
              </Text>
              <IconSvg
                icon="IconAngleRightBrown"
                width={HeightSize(12)}
                height={HeightSize(12)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: HeightSize(20),
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
                $0
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
                $0
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
                $0
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
          handlePress={async () => {}}
        />
      </View>
    </ContainerImage>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
