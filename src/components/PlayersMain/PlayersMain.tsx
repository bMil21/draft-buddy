import React from 'react';
import PlayerModel from '../../models/PlayerModel';
import PlayersService, { IPlayersService } from '../../services/PlayersService';
import Player from '../Player';
import './PlayersMain.css';
import { useState } from 'react';
import { useEffect } from 'react';
import PickCalculator from '../../utilities/pick-calculator';
import DraftRepoMap, { DraftRepoEnum } from '../../models/DraftRepoMap';
import PlayerControls from '../PlayerControls';
import EspnDraftRepo from '../../repos/EspnDraftRepo';
import MyPicks from '../MyPicks';

function PlayersMain(): JSX.Element {
  const [draftRepoName, setDraftRepoName,] = useState<DraftRepoEnum>(DraftRepoEnum.espn);
  const [playersService, setPlayersService,] = useState<IPlayersService>(
    new PlayersService(DraftRepoMap.get(draftRepoName) || new EspnDraftRepo())
  );
  const [players, setPlayers,] = useState<PlayerModel[]>([]);
  const myPicks = PickCalculator.getMyPicks(7, 14, 16, true);

  const getPlayers = async (): Promise<void> => {
    const players = await playersService.getPlayers();
    if (players && players.length > 0) setPlayers(players);
  };

  const togglePick = (pickedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      return (pickedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { picked: !pickedPlayer.picked, })
        : player;
    });
    setPlayers(updatedPlayers);
    playersService.savePlayers(updatedPlayers);
  };

  const toggleFave = (favedPlayer: PlayerModel): void => {
    const updatedPlayers = players.map((player) => {
      return (favedPlayer.playerId === player.playerId)
        ? Object.assign({}, player, { faved: !favedPlayer.faved, })
        : player;
    });
    setPlayers(updatedPlayers);
    playersService.savePlayers(updatedPlayers);
  };

  const resetPlayers = async (): Promise<void> => {
    const freshPlayers = await playersService.resetPlayers(players);
    setPlayers(freshPlayers);
    playersService.savePlayers(freshPlayers);
  };

  const checkIfItsMyPick = (currentPickIndex: number): number => {
    const foundPickIndex = myPicks.findIndex(myPick => (currentPickIndex + 1) === myPick);
    return (foundPickIndex !== -1) ? foundPickIndex + 1 : 0;
  };

  const updatePlayers = async (): Promise<void> => {
    const updatedPlayers = await playersService.updatePlayers();
    if (updatedPlayers && updatedPlayers.length > 0) setPlayers(updatedPlayers);
    playersService.savePlayers(updatedPlayers);
  };

  const changeDraftRepo = (draftRepoName: DraftRepoEnum): void => {
    console.log(draftRepoName);
    const draftRepo = DraftRepoMap.get(draftRepoName);
    if (draftRepo) {
      setDraftRepoName(draftRepoName);
      setPlayersService(new PlayersService(draftRepo));
    } else {
      console.error('Unable to find draft repo.');
    }
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
      <PlayerControls
        draftRepoName={draftRepoName}
        onChangeDraftRepo={changeDraftRepo}
        updatePlayers={updatePlayers}
        resetPlayers={resetPlayers}
      />
      <MyPicks picks={myPicks} />
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
