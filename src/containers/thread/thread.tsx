import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';

import { IThread } from '../../types/threads';

import FixedBar from './components/fixed-bar';

import './thread.scss';
import Form from './components/form';
import useForm from './hooks/use-form';

const Thread = () => {
  const thread = useLoaderData() as IThread;
  const { cfskey, cfstoken } = useParams();

  const { agreement: { accept_button_text: acceptButtonText, forms: [form] }, closed } = thread;

  const [isDisabled, setIsDisabled] = useState(closed);

  const { formValues, handleChange } = useForm(form);

  const acceptThread = async () => {
    const resp = await axios.post(`https://api-sandbox.confirmsign.com/v4.0/threads/token/${cfskey}/${cfstoken}/agreement/true`, [{
      fid: form.fid,
      title: form.title,
      required: true,
      answered: true,
      questions: form.questions.map(question => {
        if (Array.isArray(formValues[question.qid])) {
          return {
            ...question, answers: (formValues[question.qid] as number[]).map((value: number) => ({
              oid: value,
              value: question.options.find(({ oid }) => oid === value)?.label,
            }))
          };
        }
        return {
          ...question,
          answers: [{ value: formValues[question.qid], oid: question.options[0].oid }]
        };
      }),
    }]);
    if (resp.status === 201) {
      setIsDisabled(true);
    }
  }

  return (
    <>
      <FixedBar
        cfscode={thread.cfscode}
        sender={thread.sender.user}
        recipient={thread.recipient.address}
        history={thread.history} />
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(thread.content, {
            USE_PROFILES: { html: true }
          })
        }} />
      <Form
        form={form}
        formValues={formValues}
        handleChange={handleChange}
        isDisabled={isDisabled}
      />
      <button
        className="button button--accept"
        disabled={isDisabled}
        onClick={acceptThread}>
        {isDisabled ? 'El hilo ya ha sido cerrado' : acceptButtonText}
      </button>
    </>
  );
}

export default Thread;