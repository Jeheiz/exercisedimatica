import { expect, test } from '@jest/globals';



// Pruebas unitarias
test('Capitaliza correctamente una palabra simple', () => {
  expect(getCapitalizeFirstWord('hello')).toBe('Hello');
});

test('Maneja una cadena vacía sin errores', () => {
  expect(getCapitalizeFirstWord('')).toBe('');
});

test('Capitaliza cada palabra en una frase', () => {
  expect(getCapitalizeFirstWord('hello world')).toBe('Hello World');
});

test('Maneja cadenas con una sola letra', () => {
  expect(getCapitalizeFirstWord('a')).toBe('A');
});

test('Maneja cadenas que ya están capitalizadas', () => {
  expect(getCapitalizeFirstWord('Hello')).toBe('Hello');
});

test('Maneja cadenas con números y caracteres especiales', () => {
  expect(getCapitalizeFirstWord('123 abc')).toBe('123 Abc');
});

test('Lanza un error para un valor nulo', () => {
  expect(() => getCapitalizeFirstWord(null)).toThrow('Failed to capitalize first word with null');
});
