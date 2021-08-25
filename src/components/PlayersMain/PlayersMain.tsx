import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import { IPlayersService } from '../../services/PlayersService';
import Player from '../Player';
import './PlayersMain.css';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PickCalculator from '../../utilities/pick-calculator';
import { DraftRepoEnum } from '../../models/DraftRepoMap';

interface PlayersMainProps {
  playersService: IPlayersService,
  onChangeDraftRepo: (draftRepoEnum: DraftRepoEnum) => void;
  draftRepoName: DraftRepoEnum;
}

function PlayersMain(props: PlayersMainProps): JSX.Element {
  const [players, setPlayers,] = useState<PlayerModel[]>([]);
  const myPicks = PickCalculator.getMyPicks(7, 14, 16, true);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChangeDraftRepo(event.target.value as DraftRepoEnum);
  };

  const getPlayers = async (): Promise<void> => {
    const players = await props.playersService.getPlayers();
    if (players && players.length > 0) setPlayers(players);
  };

  const togglePick = (pickedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      return (pickedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { picked: !pickedPlayer.picked, })
        : player;
    });
    setPlayers(updatedPlayers);
    props.playersService.savePlayers(updatedPlayers);
  };

  const toggleFave = (favedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      return (favedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { faved: !favedPlayer.faved, })
        : player;
    });
    setPlayers(updatedPlayers);
    props.playersService.savePlayers(updatedPlayers);
  };

  const resetPlayers = async (): Promise<void> => {
    const freshPlayers = await props.playersService.resetPlayers(players);
    setPlayers(freshPlayers);
    props.playersService.savePlayers(freshPlayers);
  };

  const checkIfItsMyPick = (currentPickIndex: number): number => {
    const foundPickIndex = myPicks.findIndex(myPick => (currentPickIndex + 1) === myPick);
    return (foundPickIndex !== -1) ? foundPickIndex + 1 : 0;
  };

  const updatePlayers = async (): Promise<void> => {
    const updatedPlayers = await props.playersService.updatePlayers();
    if (updatedPlayers && updatedPlayers.length > 0) setPlayers(updatedPlayers);
    props.playersService.savePlayers(updatedPlayers);
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

  // TODO: move buttons to own component
  return (
    <main className="PlayersMain">
      <FormControl variant="filled">
        <InputLabel id="demo-simple-select-filled-label">Source</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.draftRepoName}
          onChange={handleChange}
        >
          <MenuItem value={DraftRepoEnum.local}>Local</MenuItem>
          <MenuItem value={DraftRepoEnum.espn}>ESPN</MenuItem>
          <MenuItem value={DraftRepoEnum.ffballCalc}>FFball Calculator</MenuItem>
        </Select>
      </FormControl>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
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
          onClick={() => updatePlayers()}
        >
          Update
        </Button>
      </Box>
      <div className="Players">
        {players.map((player, index) =>
          <div key={player.num}>
            <Player
              player={player}
              pickNum={checkIfItsMyPick(index)}
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
