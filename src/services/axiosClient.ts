import axios from 'axios';
import {AppProvider} from '../app/appProvider';
import {Methods} from './method';

export const request = async (url: string, method: string, params: any) => {
  let header: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = await AppProvider.getAuth();
  if (token !== null) {
    header = {
      ...header,
      Authorization: `Bearer ${token}`,
    };
  }

  const config = {
    headers: header,
    method: method,
    url: url,
    params: null,
    data: undefined,
  };

  if (method.toLowerCase() === Methods.get) {
    config.params = params;
  } else {
    config.data = params ? params : undefined;
  }

  return new Promise(resolve => {
    console.log('Call API: ', config.url);

    axios(config)
      .then(res => {
        resolve({data: res.data});
      })
      .catch(err => {
        resolve({error: err});
        return;
      });
  });
};
