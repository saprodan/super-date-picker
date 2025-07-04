// export const FORMAT_MASK = "mmm d, yyyy @ HH:MM:ss";
export const FORMAT_MASK = 'MMM D, YYYY @ HH:mm:ss';

type Month = {
  id: number;
  name: string;
};

export const MONTHS_LIST: Month[] = [
  {
    id: 0,
    name: 'January',
  },
  {
    id: 1,
    name: 'Febuary',
  },
  {
    id: 2,
    name: 'March',
  },
  {
    id: 3,
    name: 'April',
  },
  {
    id: 4,
    name: 'May',
  },
  {
    id: 5,
    name: 'June',
  },
  {
    id: 6,
    name: 'July',
  },
  {
    id: 7,
    name: 'August',
  },
  {
    id: 8,
    name: 'September',
  },
  {
    id: 9,
    name: 'October',
  },
  {
    id: 10,
    name: 'November',
  },
  {
    id: 11,
    name: 'December',
  },
];

export const TIME_LIST = [
  { hour: '00', minutes: '00' },
  { hour: '00', minutes: '30' },
  { hour: '01', minutes: '00' },
  { hour: '01', minutes: '30' },
  { hour: '02', minutes: '00' },
  { hour: '02', minutes: '30' },
  { hour: '03', minutes: '00' },
  { hour: '03', minutes: '30' },
  { hour: '04', minutes: '00' },
  { hour: '04', minutes: '30' },
  { hour: '05', minutes: '00' },
  { hour: '05', minutes: '30' },
  { hour: '06', minutes: '00' },
  { hour: '06', minutes: '30' },
  { hour: '07', minutes: '00' },
  { hour: '07', minutes: '30' },
  { hour: '08', minutes: '00' },
  { hour: '08', minutes: '30' },
  { hour: '09', minutes: '00' },
  { hour: '09', minutes: '30' },
  { hour: '10', minutes: '00' },
  { hour: '10', minutes: '30' },
  { hour: '11', minutes: '00' },
  { hour: '11', minutes: '30' },
  { hour: '12', minutes: '00' },
  { hour: '12', minutes: '30' },
  { hour: '13', minutes: '00' },
  { hour: '13', minutes: '30' },
  { hour: '14', minutes: '00' },
  { hour: '14', minutes: '30' },
  { hour: '15', minutes: '00' },
  { hour: '15', minutes: '30' },
  { hour: '16', minutes: '00' },
  { hour: '16', minutes: '30' },
  { hour: '17', minutes: '00' },
  { hour: '17', minutes: '30' },
  { hour: '18', minutes: '00' },
  { hour: '18', minutes: '30' },
  { hour: '19', minutes: '00' },
  { hour: '19', minutes: '30' },
  { hour: '20', minutes: '00' },
  { hour: '20', minutes: '30' },
  { hour: '21', minutes: '00' },
  { hour: '21', minutes: '30' },
  { hour: '22', minutes: '00' },
  { hour: '22', minutes: '30' },
  { hour: '23', minutes: '00' },
  { hour: '23', minutes: '30' },
];
