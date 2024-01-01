import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {setDemoImage} from '~/redux/reducers/globalSlice';
import {height, HeightSize, width, WidthSize} from '~/theme/size';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import ContainerView from '~/components/global/containerView';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StyleRoomStackParamList} from '~/types';
import {IconSvg} from '~/components/global/iconSvg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {selectStoreInfo} from '~/redux/reducers/productSlice';
import {Dropdown} from 'react-native-element-dropdown';
import {ProductById, StoreProduct, Variant} from '~/types/product';
import axios from 'axios';
import {getUrl} from '~/utils';
import {styleService} from '~/services/service/style.service';
import {getStyleByStore} from '~/redux/actions/categoryAction';
type Retangle = {
  id: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  product?: StoreProduct;
  variant?: Variant;
};

type actualImageProps = {
  image: ImagePickerResponse | undefined;
  width: number;
  height: number;
  retangles: Array<Retangle>;
};

type EditStyleRoomProps = {
  route: RouteProp<StyleRoomStackParamList, 'EditStyleRoomScreenAdminStore'>;
};
const EditStyleRoom = ({route}: EditStyleRoomProps) => {
  const navigation =
    useNavigation<StackNavigationProp<StyleRoomStackParamList>>();
  const storeInfo = useSelector(selectStoreInfo);
  const size = route.params.size;
  const [currentProduct, setCurrentProduct] = useState<StoreProduct>();
  const [currentVariant, setCurrentVariant] = useState<ProductById>();
  const [name, setName] = useState(route.params.name);
  useEffect(() => {
    if (currentProduct?.id) {
      axios
        .get(`https://e-catalogue.abcdavid.top/product?id=${currentProduct.id}`)
        .then(res => {
          console.log(JSON.stringify(res.data, null, 2));
          setCurrentVariant(res.data);
        });
    }
  }, [currentProduct]);

  const [modalVisible, setModalVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>();
  const tabs = [
    {
      id: '1',
      title: 'Popular',
    },
    {
      id: '2',
      title: 'Minimal',
    },
    {
      id: '3',
      title: 'Business',
    },
    {
      id: '4',
      title: 'Street',
    },
    {
      id: '5',
      title: 'Performance',
    },
    {
      id: '6',
      title: 'Unique',
    },
    {
      id: '7',
      title: 'Lovely',
    },
    {
      id: '8',
      title: 'Easy Casual',
    },
    {
      id: '9',
      title: 'American',
    },
    {
      id: '10',
      title: 'City Boy',
    },
    {
      id: '11',
      title: 'Sporty',
    },
    {
      id: '12',
      title: 'Retro',
    },
    {
      id: '13',
      title: 'Modern',
    },
  ];
  const [category, setCategory] = useState<{id: string; title: string}>(
    tabs[0],
  );
  const dispatch = useDispatch<AppDispatch>();

  const [retangles, setRetangles] = useState<Array<Retangle>>(
    route.params.rectangles,
  );

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const insets = useSafeAreaInsets();
  const [isDraw, setIsDraw] = useState(false);
  const [listImageMore, setListImageMore] = useState<Array<Asset>>([]);
  const [listImage, setListImage] = useState<
    {
      id: number;
      image: string;
      isFromEdit?: boolean;
    }[]
  >(route.params.listImage);
  const [listImageDeletee, setListImageDelete] = useState<Array<string>>([]);
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 0,
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
        response.assets.map(item => {
          setListImageMore(listImageMore => [...listImageMore, item]);
        });
      } else {
        console.log('error');
      }
    });
  };

  const renderTriangle = (top: number, left: number, rotate: string) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: top,
          left: left,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#ffffffB3',
          transform: [{rotate: rotate}],
        }}
      />
    );
  };

  const renderInfoBox = (retangle: {
    id: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    variant?: Variant;
    product?: StoreProduct;
  }) => {
    let left = 0;
    let top = 0;
    let topTriangle = 0;
    let leftTriangle = 0;
    let rotate = '0deg';
    if (retangle.minX > size.width / 2) {
      if (retangle.maxX - size.width / 2 > WidthSize(115)) {
        left = WidthSize(-110);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(95);
        rotate = '90deg';
      } else {
        left = WidthSize(15);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = -WidthSize(15);
        rotate = '-90deg';
      }
    } else {
      if (WidthSize(115) - retangle.maxX > 0) {
        left = WidthSize(5);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(-15);
        rotate = '-90deg';
      } else {
        left = WidthSize(-WidthSize(100) - 15);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(100) - 5;
        rotate = '90deg';
      }
    }

    return retangle.variant ? (
      <View
        style={{
          backgroundColor: '#ffffffB3',
          position: 'absolute',
          width: WidthSize(100),
          height: HeightSize(60) + WidthSize(20),
          left: left,
          top: top,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            //remove retangle by id
            const index = retangles.findIndex(item => item.id === retangle.id);
            setRetangles(retangles =>
              retangles.filter((item, i) => i !== index),
            );
          }}
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: HeightSize(4),
            right: HeightSize(4),
            backgroundColor: 'red',
            borderRadius: 10,
          }}>
          <IconSvg
            icon="IconCloseBoldWhite"
            width={HeightSize(16)}
            height={HeightSize(16)}
          />
        </Pressable>
        {renderTriangle(topTriangle, leftTriangle, rotate)}
        <View
          style={{
            padding: WidthSize(10),
            borderRadius: 8,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            {retangle.product?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Price: ${retangle.variant?.price}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Size: {retangle.variant?.size}
          </Text>
        </View>
      </View>
    ) : null;
  };

  const handlePressImage = (e: any) => {
    const {locationX, locationY} = e.nativeEvent;
    setRetangles(retangles => [
      ...retangles,
      {
        id: Math.random(),
        minX: locationX,
        minY: locationY,
        maxX: locationX,
        maxY: locationY,
      },
    ]);
    setModalVisible(true);
  };

  const [modalPost, setModalPost] = useState(false);

  return (
    <ContainerView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: width,
        height: height,
      }}>
      {isDraw ? (
        <>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: width,
              top: 0,
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(16) + insets.top,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {retangles.length > 0 ? (
              <Text
                onPress={() => {
                  setRetangles(retangles =>
                    retangles.slice(0, retangles.length - 1),
                  );
                }}
                suppressHighlighting={true}
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.LG,
                  color: 'white',
                }}>
                Undo
              </Text>
            ) : (
              <View />
            )}
            <Text
              onPress={() => {
                setIsDraw(!isDraw);
              }}
              suppressHighlighting={true}
              style={{
                ...TextFont.SBold,
                ...TextStyle.LG,
                color: 'white',
              }}>
              Done
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: width,
              bottom: HeightSize(16),
              paddingHorizontal: WidthSize(16),
              paddingBottom: HeightSize(16) + insets.top,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: WidthSize(70),
                height: WidthSize(70),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                onPress={openImagePicker}
                style={{
                  width: WidthSize(50),
                  height: WidthSize(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <IconSvg
                  icon="IconGalleryAddWhite"
                  width={WidthSize(30)}
                  height={WidthSize(30)}
                />
              </Pressable>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={listImage.concat(
                listImageMore.map(item => {
                  return {
                    id: Math.random(),
                    image: item.uri as string,
                    isFromEdit: false,
                  };
                }),
              )}
              horizontal={true}
              style={{
                marginLeft: WidthSize(16),
              }}
              contentContainerStyle={{
                gap: WidthSize(16),
              }}
              renderItem={({item, index}) => {
                return (
                  <ImageBackground
                    key={item.image}
                    style={{
                      width: WidthSize(70),
                      height: WidthSize(70),
                      position: 'relative',
                      zIndex: 0,
                    }}
                    imageStyle={{
                      borderRadius: 10,
                    }}
                    source={
                      item.isFromEdit ? getUrl(item.image) : {uri: item.image}
                    }>
                    <IconSvg
                      onPress={() => {
                        if (item.isFromEdit) {
                          setListImageDelete(listImageDeletee => [
                            ...listImageDeletee,
                            item.image,
                          ]);
                          const newList = listImage.filter(
                            (item, i) => i !== index,
                          );
                          setListImage(newList);
                        } else {
                          const newList = listImageMore.filter(
                            (items, i) => items.uri !== item.image,
                          );
                          setListImageMore(newList);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: WidthSize(4),
                        right: WidthSize(4),
                        zIndex: 2,
                        backgroundColor: '#EF6556',
                        borderRadius: 10,
                      }}
                      icon="IconCloseBoldWhite"
                      width={HeightSize(20)}
                      height={HeightSize(20)}
                    />
                  </ImageBackground>
                );
              }}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: width,
            height: height,
            paddingHorizontal: WidthSize(16),
            paddingVertical: HeightSize(16) + insets.top,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <IconSvg
              onPress={() => {
                navigation.goBack();
              }}
              icon="IconArrowLeftWhite"
            />
            <IconSvg
              onPress={() => {
                setIsDraw(!isDraw);
              }}
              icon="IconDrawWhite"
            />
          </View>
          <Pressable
            onPress={() => {
              setModalPost(true);
            }}
            style={{
              position: 'absolute',
              bottom: WidthSize(16),
              right: WidthSize(16),
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(8),
              backgroundColor: '#836E44',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextFont.SRegular,
                ...TextStyle.LG,
                color: 'white',
              }}>
              Post now
            </Text>
            <IconSvg
              style={{
                marginLeft: WidthSize(8),
              }}
              icon="IconSendWhite"
            />
          </Pressable>
        </View>
      )}
      <Pressable
        onPress={handlePressImage}
        style={{
          width: width,
          height: size.height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {retangles.map(
          (retangle: {
            id: number;
            minX: any;
            minY: any;
            maxX: any;
            maxY: any;
            info?: any;
          }) => (
            <Pressable
              key={retangle.id}
              style={{
                position: 'absolute',
                zIndex: 1,
                width: WidthSize(retangle.maxX - retangle.minX),
                height: WidthSize(retangle.maxY - retangle.minY),
                left: WidthSize(retangle.minX),
                top: WidthSize(retangle.minY),
              }}>
              {renderInfoBox(retangle)}
            </Pressable>
          ),
        )}

        <ImageBackground
          style={{
            width: size.width,
            height: size.height,
          }}
          resizeMode="contain"
          source={getUrl(route.params.mainImage)}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setRetangles(retangles => retangles.slice(0, retangles.length - 1));
          setModalVisible(false);
          setVariant(undefined);
          setCurrentProduct(undefined);
          setCurrentVariant(undefined);
        }}>
        <Pressable
          onPress={() => {
            setRetangles(retangles => retangles.slice(0, retangles.length - 1));
            setModalVisible(false);
            setVariant(undefined);
            setCurrentProduct(undefined);
            setCurrentVariant(undefined);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0000008d',
          }}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              width: '80%',
              height: '50%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: HeightSize(16),
            }}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                Add Variant
              </Text>
              <Dropdown
                style={{
                  marginTop: HeightSize(16),
                  height: HeightSize(60),
                  width: '100%',
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
                data={storeInfo.products}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder="Select a product"
                searchPlaceholder="Search..."
                onChange={item => {
                  setCurrentProduct(item);
                }}
              />
              {currentVariant ? (
                <Dropdown
                  style={{
                    marginTop: HeightSize(16),
                    height: HeightSize(60),
                    width: '100%',
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
                  data={currentVariant.variants}
                  search
                  maxHeight={300}
                  labelField="size"
                  valueField="id"
                  placeholder="Select a variant"
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setVariant(item);
                  }}
                />
              ) : null}

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  position: 'absolute',
                  bottom: 20,
                }}>
                <Pressable
                  onPress={() => {
                    const index = retangles.length - 1;
                    retangles[index].variant = variant;
                    retangles[index].product = currentProduct;
                    setModalVisible(false);
                    setVariant(undefined);
                    setCurrentProduct(undefined);
                    setCurrentVariant(undefined);
                  }}
                  style={{
                    width: '40%',
                    height: 50,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Save</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setRetangles(retangles =>
                      retangles.slice(0, retangles.length - 1),
                    );
                    setModalVisible(false);
                    setVariant(undefined);
                    setCurrentProduct(undefined);
                    setCurrentVariant(undefined);
                  }}
                  style={{
                    width: '40%',
                    height: 50,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={modalPost}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => {
          setModalPost(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: HeightSize(16),
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: HeightSize(100),
            }}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.Title,
                color: '#3B3021',
                textAlign: 'center',
              }}>
              Review your post
            </Text>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    ...TextFont.SBold,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Main image
                </Text>
                <Text
                  style={{
                    flex: 1,
                    ...TextFont.SBold,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Name
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: HeightSize(16),
                }}>
                <Image
                  style={{
                    width: WidthSize(164),
                    height: WidthSize(164),
                    borderRadius: 10,
                  }}
                  source={getUrl(route.params.mainImage)}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: WidthSize(16),
                  }}>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    multiline={true}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#836E44',
                      padding: HeightSize(16),
                      ...TextFont.SBold,
                      ...TextStyle.Base,
                      color: '#3B3021',
                      maxHeight: HeightSize(164),
                    }}
                    placeholder="Name your style room"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                Variants ({retangles.length})
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: HeightSize(8),
                }}
                style={{
                  marginTop: HeightSize(16),
                }}
                horizontal={true}
                data={retangles}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={item.maxX}
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{
                          width: WidthSize(50),
                          height: WidthSize(50),
                          borderRadius: 10,
                        }}
                        source={getUrl(item.variant?.image)}
                      />
                      <View
                        style={{
                          marginLeft: WidthSize(8),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            ...TextFont.SBold,
                            ...TextStyle.SM,
                            color: '#3B3021',
                            width: width - WidthSize(300),
                          }}>
                          {item.product?.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            ...TextFont.SBold,
                            ...TextStyle.SM,
                            color: '#3B3021',
                            width: width - WidthSize(300),
                          }}>
                          Price: ${item.variant?.price}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            ...TextFont.SBold,
                            ...TextStyle.SM,
                            color: '#3B3021',
                            width: width - WidthSize(300),
                          }}>
                          Size: {item.variant?.size}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                More images
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: WidthSize(70),
                    height: WidthSize(70),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#836E44',
                    borderRadius: 10,
                  }}>
                  <Pressable
                    onPress={openImagePicker}
                    style={{
                      width: WidthSize(50),
                      height: WidthSize(50),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    <IconSvg
                      icon="IconGalleryAddWhite"
                      width={WidthSize(30)}
                      height={WidthSize(30)}
                    />
                  </Pressable>
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={listImage.concat(
                    listImageMore.map(item => {
                      return {
                        id: Math.random(),
                        image: item.uri as string,
                        isFromEdit: false,
                      };
                    }),
                  )}
                  horizontal={true}
                  style={{
                    marginLeft: WidthSize(16),
                  }}
                  contentContainerStyle={{
                    gap: WidthSize(16),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <ImageBackground
                        key={item.image}
                        style={{
                          width: WidthSize(70),
                          height: WidthSize(70),
                          position: 'relative',
                          zIndex: 0,
                        }}
                        imageStyle={{
                          borderRadius: 10,
                        }}
                        source={
                          item.isFromEdit
                            ? getUrl(item.image)
                            : {uri: item.image}
                        }>
                        <IconSvg
                          onPress={() => {
                            if (item.isFromEdit) {
                              setListImageDelete(listImageDeletee => [
                                ...listImageDeletee,
                                item.image,
                              ]);
                              const newList = listImage.filter(
                                (item, i) => i !== index,
                              );
                              setListImage(newList);
                            } else {
                              const newList = listImageMore.filter(
                                (items, i) => items.uri !== item.image,
                              );
                              setListImageMore(newList);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: WidthSize(4),
                            right: WidthSize(4),
                            zIndex: 2,
                            backgroundColor: '#EF6556',
                            borderRadius: 10,
                          }}
                          icon="IconCloseBoldWhite"
                          width={HeightSize(20)}
                          height={HeightSize(20)}
                        />
                      </ImageBackground>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                Category
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HeightSize(16),
                  flexWrap: 'wrap',
                  gap: HeightSize(16),
                }}>
                {tabs.map((item, index) => {
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => {
                        setCategory(item);
                      }}
                      style={{
                        paddingHorizontal: WidthSize(16),
                        paddingVertical: HeightSize(8),
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#836E44',
                        backgroundColor:
                          category?.id === item.id ? '#836E44' : 'transparent',
                      }}>
                      <Text
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: category?.id === item.id ? 'white' : '#3B3021',
                        }}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              let formData = new FormData();
              formData.append('name', name);
              formData.append('category', category.title);

              formData.append('width', route.params.size.width);
              formData.append('height', route.params.size.height);
              let arrRetangle: {
                minX: number;
                minY: number;
                maxX: number;
                maxY: number;
                variant: number | undefined;
              }[] = [];
              retangles.map((item, index) => {
                arrRetangle.push({
                  minX: item.minX,
                  minY: item.minY,
                  maxX: item.maxX,
                  maxY: item.maxY,
                  variant: item.variant?.id,
                });
              });
              formData.append('rectangles', JSON.stringify(arrRetangle));
              console.log(JSON.stringify(formData, null, 2));
              styleService.updateStyle(formData, route.params.id).then(res => {
                console.log(JSON.stringify(res.data, null, 2));
                if (res.status === 200) {
                  dispatch(getStyleByStore(res.data.store.id));
                  if (listImageMore.length > 0) {
                    listImageMore.forEach(async (item, index) => {
                      let formData = new FormData();
                      formData.append('style', res.data.id);
                      formData.append('image', {
                        uri: item.uri,
                        type: item.type,
                        name: item.fileName,
                      });
                      await styleService.addListImage(formData);
                    });
                  }
                  if (listImageDeletee.length > 0) {
                    listImageDeletee.forEach(async (item, index) => {
                      await styleService.deleteImage(
                        {
                          image: item,
                        },
                        route.params.id,
                      );
                    });
                  }
                }
              });
              //   setModalPost(false);
              //   navigation.goBack();
            }}
            activeOpacity={0.8}
            style={{
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
              backgroundColor: '#836E44',
              borderRadius: 10,
              paddingVertical: HeightSize(16),
              position: 'absolute',
              bottom: 0,
              left: WidthSize(16),
              width: width - WidthSize(32),
            }}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.XL,
                color: 'white',
                textAlign: 'center',
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ContainerView>
  );
};

export default EditStyleRoom;
