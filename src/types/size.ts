import {Normalized} from '.';

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export const NormalizeSize: Normalized<string, string> = {
  ids: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
  entities: {
    xs: Size.XS,
    s: Size.S,
    m: Size.M,
    l: Size.L,
    xl: Size.XL,
    xxl: Size.XXL,
  },
};
