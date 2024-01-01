import {Normalized} from '.';

export enum Color {
  WHITES = 'Whites',
  BLACKS = 'Blacks',
  GREYS = 'Greys',
  BEIGES = 'Beiges',
  BROWNS = 'Browns',
  REDS = 'Reds',
  GREENS = 'Greens',
  BLUES = 'Blues',
  PURPLES = 'Purples',
  YELLOWS = 'Yellows',
  PINKS = 'Pinks',
  ORANGES = 'Oranges',
}

export const NormalizeColor: Normalized<string, string> = {
  ids: [
    'whites',
    'blacks',
    'breys',
    'beiges',
    'browns',
    'reds',
    'greens',
    'blues',
    'purples',
    'yellows',
    'pinks',
    'oranges',
  ],
  entities: {
    whites: '#FFFFFF',
    blacks: '#000000',
    breys: '#83878D',
    beiges: '#A99C82',
    browns: '#401D0b',
    reds: '#A50221',
    greens: '#5FA758',
    blues: '#56AAFF',
    purples: '#800080',
    yellows: '#FFDD00',
    pinks: '#FF68B4',
    oranges: '#F2520A',
  },
};
