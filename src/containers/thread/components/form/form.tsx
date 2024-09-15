import { ChangeEvent } from 'react';

import Checkboxes from '../../../../components/checkboxes';
import Input from '../../../../components/input';
import { IForm, Question, QuestionType } from '../../../../types/threads';
import { FormFields } from '../../../../types/forms';

interface Props {
  form: IForm
  formValues: FormFields;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const Form = ({ form, formValues, handleChange, isDisabled }: Props) => {
    const getField = (question: Question) => {
    if (question.type === QuestionType.Text) {
      return <Input
        key={question.qid}
        isDisabled={isDisabled}
        qid={question.qid}
        options={question.options}
        value={formValues[question.qid] as string}
        handleChange={handleChange}
      />;
    }

    return <Checkboxes
      key={question.qid}
      handleChange={handleChange}
      isDisabled={isDisabled}
      qid={question.qid}
      title={question.label}
      options={question.options}
      values={formValues[question.qid] as number[]} />;
  }

  return (
    <form>
      {form.questions.map(getField)}
    </form>
  );
}

export default Form;