import { Operation } from "@snapmath/types/operation";

export interface MathOperationSelectProps {
  onOperationSelected: (operation: Operation) => void;
}

export function MathOperationSelect({ onOperationSelected }: MathOperationSelectProps) {
  return (
    <>
      <label htmlFor="operation" className="block text-sm font-medium text-gray-600">
        Select Operation:
      </label>
      <select
        id="operation"
        name="operation"
        onChange={(e) => onOperationSelected(e.target.value as Operation)}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="+">Addition (+)</option>
        <option value="-">Subtraction (-)</option>
        <option value="*">Multiplication (*)</option>
        <option value="/">Division (/)</option>
      </select>
    </>
  );
}
