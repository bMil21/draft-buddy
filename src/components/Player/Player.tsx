import { Card, Checkbox, IconButton } from '@material-ui/core';
import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import './Player.css';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

interface PlayerProps {
  player: PlayerModel;
  onPick: (player: PlayerModel) => void;
  onFave: (player: PlayerModel) => void;
}

function Player(props: PlayerProps): JSX.Element {
  const faveIcon = (props?.player?.faved)
    ? <StarIcon></StarIcon>
    : <StarBorderIcon></StarBorderIcon>;

  return (
    <div className="Player">
      <Card className="player-panel">
        <span><Checkbox
          checked={props?.player?.picked}
          onChange={() => props.onPick(props?.player)}></Checkbox>
        </span>
        <span className="player-num">{props?.player?.num}</span>
        <span className="player-name">{props?.player?.name}</span>
        <span className="player-pos">{props?.player?.position}</span>
        <span className="player-team">{props?.player?.team}</span>
        <span className="player-bye">{props?.player?.bye}</span>
        <span className="player-fave">
          <IconButton
            aria-label="favorite"
            onClick={() => props.onFave(props?.player)}
          >
            {faveIcon}
          </IconButton>
        </span>
      </Card>
    </div>
  );
}

export default Player;
