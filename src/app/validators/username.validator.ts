import { AbstractControl } from '@angular/forms';

const alphabetMap = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  j: true,
  k: true,
  l: true,
  m: true,
  n: true,
  o: true,
  p: true,
  q: true,
  r: true,
  s: true,
  t: true,
  u: true,
  v: true,
  w: true,
  x: true,
  y: true,
  z: true,
  ' ': true,
};

const errorMessage = 'User name should be lower case maximum 2 words and should not contain any symbol or number';
export function ValidUserName(control: AbstractControl) {
  if (control.value.split(' ').length > 2) {
    return {validUserName: errorMessage};
  }
  for (const char of control.value) {
      if (!alphabetMap[char] ) {
        return {validUserName: errorMessage};
      }
  }
  return null;
}
