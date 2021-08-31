import { Card, Checkbox, IconButton } from '@material-ui/core';
import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import './Player.css';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import classNames from 'classnames';

interface PlayerProps {
  player: PlayerModel;
  pickNum?: number;
  onPropChange: (player: PlayerModel, prop: keyof PlayerModel) => void;
}

function Player(props: PlayerProps): JSX.Element {
  const pickNumEl = (props.pickNum)
    ? <span>pick<br />#{props.pickNum}</span>
    : null;
  const faveIcon = (props?.player?.faved)
    ? <StarIcon></StarIcon>
    : <StarBorderIcon></StarBorderIcon>;

  return (
    <div className="Player">
      <div className="pick-indicator">{pickNumEl}</div>
      <Card className={classNames('player-panel', { picked: props.player.picked, })}>
        <span><Checkbox
          checked={props?.player?.picked}
          onChange={() => props.onPropChange(props?.player, 'picked')}></Checkbox>
        </span>
        <span className="player-num">{props?.player?.num}</span>
        <span className="player-name">{props?.player?.name}</span>
        <span className="player-pos">{props?.player?.position}</span>
        <span className="player-team">{props?.player?.team}</span>
        <span className="player-bye">{props?.player?.bye || '-'}</span>
        <span className={classNames('player-fave', { faved: props.player.faved, })}>
          <IconButton
            aria-label="favorite"
            onClick={() => props.onPropChange(props?.player, 'faved')}
          >
            {faveIcon}
          </IconButton>
        </span>
      </Card>
    </div>
  );
}

export default Player;
