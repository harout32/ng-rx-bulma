import { AbstractControl, ValidatorFn } from '@angular/forms';

export type DateValidatorType = 'YYYY/MM/DD' | 'DD MMM YYYY' | 'DD-MMM-YY';

const monthsMap = {
  JAN: 31,
  FEB: 29,
  MAR: 31,
  APR: 30,
  MAY: 31,
  JUN: 30,
  JUL: 31,
  AUG: 31,
  SEP: 30,
  OCT: 31,
  NOV: 30,
  DEC: 31
};
const monthsIndexMap = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAY',
  6: 'JUN',
  7: 'JUL',
  8: 'AUG',
  9: 'SEP',
  10: 'OCT',
  11: 'NOV',
  12: 'DEC'
};

function isMonthAndDay(month: string, day: number): boolean {
  return (
    !Number.isNaN(day) && monthsMap[month] && day > 0 && day <= monthsMap[month]
  );
}
function isYear(year: number) {
  return !Number.isNaN(year) && year > 1970 && String(year).length === 4;
}

const errorMessage = 'invalidDate';

/**
 * @export
 * @param {('YYYY/MM/DD' | 'DD MMM YYYY' | 'DD-MMM-YY')} params
 * @returns {ValidatorFn}
 */
export function ValidDate(
  params: 'YYYY/MM/DD' | 'DD MMM YYYY' | 'DD-MMM-YY'
): ValidatorFn {
  return (control: AbstractControl) => {
    let dateArr;
    let year;
    let month;
    let day;

    if (params === 'DD-MMM-YY') {
      
      dateArr = control.value.split('-');
      year = +('20' + dateArr[2]);
      month = dateArr[1];
      day = dateArr[0];

    } else if (params === 'DD MMM YYYY') {

      dateArr = control.value.split(' ');
      year = dateArr[2];
      month = dateArr[1];
      day = dateArr[0];

    } else if (params === 'YYYY/MM/DD') {

      dateArr = control.value.split('/');
      year = +dateArr[0];
      month = monthsIndexMap[+dateArr[1]];
      day = +dateArr[2];

    }
    if (control.value !== '' && dateArr.length !== 3) {
      return {
        validDate: errorMessage
      };
    }
    if (control.value === '' || isMonthAndDay(month, day) && isYear(year)) {
      return null;
    }
    return {
        validDate: errorMessage
    };
  };
}
