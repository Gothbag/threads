export interface IThread {
  agreement: {
    accept_button_text: string;
    forms: IForm[];
  };
  cfscode: string;
  closed: boolean;
  content: string;
  sender: {
    user: string;
  };
  recipient: {
    address: string;
  }
  history: ThreadHistory[]
}

export interface ThreadHistory {
  date: string;
  status: ThreadHistoryStatus;
}

export interface QuestionOption {
  default: boolean;
  label: string;
  oid: number;
  input: {
    allowed: boolean;
    min: number;
    max: number;
  }
}

export enum QuestionType {
  Check = "CHECK",
  Text = "TEXT",
}

export interface Question {
  answers: {
    oid: number;
    value: string;
  }[];
  label: string;
  options: QuestionOption[];
  qid: number;
  type: QuestionType,
}

export interface IForm {
  fid: string;
  questions: Question[];
  title: string;
}

enum ThreadHistoryStatus {
  Imposition = "IMPOSITION",
  Sent = "SENT",
  Delivery = "DELIVERY",
  Read = "READ",
  Cfsdata = "CFSDATA"
}