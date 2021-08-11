import React, { ReactElement } from 'react';

class Player extends React.Component {
  render(): ReactElement {
    return (
      <div className="Player">
        <div className="player-panel">
          <span>chbx</span>
          <span>number</span>
          <span>name</span>
          <span>pos</span>
          <span>team</span>
          <span>bye</span>
          <span>fave</span>
        </div>
      </div>
    );
  }
}

export default Player;
