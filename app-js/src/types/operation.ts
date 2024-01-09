export enum Operation {
  SUM = '+',
  SUB = '-',
  MULT = '*',
  DIV = '/',
}

export const operationsMap = {
  [Operation.SUM]: (a: number, b: number): number => a + b,
  [Operation.SUB]: (a: number, b: number): number => a - b,
  [Operation.MULT]: (a: number, b: number): number => a * b,
  [Operation.DIV]: (a: number, b: number): number => b !== 0 ?  (a / b) : Number.NaN,
};
