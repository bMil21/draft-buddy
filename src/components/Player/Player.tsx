import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import './Player.css';

interface PlayerProps {
  player: PlayerModel;
}

function Player(props: PlayerProps): JSX.Element {
  return (
    <div className="Player">
      <div className="player-panel">
        {/* <span>chbx</span> */}
        <span className="player-num">{props?.player?.num}</span>
        <span className="player-name">{props?.player?.name}</span>
        <span className="player-pos">{props?.player?.position}</span>
        {/* <span>team</span> */}
        {/* <span>bye</span> */}
        {/* <span>fave</span> */}
      </div>
    </div>
  );
}

export default Player;
