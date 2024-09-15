import { ChangeEvent } from "react";

import { QuestionOption } from "../../types/threads";

import './checkboxes.scss';

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  title: string;
  qid: number;
  options: QuestionOption[];
  values: number[];
}

const Checkboxes = ({ handleChange, isDisabled, options, qid, title, values }: Props) => (
  <div className="checkbox-group">
    <div className="checkbox-group__title">{title}</div>
    {options.map(option => (
      <div className="checkbox-group__item" key={option.oid}>
        <input
          className="checkbox-group__input"
          disabled={isDisabled}
          onChange={handleChange}
          type="checkbox"
          id={`${option.oid}`}
          name={`${qid}`}
          value={option.oid}
          checked={values.includes(option.oid)} />
        <label className="checkbox-group__label" htmlFor={`${option.oid}`}>
          {option.label}
        </label>
      </div>
    ))}
  </div>);

export default Checkboxes;