import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDADDRESS,
  CONFIRMORDER,
  EDITADDRESS,
  MYBAG,
} from '~/constants/routeNames';
import {OrderStackParamList} from '~/types';
import MyBag from './screens/myBag';
import ConfirmOrder from './screens/confirmOrder';
import EditAddress from './screens/components/editAddress';
import AddAddress from './screens/components/addAddress';
import {OrderStackContext} from '~/utils/context';
import {AppProvider} from '~/app/appProvider';
import {contactService} from '~/services/service/contact.service';

const Stack = createNativeStackNavigator<OrderStackParamList>();
const OrderStack = () => {
  const [dataAddress, setDataAddress] = React.useState<any>();
  const [localAddress, setAddress] = React.useState<any>();
  const [dataContact, setDataContact] = React.useState<any>();
  useEffect(() => {
    const getVietNamAddress = async () => {
      const res = await AppProvider.getLocationVietNam();
      setAddress(res);
      const currentAddress = await AppProvider.getCurrentContact();
      if (currentAddress) {
        setDataAddress(currentAddress);
      }
      contactService.getUserAddress().then(res => {
        res.status === 200 && setDataContact(res.data);
      });
    };
    getVietNamAddress();
  }, []);

  return (
    <OrderStackContext.Provider
      value={{
        dataAddress,
        setDataAddress,
        localAddress,
        dataContact,
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name={MYBAG}
          component={MyBag}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={CONFIRMORDER}
          component={ConfirmOrder}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={EDITADDRESS}
          component={EditAddress}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={ADDADDRESS}
          component={AddAddress}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </OrderStackContext.Provider>
  );
};

export default OrderStack;
