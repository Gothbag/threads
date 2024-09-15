import { ChangeEvent } from "react";

import { QuestionOption } from "../../types/threads";

import './input.scss';

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  qid: number;
  options: QuestionOption[];
  value: string;
}

const Input = ({ handleChange, isDisabled, qid, options, value }: Props) => {
  const inputData = options[0];

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={`${inputData.oid}`}>{inputData.label}</label>
      <input
        className="form-field__input"
        disabled={isDisabled}
        name={`${qid}`}
        max={inputData.input.max}
        min={inputData.input.min}
        type="text"
        id={`${inputData.oid}`}
        value={value}
        onChange={handleChange} />
    </div>);
}

export default Input;