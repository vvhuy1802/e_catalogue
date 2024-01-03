import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrderStackParamList} from '~/types';
import {useNavigation} from '@react-navigation/native';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {Contact, ContactAddress} from '~/types/contact';
import {contactService} from '~/services/service/contact.service';
import {IconSvg} from '~/components/global/iconSvg';
import {OrderStackContext} from '~/utils/context';
import {AppProvider} from '~/app/appProvider';

const EditAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<OrderStackParamList, 'EditAddress'>>();

  const [local, setLocal] = React.useState<ContactAddress>();
  const {localAddress, dataAddress, setDataAddress, dataContact} =
    useContext(OrderStackContext);
  useEffect(() => {
    const getLocalAddress = async () => {
      const currentAddress = await AppProvider.getCurrentContact();
      if (currentAddress) {
        setLocal(currentAddress.address);
      }
    };
    getLocalAddress();
  }, []);

  return (
    <ContainerImage
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        onPressBack={() => navigation.goBack()}
        title=""
        showBag={false}
        children={
          <Text
            style={{
              ...TextStyle.text3XL,
              ...TextFont.GRegular,
            }}>
            Edit Address
          </Text>
        }
      />

      <View
        style={{
          gap: HeightSize(16),
          marginTop: HeightSize(32),
        }}>
        {dataContact.map((item, index) => (
          <Pressable
            onPress={() => {
              setDataAddress(item);
              navigation.goBack();
            }}
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: WidthSize(16),
              borderRadius: 12,
              backgroundColor: '#EFEFE8',
              paddingHorizontal: WidthSize(16),
            }}>
            {dataAddress.address.id === item.address.id ? (
              <IconSvg
                onPress={() => {
                  navigation.goBack();
                }}
                icon="IconCheckBoxCheckedWhite"
              />
            ) : (
              <IconSvg
                onPress={() => {
                  setDataAddress(item);
                  navigation.goBack();
                }}
                icon="IconCheckBoxUnCheckWhite"
              />
            )}
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
                  {item.fullname ? item.fullname : 'Vũ Viết Huy'} | {item.phone}
                </Text>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.Base,
                    color: '#836E44',
                  }}>
                  {item.address.details},{' '}
                  {
                    localAddress?.entities[item.address.province].districts
                      .entities[item.address.district].wards.entities[
                      item.address.ward
                    ].name
                  }
                  ,{' '}
                  {
                    localAddress?.entities[item.address.province].districts
                      .entities[item.address.district].name
                  }
                  , {localAddress?.entities[item.address.province].name}
                </Text>
              </View>

              {local?.id === item.address.id && (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: WidthSize(70),
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: HeightSize(8),
                  }}>
                  <Text
                    style={{
                      ...TextFont.SMedium,
                      ...TextStyle.Base,
                      color: '#fff',
                      paddingVertical: HeightSize(8),
                    }}>
                    Default
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          paddingHorizontal: WidthSize(16),
          position: 'absolute',
          bottom: HeightSize(16),
          width: width,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddAddress')}
          style={{
            width: '100%',
            backgroundColor: 'red',
            paddingVertical: HeightSize(16),
            borderRadius: 12,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.Base,
              color: '#fff',
            }}>
            Add new address
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerImage>
  );
};

export default EditAddress;

const styles = StyleSheet.create({});
