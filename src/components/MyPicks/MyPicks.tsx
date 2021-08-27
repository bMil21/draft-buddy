import React from 'react';
import './MyPicks.css';

interface MyPicksProps {
  picks: number[];
}

function MyPicks(props: MyPicksProps): JSX.Element {
  // TODO: add input for user to insert 1st pick
  return (
    <div className="MyPicks">
      <strong>My Picks: </strong>
      {
        props.picks.map((pick, i) => {
          return <span key={i}>{pick}, </span>;
        })
      }
    </div>
  );
}

export default MyPicks;
