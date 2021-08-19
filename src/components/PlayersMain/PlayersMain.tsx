import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import { IPlayersService } from '../../services/PlayersService';
import Player from '../Player';
import './PlayersMain.css';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, Divider } from '@material-ui/core';

interface PlayersMainProps {
  playersService: IPlayersService,
}

function PlayersMain(props: PlayersMainProps): JSX.Element {
  const [players, setPlayers,] = useState<PlayerModel[]>([]);

  const getPlayers = async (): Promise<void> => {
    const players = await props.playersService.getPlayers();
    setPlayers(players);
  };

  const togglePick = (pickedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      const picked = !pickedPlayer.picked;
      return (pickedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { picked, })
        : player;
    });
    setPlayers(updatedPlayers);
    props.playersService.savePlayers(updatedPlayers);
  };

  const toggleFave = (favedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      const faved = !favedPlayer.faved;
      return (favedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { faved, })
        : player;
    });
    setPlayers(updatedPlayers);
    props.playersService.savePlayers(updatedPlayers);
  };

  const resetPlayers = async (): Promise<void> => {
    const newPlayers = await props.playersService.resetPlayers();
    setPlayers(newPlayers);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  if (!players || players.length < 1) {
    return (
      <main className="PlayersMain">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="PlayersMain">
      <Box
        display="flex"
        flexDirection="row"
      >
        <Button
          startIcon={<RotateLeftIcon />}
          onClick={() => resetPlayers()}
        >
          Reset
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          startIcon={<CloudDownloadIcon />}
        >
          Update
        </Button>
      </Box>
      <div className="Players">
        {players.map((player) =>
          <div key={player.playerId}>
            <Player
              player={player}
              onPick={togglePick}
              onFave={toggleFave}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default PlayersMain;
