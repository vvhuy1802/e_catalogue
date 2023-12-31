import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {getUrl} from '~/utils';
import BagItem from './bagItem';
import {CartResponse, NormalizeCartVariant} from '~/types/order';

type Props = {
  dataCart: CartResponse;
  items: NormalizeCartVariant | undefined;
  setItems: (value: NormalizeCartVariant | undefined) => void;
  store: number;
  currentStore: number;
  setCurrentStore: (value: number) => void;
};
const StoreItem = ({
  dataCart,
  items,
  setItems,
  store,
  currentStore,
  setCurrentStore,
}: Props) => {
  const [checkAll, setCheckAll] = React.useState(false);
  const [checkStore, setCheckStore] = React.useState(false);

  useEffect(() => {
    if (currentStore !== store) {
      if (checkAll) {
        setCheckAll(false), setCheckStore(false);
      }
    }
  }, [currentStore]);

  useEffect(() => {
    if (
      items?.ids.length === dataCart.stores.entities[store].items.ids.length &&
      currentStore === store
    ) {
      setCheckStore(true);
      setCheckAll(true);
    } else {
      setCheckStore(false);
    }
  }, [items]);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#F0EFE9',
        paddingVertical: HeightSize(16),
        paddingLeft: HeightSize(16),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: HeightSize(24),
            justifyContent: 'center',
            marginRight: HeightSize(8),
          }}>
          {checkStore ? (
            <IconSvg
              onPress={() => {
                setCurrentStore(store);
                setCheckAll(false);
                setCheckStore(false);
                setItems({
                  ids: [],
                  entities: {},
                });
              }}
              icon="IconCheckBoxCheckedWhite"
            />
          ) : (
            <IconSvg
              onPress={() => {
                setCurrentStore(store);
                setCheckAll(true);
                setCheckStore(true);
                setItems(dataCart.stores.entities[store].items);
              }}
              icon="IconCheckBoxUnCheckWhite"
            />
          )}
        </View>
        <FastImage
          source={getUrl(dataCart.stores.entities[store].logo_image) as any}
          style={{
            width: HeightSize(32),
            height: HeightSize(32),
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            ...TextFont.SMedium,
            ...TextStyle.XL,
            color: '#3B3021',
            marginLeft: WidthSize(8),
          }}>
          {dataCart.stores.entities[store].name}
        </Text>
        <IconSvg
          style={{
            marginLeft: WidthSize(8),
          }}
          width={HeightSize(12)}
          height={HeightSize(12)}
          icon="IconAngleRightBrown"
        />
      </View>
      <View
        style={{
          gap: HeightSize(32),
          marginTop: HeightSize(16),
        }}>
        {dataCart.stores.entities[store].items.ids.map((variant, index) => {
          return (
            <BagItem
              key={variant}
              checkAll={checkAll}
              variant={dataCart.stores.entities[store].items.entities[variant]}
              items={items}
              setItems={setItems}
              currentStore={currentStore}
              setCurrentStore={setCurrentStore}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StoreItem;
