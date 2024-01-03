import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '~/types';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import AddressBottomSheetContent from './components/AddressBottomSheetContent';
import {
  selectAddressTree,
  selectAllUserContact,
  selectNormalizedAddressTree,
} from '~/redux/reducers/contactSlice';
import {contactService} from '~/services/service/contact.service';
import {ContactAPIParams} from '~/types/contact';
import {IconSvg} from '~/components/global/iconSvg';
import {selectUserInfo} from '~/redux/reducers/userInfo';
import {AddPopupMessage} from '~/redux/reducers/popupMessageSlice';
import {getAllUserContact} from '~/redux/actions/contact';

type AddressBookProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'AddressBook'>;
};

const AddressBook: React.FC<AddressBookProps> = ({navigation}) => {
  const bottomSheetAddressRef = useRef<BottomSheet>(null);
  const snapPointsAddress = useMemo(() => ['80%'], []);
  const handleAddressSnapPress = useCallback((index: number) => {
    bottomSheetAddressRef.current?.snapToIndex(index);
    if (index == 0) {
    }
  }, []);
  const handleCloseAddressPress = useCallback(() => {
    bottomSheetAddressRef.current?.close();
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(SetDirectionBottomBar('down'));
  }, []);

  type addressItemType = {
    ID: number;
    IsTemporary: boolean;
    IsDeleted: boolean;
    City: string;
    District: string;
    Ward: string;
    DetailAddress: string;
  };

  // useEffect(() => {
  //   const personalInfo = Store.getState().personalInfo;
  //   console.log('Personal Info: ' + JSON.stringify(personalInfo));
  //   if (personalInfo) {

  //     const temp: Array<{
  //       ID: number;
  //       IsTemporary: boolean;
  //       IsDeleted: boolean;
  //       City: number;
  //       District: number;
  //       Ward: number;
  //       DetailAddress: string;
  //     }> = [];
  //     for (let index in personalInfo.Addresses) {
  //       // console.log('Adding address: ' + index + ' to address list');
  //       const address = personalInfo.Addresses[parseInt(index)];
  //       temp[parseInt(index)] = {
  //         ID: address.ID,
  //         IsTemporary: false,
  //         IsDeleted: false,
  //         City: address.ID_City,
  //         District: address.ID_District,
  //         Ward: address.ID_Ward,
  //         DetailAddress: address.Detail_address,
  //       };
  //     }
  //     // console.log('Temp: ' + JSON.stringify(temp));
  //     setAddressList(Object.values(temp));
  //   }
  // }, []);
  const getNewAddressID = () => {
    if (addressList.length == 0) {
      return 1;
    }
    // Find max ID
    let maxID = 0;
    for (let index in addressList) {
      const address = addressList[index];
      if (address.ID > maxID) {
        maxID = address.ID;
      }
    }
    return maxID + 1;
  };
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<addressItemType[]>([]);
  const [currentAddress, setCurrentAddress] = useState<any>();
  const OnAddressEditFinish = (address: any) => {
    // console.log('Edit address finish ' + JSON.stringify(address));
    const newAddressList = Array.from(addressList);
    const oldAddressIndex = newAddressList.findIndex(a => a.ID === address.ID);
    if (oldAddressIndex === -1) {
      newAddressList.push(address);
    } else {
      newAddressList[oldAddressIndex] = address;
    }
    setAddressList(newAddressList);
    if (!isEdited) setIsEdited(true);
  };

  const OnAddNewAddess = () => {
    // console.log('Add new address');
    let newAddress = {
      ID: getNewAddressID(),
      IsTemporary: true,
      IsDeleted: false,
      City: 0,
      District: undefined,
      Ward: undefined,
      DetailAddress: '',
    };
    setCurrentAddress(newAddress);
    // changeBottomSheetVisibility(true);
    handleAddressSnapPress(0);
  };

  const OnAddressEdit = (ID: number) => {
    // console.log('Edit address ' + ID);
    setCurrentAddress(addressList.find(address => address.ID === ID));
    // changeBottomSheetVisibility(true);
    handleAddressSnapPress(0);
  };

  const addressTree = useSelector(selectAddressTree);
  const normalizedAddressTree = useSelector(selectNormalizedAddressTree);
  const allUserContact = useSelector(selectAllUserContact);
  const userInfo = useSelector(selectUserInfo);
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <HeaderProduct
          onPressBack={() => navigation.goBack()}
          title=""
          showBag={false}
          children={
            <Text
              style={{
                ...TextStyle.text3XL,
                ...TextFont.GRegular,
                marginTop: HeightSize(12),
              }}>
              Address Book
            </Text>
          }
        />
        {allUserContact.map(item => {
          return (
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
                      normalizedAddressTree?.entities[item?.address?.province]
                        ?.districts.entities[item?.address?.district]?.name
                    }
                    ,{' '}
                    {
                      normalizedAddressTree?.entities[item?.address?.province]
                        ?.name
                    }
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        <Pressable
          style={{alignSelf: 'center', marginTop: 60}}
          onPress={() => {
            handleAddressSnapPress(0);
          }}>
          <Text>Add address</Text>
        </Pressable>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetAddressRef}
        index={-1}
        snapPoints={snapPointsAddress}
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
            <Pressable
              style={{flex: 1}}
              // onPress={Keyboard.dismiss}
            />
          </BottomSheetBackdrop>
        )}
        style={{
          backgroundColor: '#F0EFE9',
          borderColor: '#000',
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}>
        <AddressBottomSheetContent
          data={addressTree}
          locationNameConverter={{
            Ward: (city, district, ward) => {
              if (ward === '') return '';
              return normalizedAddressTree.entities[city].districts.entities[
                district
              ].wards.entities[ward].name;
            },
            District: (city, district) => {
              if (district === '') return '';
              return normalizedAddressTree.entities[city].districts.entities[
                district
              ].name;
            },
            City: city => {
              if (city === '') return '';
              return normalizedAddressTree.entities[city].name;
            },
          }}
          onCloseBottomSheet={() => {
            // changeBottomSheetVisibility(false)
            handleCloseAddressPress();
          }}
          onSetAddress={async (params: ContactAPIParams) => {
            await contactService.setFullContact(params);
            dispatch(getAllUserContact());
            handleCloseAddressPress();
            dispatch(
              AddPopupMessage({
                title: 'Success',
                type: 'success',
                message: 'Add new contact successfully!',
                size: 'small',
                time: 'long',
              }),
            );
          }}
          initialAddress={currentAddress}
        />
      </BottomSheet>
    </ContainerImage>
  );
};

export default AddressBook;
