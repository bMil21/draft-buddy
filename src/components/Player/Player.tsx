import { Card, CardContent, Checkbox } from '@material-ui/core';
import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import './Player.css';

interface PlayerProps {
  player: PlayerModel;
}

function Player(props: PlayerProps): JSX.Element {
  return (
    <div className="Player">
      <Card className="player-panel">
        <CardContent>
          <span><Checkbox checked={props?.player?.picked}></Checkbox></span>
          <span className="player-num">{props?.player?.num}</span>
          <span className="player-name">{props?.player?.name}</span>
          <span className="player-pos">{props?.player?.position}</span>
          <span className="player-team">{props?.player?.team}</span>
          <span className="player-bye">{props?.player?.bye}</span>
          {/* <span>fave</span> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Player;
