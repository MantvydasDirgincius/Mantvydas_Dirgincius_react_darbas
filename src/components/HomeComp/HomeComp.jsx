import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../store/authContext';
import { doGetRequest } from '../../utils';
import CardList from '../Card/CardList';
import css from './Home.module.css';

function HomeComp() {
  const [record, setRecord] = useState([]);
  const { token } = useContext(AuthContext);

  async function GetingRecords() {
    const records = await doGetRequest(
      'https://autumn-delicate-wilderness.glitch.me/v1/content/skills',
      token
    );
    console.log('records ===', records);
    setRecord(records);
  }

  useEffect(() => {
    GetingRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h1 className={css.title}>Home</h1>
      <CardList arr={record} />
    </div>
  );
}

export default HomeComp;
