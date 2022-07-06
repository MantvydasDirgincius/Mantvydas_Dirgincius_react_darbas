import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../store/authContext';
import { doGetRequest } from '../../utils';
import CardList from '../Card/CardList';
import css from './Home.module.css';

function HomeComp() {
  const [record, setRecord] = useState([]);
  const [haveRecords, setHaveRecords] = useState(false);
  const { token } = useContext(AuthContext);

  async function GetingRecords() {
    const records = await doGetRequest(
      'https://autumn-delicate-wilderness.glitch.me/v1/content/skills',
      token
    );
    if (records.length === 0) {
      setHaveRecords(true);
    }
    setRecord(records);
  }

  useEffect(() => {
    GetingRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h1 className={css.title}>Home</h1>

      {record.length === 0 ? (
        haveRecords ? (
          <h2 className={css.title}>Don't have record</h2>
        ) : (
          <h2 className={css.title}>Loading...</h2>
        )
      ) : (
        <CardList arr={record} />
      )}
    </div>
  );
}

export default HomeComp;
