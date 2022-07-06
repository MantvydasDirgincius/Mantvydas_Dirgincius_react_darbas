import React from 'react';
import Card from './Card';

function CardList({ arr }) {
  return (
    <div className='card-list'>
      {arr.map((obj) => (
        <Card key={obj.id} title={obj.title} sub={obj.description} />
      ))}
    </div>
  );
}

export default CardList;
