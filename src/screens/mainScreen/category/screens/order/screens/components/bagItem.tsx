import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {NormalizeColor} from '~/types/color';
import {getUrl} from '~/utils';
import {CartVariant, NormalizeCartVariant} from '~/types/order';
import {orderService} from '~/services/service/order.service';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {getCartUser} from '~/redux/actions/orderAction';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  variant: CartVariant;
  checkAll: boolean;
  items: NormalizeCartVariant | undefined;
  setItems: (items: NormalizeCartVariant) => void;
  currentStore: number;
  setCurrentStore: (value: number) => void;
};
const BagItem = ({
  variant,
  checkAll,
  items,
  setItems,
  currentStore,
  setCurrentStore,
}: Props) => {
  const [isCheck, setIsCheck] = React.useState(false);
  const [quantity, setQuantity] = React.useState(variant.quantity);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsCheck(checkAll);
  }, [checkAll]);

  useEffect(() => {
    if (currentStore !== variant.product.store.id) {
      isCheck && setIsCheck(false);
      if (items) {
        const newItems = {
          ids: items.ids.filter(id => {
            return items.entities[id].product.store.id === currentStore;
          }),
          entities: {
            ...items.entities,
          },
        };
        items.ids.forEach(id => {
          if (items.entities[id].product.store.id !== currentStore) {
            delete newItems.entities[id];
          }
        });
        setItems(newItems);
      }
    }
  }, [currentStore]);

  useEffect(() => {
    if (isCheck) {
      //check if items is not contain variant
      if (!items?.entities[variant.item_id as number]) {
        const newItems = {
          ids: [...(items?.ids || []), variant.item_id],
          entities: {
            ...(items?.entities || {}),
            [variant.item_id as number]: variant,
          },
        };
        setItems(newItems as NormalizeCartVariant);
        setCurrentStore(variant.product.store.id);
      }
    } else {
      //if uncheck, remove variant from items
      if (items?.entities[variant.item_id as number]) {
        const newItems = {
          ids: items.ids.filter(id => id !== variant.item_id),
          entities: {
            ...items.entities,
          },
        };
        delete newItems.entities[variant.item_id as number];
        setItems(newItems);
        setCurrentStore(variant.product.store.id);
      }
    }
  }, [isCheck]);

  const handleDelete = (route?: string) => {
    const params = {
      item_id: variant.item_id,
    };
    orderService.deleteItemCart(params).then(res => {
      if (res.status === 200) {
        dispatch(getCartUser());
        if (route === 'left') {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming(-width * 3);
          heightItem.value = withTiming(0);
        }
      }
    });
  };

  const translateX = useSharedValue(0);
  const lastTranslateX = useSharedValue(0);
  const heightItem = useSharedValue(HeightSize(100));
  const THRESHOLD = WidthSize(70);
  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        if (lastTranslateX.value === 0) {
          if (event.translationX > 0) return;
          if (event.translationX < -width / 2.5) return;
          translateX.value = lastTranslateX.value + event.translationX;
        } else {
          if (event.translationX > 0) return;
          if (event.translationX < -width / 2.5 - lastTranslateX.value) return;
          translateX.value = lastTranslateX.value + event.translationX;
        }
      },
      onEnd: event => {
        if (event.translationX < -width / 3) {
          runOnJS(handleDelete)();
        } else if (event.translationX < -THRESHOLD / 2) {
          translateX.value = withTiming(-THRESHOLD);
          lastTranslateX.value = -THRESHOLD;
        } else {
          translateX.value = withTiming(0);
          lastTranslateX.value = 0;
        }
      },
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const rStyleDelete = useAnimatedStyle(() => ({
    height: heightItem.value,
  }));

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      activeOffsetX={[-10, 10]}>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
          },
          rStyle,
          rStyleDelete,
        ]}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: -(width + WidthSize(70)),
            width: width + WidthSize(70),
            height: '100%',
            backgroundColor: 'red',
            justifyContent: 'center',
            paddingLeft: WidthSize(70) / 2 - HeightSize(12),
          }}>
          <IconSvg
            onPress={() => {
              handleDelete('left');
            }}
            icon="IconTrashWhite"
          />
        </View>
        <View
          style={{
            width: HeightSize(24),
            justifyContent: 'center',
            marginRight: HeightSize(8),
          }}>
          {isCheck ? (
            <IconSvg
              onPress={() => {
                setIsCheck(false);
              }}
              icon="IconCheckBoxCheckedWhite"
            />
          ) : (
            <IconSvg
              onPress={() => {
                setIsCheck(true);
              }}
              icon="IconCheckBoxUnCheckWhite"
            />
          )}
        </View>
        <FastImage
          source={getUrl(variant.image) as any}
          style={{
            width: HeightSize(100),
            height: HeightSize(100),
            borderRadius: 12,
            backgroundColor: 'white',
          }}
        />
        <View
          style={{
            marginLeft: HeightSize(16),
            width: width - HeightSize(180),
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...TextFont.SRegular,
              ...TextStyle.Base,
              color: '#3B3021',
            }}>
            {variant.product.name}
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
              {variant.color && (
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
                        NormalizeColor.entities[variant.color.toLowerCase()],
                      marginRight: HeightSize(4),
                    }}
                  />
                  <Text
                    style={{
                      ...TextFont.SRegular,
                      ...TextStyle.SM,
                      color: '#3B3021',
                    }}>
                    {variant.color}
                  </Text>
                </View>
              )}

              {variant.size && (
                <Text
                  style={{
                    ...TextFont.SRegular,
                    ...TextStyle.SM,
                    color: '#3B3021',
                  }}>
                  - {variant.size}
                </Text>
              )}
            </View>
            <View />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HeightSize(8),
            }}>
            <Text
              style={{
                ...TextFont.SMedium,
                ...TextStyle.XL,
                color: '#3B3021',
              }}>
              ${variant.price}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  // handlePlus(data.item);
                }}
                style={{
                  height: HeightSize(24),
                  width: HeightSize(24),
                  borderWidth: 1,
                  borderColor: '#DCD7CB',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconSvg
                  icon="IconMinusSmallBrown"
                  width={HeightSize(12)}
                  height={HeightSize(12)}
                />
              </Pressable>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: '#DCD7CB',
                  height: HeightSize(24),
                  width: HeightSize(36),
                }}>
                <TextInput
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.SM,
                    color: '#3B3021',
                    textAlign: 'center',
                    height: HeightSize(24),
                  }}
                  value={quantity.toString()}
                  onChangeText={text => {
                    setQuantity(parseInt(text));
                  }}
                  keyboardType="number-pad"
                />
              </View>
              <Pressable
                onPress={() => {
                  // handlePlus(data.item);
                }}
                style={{
                  height: HeightSize(24),
                  width: HeightSize(24),
                  borderWidth: 1,
                  borderColor: '#DCD7CB',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconSvg
                  icon="IconPlusSmallBrown"
                  width={HeightSize(12)}
                  height={HeightSize(12)}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default BagItem;

const styles = StyleSheet.create({});
