import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootCategory} from '~/types/category';
import axios from 'axios';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {HeightSize, WidthSize, width} from '~/theme/size';
import CategoryItem from './components/category';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoadingUpdateCategory} from '~/redux/reducers/categorySlice';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '~/components/global/iconSvg';
import FullWidthImage from '~/components/global/fullWidthImage';
import PrimaryButton from '~/components/global/primaryButton';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {addNewCategory, updateCategory} from '~/redux/actions/categoryAction';
import {AppDispatch} from '~/app/store';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const [categories, setCategories] = useState<Array<RootCategory>>();
  const loading = useSelector(selectLoadingUpdateCategory);
  useEffect(() => {
    if (loading === 'idle' || loading === 'fulfilled') {
      console.log(
        'Post: https://e-catalogue.abcdavid.top/product/category/all',
      );
      axios
        .get('https://e-catalogue.abcdavid.top/product/category/all')
        .then(res => {
          setCategories(res.data);
        });
    }
  }, [loading]);

  const [isShowModalAddNew, setIsShowModalAddNew] = React.useState(false);
  const [imgNew, setImgNew] = React.useState<any>(null);
  const [nameNew, setNameNew] = React.useState('');
  const [descriptionNew, setDescriptionNew] = React.useState('');
  const [parantNew, setParantNew] = React.useState<RootCategory[]>([]);
  const [disPlay, setDisPlay] = React.useState<RootCategory>();
  const dispatch = useDispatch<AppDispatch>();
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else if (response.assets) {
        console.log(response.assets[0].uri);
        setImgNew(response);
      } else {
        console.log('error');
      }
    });
  };
  const navigation = useNavigation<any>();
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          width: '100%',
          height: HeightSize(56),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}
          style={{
            position: 'absolute',
            left: WidthSize(16),
          }}>
          <IconSvg
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{
              marginLeft: WidthSize(16),
            }}
            icon="IconMenuBrown"
          />
        </Pressable>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.text4XL,
          }}>
          Categories
        </Text>
        <Pressable
          onPress={() => {
            setIsShowModalAddNew(true);
          }}
          style={{
            position: 'absolute',
            right: WidthSize(16),
          }}>
          <IconSvg
            onPress={() => {
              setIsShowModalAddNew(true);
            }}
            icon="IconAddCircleBrown"
            width={WidthSize(24)}
            height={WidthSize(24)}
          />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            gap: HeightSize(16),
            marginTop: HeightSize(32),
            paddingHorizontal: WidthSize(16),
          }}>
          {categories?.map((category, index) => {
            return <CategoryItem category={category} key={index} level={0} />;
          })}
        </View>
      </ScrollView>

      <Modal
        visible={isShowModalAddNew}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setIsShowModalAddNew(false)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: HeightSize(32),
            }}>
            <Text
              style={{
                ...TextFont.GRegular,
                ...TextStyle.text4XL,
                color: '#3B3021',
                textAlign: 'center',
              }}>
              Add new category
            </Text>
            <View
              style={{
                marginTop: HeightSize(32),
                flexDirection: 'row',
                gap: HeightSize(32),
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}>
                  Name
                </Text>
                <TextInput
                  value={nameNew}
                  onChangeText={setNameNew}
                  style={{
                    ...TextFont.SRegular,
                    color: '#3B3021',
                    backgroundColor: '#F0EFE9',
                    borderRadius: 10,
                    paddingHorizontal: HeightSize(16),
                    paddingVertical: HeightSize(16),
                    marginTop: HeightSize(16),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                {imgNew ? (
                  <FullWidthImage
                    widthNeed={width / 2 - HeightSize(48)}
                    style={{
                      marginBottom: HeightSize(16),
                    }}
                    imageStyle={{
                      borderRadius: 20,
                    }}
                    source={{uri: imgNew.assets[0].uri}}>
                    <View
                      style={{
                        position: 'absolute',
                        top: HeightSize(8),
                        right: HeightSize(8),
                        backgroundColor: 'red',
                        borderRadius: 100,
                        padding: HeightSize(4),
                      }}>
                      <IconSvg
                        onPress={() => setImgNew('')}
                        icon="IconCloseBoldWhite"
                        width={HeightSize(16)}
                        height={HeightSize(16)}
                      />
                    </View>
                  </FullWidthImage>
                ) : (
                  <IconSvg
                    onPress={openImagePicker}
                    style={{
                      alignSelf: 'flex-end',
                    }}
                    icon="IconGalleryAddBrown"
                    width={WidthSize(30)}
                    height={WidthSize(30)}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(32),
              }}>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Parent
              </Text>
              <View
                style={{
                  marginTop: HeightSize(16),
                  flexDirection: 'row',
                  gap: HeightSize(16),
                  alignItems: 'center',
                  height: HeightSize(60),
                }}>
                <Dropdown
                  style={{
                    flex: 1,
                    height: HeightSize(60),
                    padding: HeightSize(16),
                    backgroundColor: 'white',
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                  placeholderStyle={{
                    ...TextFont.SRegular,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}
                  selectedTextStyle={{
                    ...TextFont.SRegular,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}
                  inputSearchStyle={{
                    ...TextFont.SRegular,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}
                  itemTextStyle={{
                    ...TextFont.SRegular,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}
                  containerStyle={{
                    marginTop: HeightSize(8),
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                  data={categories as RootCategory[]}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="id"
                  placeholder="Select a parent (default is Root)"
                  searchPlaceholder="Search..."
                  value={parantNew[0] ? parantNew[0].id : undefined}
                  onChange={item => {
                    setDisPlay(item);
                    const newItem = [...parantNew];
                    newItem.push(item);
                    setParantNew(newItem);
                  }}
                />
                <Pressable
                  onPress={() => {
                    setDisPlay(undefined);
                    setParantNew([]);
                  }}
                  style={{
                    width: HeightSize(40),
                    height: HeightSize(40),
                    backgroundColor: 'red',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconSvg icon="IconTrashWhite" />
                </Pressable>
              </View>
              {disPlay ? (
                <View
                  style={{
                    marginTop: HeightSize(16),
                    flexDirection: 'row',
                    gap: HeightSize(16),
                    alignItems: 'center',
                    height: HeightSize(60),
                  }}>
                  <Dropdown
                    style={{
                      flex: 1,
                      height: HeightSize(60),
                      padding: HeightSize(16),
                      backgroundColor: 'white',
                      borderRadius: 12,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                    placeholderStyle={{
                      ...TextFont.SRegular,
                      ...TextStyle.Base,
                      color: '#3B3021',
                    }}
                    selectedTextStyle={{
                      ...TextFont.SRegular,
                      ...TextStyle.Base,
                      color: '#3B3021',
                    }}
                    inputSearchStyle={{
                      ...TextFont.SRegular,
                      ...TextStyle.Base,
                      color: '#3B3021',
                    }}
                    itemTextStyle={{
                      ...TextFont.SRegular,
                      ...TextStyle.Base,
                      color: '#3B3021',
                    }}
                    containerStyle={{
                      marginTop: HeightSize(8),
                      backgroundColor: 'white',
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}
                    data={disPlay.children as RootCategory[]}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select a parent (default is Root)"
                    searchPlaceholder="Search..."
                    onChange={item => {
                      const newItem = [...parantNew];
                      newItem.push(item);
                      setParantNew(newItem);
                    }}
                  />
                  <Pressable
                    onPress={() => {
                      setDisPlay(undefined);
                      if (disPlay.id !== parantNew[parantNew.length - 1].id) {
                        const newItem = [...parantNew];
                        newItem.pop();
                        setParantNew(newItem);
                      }
                    }}
                    style={{
                      width: HeightSize(40),
                      height: HeightSize(40),
                      backgroundColor: 'red',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <IconSvg icon="IconTrashWhite" />
                  </Pressable>
                </View>
              ) : null}
            </View>
            <View
              style={{
                marginTop: HeightSize(32),
              }}>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Description
              </Text>
              <TextInput
                multiline
                lineBreakStrategyIOS="hangul-word"
                value={descriptionNew}
                onChangeText={setDescriptionNew}
                style={{
                  ...TextFont.SRegular,
                  color: '#3B3021',
                  backgroundColor: '#F0EFE9',
                  borderRadius: 10,
                  padding: HeightSize(16),
                  marginTop: HeightSize(16),
                  height: HeightSize(200),
                }}
              />
            </View>

            <PrimaryButton
              style={{
                marginTop: HeightSize(32),
              }}
              handlePress={async () => {
                let param = {
                  name: nameNew,
                  description: descriptionNew,
                  parent:
                    parantNew.length > 0
                      ? parantNew[parantNew.length - 1].id
                      : undefined,
                  image: imgNew,
                };
                let formData = new FormData();
                formData.append('name', param.name);
                formData.append('description', param.description);
                if (param.parent) {
                  formData.append('parent', param.parent);
                }
                if (param.image) {
                  formData.append('image', {
                    name: param.image.assets[0].fileName,
                    type: param.image.assets[0].type,
                    uri: param.image.assets[0].uri,
                  });
                }
                dispatch(addNewCategory(formData));
                setIsShowModalAddNew(false);
                setNameNew('');
                setDescriptionNew('');
                setImgNew(null);
                setDisPlay(undefined);
                setParantNew([]);
              }}
              title="Add new category"
            />
          </Pressable>
        </ScrollView>
      </Modal>
    </ContainerImage>
  );
};

export default Category;
