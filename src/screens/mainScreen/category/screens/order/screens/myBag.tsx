import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, OrderStackParamList} from '~/types';
import {AppDispatch} from '~/app/store';
import {useDispatch, useSelector} from 'react-redux';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {HeightSize, WidthSize} from '~/theme/size';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryButton from '~/components/global/primaryButton';
import {selectDataCart} from '~/redux/reducers/orderSlice';
import {NormalizeCartVariant} from '~/types/order';
import {CONFIRMORDER} from '~/constants/routeNames';
import {getCartUser} from '~/redux/actions/orderAction';
import StoreItem from './components/storeItem';

type Props = {
  route: RouteProp<OrderStackParamList, 'MyBag'>;
};
const MyBag = ({route}: Props) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const navigationOrder =
    useNavigation<StackNavigationProp<OrderStackParamList, 'MyBag'>>();
  const dataCart = useSelector(selectDataCart);
  const dispatch = useDispatch<AppDispatch>();
  const onGoBack = () => {
    if (route.params.isShowBottomBarWhenBack) {
      dispatch(SetDirectionBottomBar('up'));
    }
    navigation.goBack();
  };

  const moveLeft = useRef(new Animated.Value(0)).current;
  const [isShowCheck, setIsShowCheck] = React.useState(false);

  useEffect(() => {
    Animated.timing(moveLeft, {
      toValue: isShowCheck ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isShowCheck]);

  const [items, setItems] = React.useState<NormalizeCartVariant | undefined>();
  const [total, setTotal] = React.useState(0);
  const [currentStoreSelected, setCurrentStoreSelected] =
    React.useState<number>(dataCart.stores.ids[0]);

  useEffect(() => {
    let total = 0;
    items?.ids.forEach(item => {
      total += items.entities[item].price * items.entities[item].quantity;
    });
    setTotal(total);
  }, [items]);

  useEffect(() => {
    dispatch(getCartUser());
  }, []);

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
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <Text
            style={{
              ...TextFont.GRegular,
              ...TextStyle.text4XL,
              color: '#3B3021',
              alignSelf: 'center',
            }}>
            My Bag
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: WidthSize(16),
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
            // onPress={() => {
            //   handleRightIconPress();
            // }}
            icon={!isShowCheck ? 'IconEditBrown' : 'IconCheckBoxUnCheckWhite'}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: HeightSize(200),
            gap: HeightSize(16),
          }}
          showsVerticalScrollIndicator={false}>
          {dataCart.stores.ids.map((item, index) => {
            return (
              <StoreItem
                key={index}
                dataCart={dataCart}
                items={items}
                setItems={setItems}
                store={item}
                currentStore={currentStoreSelected}
                setCurrentStore={setCurrentStoreSelected}
              />
            );
          })}
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
              navigation.navigate('OrderStack', {
                screen: CONFIRMORDER,
                params: {
                  dataOrder: items,
                },
              });
            }}
          />
        </View>
      </View>
    </ContainerImage>
  );
};

export default MyBag;

const styles = StyleSheet.create({});
