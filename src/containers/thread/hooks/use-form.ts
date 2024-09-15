import { ChangeEvent, useState } from "react";

import { IForm, QuestionType } from "../../../types/threads";
import { FormFields, FormFieldValue } from "../../../types/forms";

function useForm(form: IForm) {
  const initialValues = form.questions.reduce((acc, question) => {
    const isCheck = question.type === QuestionType.Check;
    let val: FormFieldValue = isCheck ? [] : "";
    if (Array.isArray(question.answers) && question.answers.length > 0) {
      val = isCheck ? question.answers.map(({ oid }) => oid) : question.answers[0].value;
    }
    acc[question.qid] = val;
    return acc;
  }, {} as FormFields);
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setFormValues((prevValues) => {
      if (type === "checkbox") {
        const parsedValue = parseInt(value, 10);
        const previousSelectedValues = prevValues[name] as number[];

        return {
          ...prevValues,
          [name]: checked
            ? [...previousSelectedValues, parsedValue]
            : previousSelectedValues.filter((num) => num !== parsedValue),
        };
      }
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  return {
    formValues,
    handleChange,
  };
}

export default useForm;