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
const dataColoursNormalize = {
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  entities: {
    1: {id: 1, name: 'Whites', color: '#FFFFFF'},
    2: {id: 2, name: 'Blacks', color: '#000000'},
    3: {id: 3, name: 'Greys', color: '#83878D'},
    4: {id: 4, name: 'Beiges', color: '#A99C82'},
    5: {id: 5, name: 'Browns', color: '#401D0B'},
    6: {id: 6, name: 'Reds', color: '#A50221'},
    7: {id: 7, name: 'Greens', color: '#5FA758'},
    8: {id: 8, name: 'Blues', color: '#56AAFF'},
    9: {id: 9, name: 'Purples', color: '#800080'},
    10: {id: 10, name: 'Yellows', color: '#FFDD00'},
    11: {id: 11, name: 'Pinks', color: '#FF68B4'},
    12: {id: 12, name: 'Oranges', color: '#F2520A'},
  },
};

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
