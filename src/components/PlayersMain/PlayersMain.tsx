import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import { IPlayersService } from '../../services/PlayersService';
import Player from '../Player';
import './PlayersMain.css';
import { useState } from 'react';
import { useEffect } from 'react';

interface PlayersMainProps {
  playersService: IPlayersService,
}

function PlayersMain(props: PlayersMainProps): JSX.Element {
  const [players, setPlayers,] = useState<PlayerModel[]>([]);

  const getPlayers = async (): Promise<void> => {
    const players = await props.playersService.getPlayers();
    setPlayers(players);
  };

  const createPlayerEls = (): JSX.Element[] => players.map((player) => {
    return (
      <div key={player.playerId}>
        <Player player={player} />
      </div>
    );
  });

  useEffect(() => {
    getPlayers();
  });

  if (!players || players.length < 1) {
    return (
      <main className="PlayersMain">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="PlayersMain">
      <div className="Players">{createPlayerEls()}</div>
    </main>
  );
}

export default PlayersMain;
