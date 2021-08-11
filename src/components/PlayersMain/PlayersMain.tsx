import React from 'react';
import LocalDraftRepo from '../../repos/LocalDraftRepo';
import { PlayerModel } from '../../models/PlayerModel';
import PlayersService from '../../services/PlayersService';
import Player from '../Player';
import './PlayersMain.css';
import DraftRepo from '../../models/DraftRepo';
import { useState } from 'react';
import { useEffect } from 'react';

function PlayersMain(): JSX.Element {
  const [players, setPlayers,] = useState<PlayerModel[]>([]);
  const repo: DraftRepo = new LocalDraftRepo(); // TODO: make functional

  const getPlayers = async (): Promise<void> => {
    const players = await new PlayersService(repo).getPlayers(); // TODO: make functional
    setPlayers(players);
  };

  const createPlayerEls = (): JSX.Element[] => players.map((player) => {
    return (
      <div key={player.playerId}>
        <p>{player?.name}</p>
        <Player />
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
