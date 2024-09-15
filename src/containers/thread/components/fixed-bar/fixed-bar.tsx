import { ThreadHistory } from '../../../../types/threads';

import './fixed-bar.scss';

interface Props {
  cfscode: string;
  history: ThreadHistory[];
  recipient: string;
  sender: string;
}

const FixedBar = ({ cfscode, history, sender, recipient }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar__item">
        <span>{cfscode}</span>
      </div>
      <div className="navbar__item">
        <span>{sender}</span>
      </div>
      <div className="navbar__item">
        <span>{recipient}</span>
      </div>
      <div className="navbar__item navbar__item--dropdown">
        <span className="navbar__dropbtn">{history[0].status}</span>
        <div className="navbar__dropdown-content">
          {history.filter(history => history.status).map(history => (
            <span className="navbar__dropdown-item" key={history.date}>
              {history.status}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FixedBar;