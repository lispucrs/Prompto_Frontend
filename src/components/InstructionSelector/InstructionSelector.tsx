import React from "react";
import "./InstructionSelector.scss";

type Instruction = {
  key: number;
  label: string;
};

type Props = {
  instructions: Instruction[];
  onSelect: (instructionKey: number) => void;
};

export default function InstructionSelector({ instructions, onSelect }: Props) {
  return (
    <div className="instruction-selector">
      <h1>What do you want to do?</h1>
      <ul>
        {instructions.map((instruction) => (
          <li
            key={instruction.key}
            onClick={() => onSelect(instruction.key)}
            className="instruction-item"
          >
            {instruction.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
