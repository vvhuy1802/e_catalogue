import {
  Animated,
  ListRenderItemInfo,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, Normalized, OrderStackParamList} from '~/types';
import {AppDispatch} from '~/app/store';
import {useDispatch} from 'react-redux';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {HeightSize, WidthSize, width} from '~/theme/size';
import FastImage from 'react-native-fast-image';
import {IconSvg} from '~/components/global/iconSvg';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import PrimaryButton from '~/components/global/primaryButton';
import {setDataOrder} from '~/redux/reducers/orderSlice';

const MyBag = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const navigationOrder =
    useNavigation<StackNavigationProp<OrderStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigation.goBack();
  };
  const dataBag: Normalized<number, any> = {
    ids: [1, 2, 3, 4, 5],
    entities: {
      1: {
        img: images.home.ImagePopular,
        name: 'Sofa',
        price: 100,
        size: 'L',
        color: 'red',
        isChecked: true,
        quantity: 1,
      },
      2: {
        img: images.home.ImagePopular,
        name: 'Sofa',
        price: 673,
        size: 'L',
        color: 'red',
        isChecked: true,
        quantity: 1,
      },
      3: {
        img: images.home.ImagePopular,
        name: 'Sofa',
        price: 516,
        size: 'L',
        color: 'red',
        isChecked: true,
        quantity: 1,
      },
      4: {
        img: images.home.ImagePopular,
        name: 'Sofa',
        price: 712,
        size: 'L',
        color: 'red',
        isChecked: true,
        quantity: 1,
      },
      5: {
        img: images.home.ImagePopular,
        name: 'Sofa',
        price: 754,
        size: 'L',
        color: 'red',
        isChecked: true,
        quantity: 1,
      },
    },
  };
  const [dataB, setDataB] = React.useState<Normalized<number, any>>(dataBag);
  const moveLeft = useRef(new Animated.Value(0)).current;
  const [isShowCheck, setIsShowCheck] = React.useState(false);

  useEffect(() => {
    Animated.timing(moveLeft, {
      toValue: isShowCheck ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isShowCheck]);

  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    let total = 0;
    dataB.ids.forEach(id => {
      if (dataB.entities[id].isChecked)
        total += dataB.entities[id].quantity * dataB.entities[id].price;
    });
    setTotal(total);
  }, [dataB]);

  const handlePlus = (id: number) => {
    const newData = {
      ...dataB,
      entities: {
        ...dataB.entities,
        [id]: {
          ...dataB.entities[id],
          quantity: dataB.entities[id].quantity + 1,
        },
      },
    };
    setDataB(newData);
  };

  const handleMinus = (id: number) => {
    if (dataB.entities[id].quantity > 1) {
      const newData = {
        ...dataB,
        entities: {
          ...dataB.entities,
          [id]: {
            ...dataB.entities[id],
            quantity: dataB.entities[id].quantity - 1,
          },
        },
      };
      setDataB(newData);
    }
  };

  const closeRow = (rowMap: RowMap<number>, rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (
    rowMap: RowMap<number>,
    data: ListRenderItemInfo<number>,
  ) => {
    closeRow(rowMap, data.item);
    setDataB(prevDataB => {
      const newIds = prevDataB.ids.filter(id => id !== data.item);
      const newEntities = {...prevDataB.entities};
      delete newEntities[data.item];
      return {
        ids: newIds,
        entities: newEntities,
      };
    });
    // }
  };
  const VisibleItem = (props: any) => {
    const {data, rightActionState, rowMap} = props;
    if (rightActionState) {
      deleteRow(rowMap, data);
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            width: moveLeft.interpolate({
              inputRange: [0, 1],
              outputRange: [0, HeightSize(24)],
              extrapolate: 'clamp',
            }),
          }}>
          <IconSvg
            onPress={() => {
              const newData = {
                ...dataB,
                entities: {
                  ...dataB.entities,
                  [data.item]: {
                    ...dataB.entities[data.item],
                    isChecked: !dataB.entities[data.item].isChecked,
                  },
                },
              };
              setDataB(newData);
            }}
            icon={
              dataB.entities[data.item].isChecked
                ? 'IconCheckBoxCheckedWhite'
                : 'IconCheckBoxUnCheckWhite'
            }
          />
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            paddingLeft: HeightSize(8),
            paddingRight: HeightSize(24),
            paddingVertical: HeightSize(8),
            backgroundColor: '#F0EFE9',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            justifyContent: 'space-between',
            height: HeightSize(140),
            transform: [
              {
                translateX: moveLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, HeightSize(16)],
                  extrapolate: 'clamp',
                }),
              },
            ],
            marginRight: moveLeft.interpolate({
              inputRange: [0, 1],
              outputRange: [0, HeightSize(16)],
              extrapolate: 'clamp',
            }),
          }}>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: HeightSize(140),
            }}>
            <FastImage
              style={{
                width: HeightSize(120),
                height: HeightSize(120),
                borderRadius: 15 - HeightSize(8),
              }}
              source={dataB.entities[data.item].img}
            />
            <View
              style={{
                marginLeft: WidthSize(12),
                justifyContent: 'space-between',
              }}>
              <View style={{}}>
                <Text
                  style={{
                    ...TextFont.SRegular,
                    ...TextStyle.XL,
                    color: '#3B3021',
                    width: WidthSize(200),
                  }}>
                  {dataB.entities[data.item].name}
                </Text>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.XL,
                    color: '#3B3021',
                    marginTop: HeightSize(8),
                  }}>
                  ${dataB.entities[data.item].price}
                </Text>
              </View>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.XL,
                  color: '#3B3021',
                  marginTop: HeightSize(8),
                }}>
                Size: {dataB.entities[data.item].size}
              </Text>
            </View>
          </Animated.View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <Pressable
              onPress={() => {
                handlePlus(data.item);
              }}
              style={{
                width: HeightSize(30),
                height: HeightSize(30),
                borderRadius: 16,
                backgroundColor: '#DCD7CB',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconSvg
                icon="IconPlusSmallBrown"
                width={HeightSize(8)}
                height={HeightSize(8)}
              />
            </Pressable>
            <View
              style={{
                width: HeightSize(44),
                height: HeightSize(44),
                borderRadius: 16,
                backgroundColor: '#DCD7CB',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.GRegular,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                {dataB.entities[data.item].quantity}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                handleMinus(data.item);
              }}
              style={{
                width: HeightSize(30),
                height: HeightSize(30),
                borderRadius: 16,
                backgroundColor: '#DCD7CB',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconSvg
                icon="IconMinusSmallBrown"
                width={HeightSize(8)}
                height={HeightSize(8)}
              />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  };
  const renderItem = (
    data: ListRenderItemInfo<number>,
    rowMap: RowMap<number>,
  ) => {
    return <VisibleItem data={data} rowMap={rowMap} />;
  };

  const HiddenItemWithActions = (props: any) => {
    const {swipeAnimatedValue, rowMap, data} = props;

    return (
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#836E44',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: WidthSize(24),
          transform: [
            {
              //transform with key of scale must
              scale: swipeAnimatedValue.interpolate({
                inputRange: [-WidthSize(72), WidthSize(-10), WidthSize(0)],
                outputRange: [1, 0.7, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Animated.View
          style={{
            width: HeightSize(24),
            height: HeightSize(24),
            transform: [
              {
                //transform with key of scale must
                scale: swipeAnimatedValue.interpolate({
                  inputRange: [WidthSize(-72), WidthSize(-10)],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <IconSvg
            onPress={() => {
              deleteRow(rowMap, data);
            }}
            icon="IconTrashWhite"
          />
        </Animated.View>
      </Animated.View>
    );
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<number>,
    rowMap: RowMap<number>,
  ) => {
    return <HiddenItemWithActions data={data} rowMap={rowMap} />;
  };

  const handleRightIconPress = () => {
    const newData = {
      ...dataB,
      entities: {
        ...dataB.entities,
      },
    };
    dataB.ids.forEach(id => {
      newData.entities[id].isChecked = isShowCheck;
    });
    setDataB(newData);
    setIsShowCheck(!isShowCheck);
  };

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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: WidthSize(32),
          }}>
          <Animated.Text
            style={{
              ...TextFont.SRegular,
              ...TextStyle.Base,
              color: '#3B3021',
              marginRight: WidthSize(8),
              opacity: moveLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}>
            Select All
          </Animated.Text>
          <IconSvg
            onPress={() => {
              handleRightIconPress();
            }}
            icon={!isShowCheck ? 'IconEditBrown' : 'IconCheckBoxUnCheckWhite'}
          />
        </View>
      </View>
      <Text
        style={{
          ...TextFont.GRegular,
          ...TextStyle.text4XL,
          color: '#3B3021',
          paddingLeft: WidthSize(32),
          marginTop: WidthSize(32),
        }}>
        My Bag
      </Text>

      <SwipeListView
        data={dataB.ids}
        contentContainerStyle={{
          gap: HeightSize(16),
        }}
        style={{
          marginTop: HeightSize(20),
          paddingHorizontal: WidthSize(20),
          marginBottom: HeightSize(200),
        }}
        disableRightSwipe={true}
        swipeToOpenPercent={50}
        swipeToClosePercent={30}
        rightOpenValue={WidthSize(-72)}
        renderItem={(data, rowMap) => renderItem(data, rowMap)}
        renderHiddenItem={renderHiddenItem}
        rightActivationValue={-(width * 0.5)}
        onRightAction={_ => () => {}}
        onRightActionStatusChange={_ => () => {}}
        keyExtractor={item => item.toString()}
      />
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XL,
              color: '#836E44',
            }}>
            Total
          </Text>
          <Text
            style={{
              ...TextFont.SMedium,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            ${total}
          </Text>
        </View>

        <PrimaryButton
          enable={total > 0}
          style={{
            marginTop: HeightSize(20),
            height: HeightSize(68),
            backgroundColor: total > 0 ? '#836E44' : '#BDBDBD',
            borderRadius: 20,
            marginBottom: HeightSize(32),
          }}
          title="Process to Check out"
          handlePress={async () => {
            const data: Normalized<number, any> = {
              ids: [],
              entities: {},
            };
            dataB.ids.forEach(id => {
              if (dataB.entities[id].isChecked) {
                data.ids.push(id);
                data.entities[id] = dataB.entities[id];
              }
            });
            dispatch(setDataOrder(data));
            navigationOrder.navigate('ConfirmOrder');
          }}
        />
      </View>
    </ContainerImage>
  );
};

export default MyBag;

const styles = StyleSheet.create({});
