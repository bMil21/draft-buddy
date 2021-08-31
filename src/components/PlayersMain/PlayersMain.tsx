import React from 'react';
import PlayerModel, { PlayerModelProp } from '../../models/PlayerModel';
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
import Filters from '../Filters';
import { Box } from '@material-ui/core';
import FilterService from '../../services/FilterService';

function PlayersMain(): JSX.Element {
  const [draftRepoName, setDraftRepoName,] = useState<DraftRepoEnum>(DraftRepoEnum.espn);
  const [playersService, setPlayersService,] = useState<IPlayersService>(
    new PlayersService(DraftRepoMap.get(draftRepoName) || new EspnDraftRepo())
  );
  const [players, setPlayers,] = useState<PlayerModel[]>([]);
  const [playersToShow, setPlayersToShow,] = useState<PlayerModel[]>(players);
  const [filters, setFilters,] = useState<Set<PlayerModelProp>>(new Set<PlayerModelProp>());
  const myPicks = PickCalculator.getMyPicks(7, 14, 16, true);

  const getPlayers = async (): Promise<void> => {
    const players = await playersService.getPlayers();
    if (players && players.length > 0) setPlayers(players);
  };

  const togglePlayerProp = (player: PlayerModel, playerProp: keyof PlayerModel): void => {
    const updatedPlayers = playersService.togglePlayerProp(players, player, playerProp);
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

  const handleFilter = (playerProp: PlayerModelProp): void => {
    // TODO: rather than filter players, save filters set
    // players can be filtered in useEffect then
    const newFilters = filters.add(playerProp);
    setFilters(newFilters);
    refinePlayers(players);
  };

  const removeFilters = (): void => {
    setFilters(new Set());
  };

  const refinePlayers = (players: PlayerModel[]): void => {
    let refinedPlayers = players;
    // if search
    // - refinedPlayers = searchPlayers(refinedPlayers)

    console.log('Refine > Filters', filters.size, filters);

    // Filter, if necessary
    refinedPlayers = (filters.size > 0)
      ? FilterService.filterPlayers2(players, filters)
      : refinedPlayers;
    setPlayersToShow(refinedPlayers);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    refinePlayers(players);
  }, [players, filters,]);

  if (!players || players.length < 1) {
    return (
      <main className="PlayersMain">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="PlayersMain">
      <header className="players-header">
        <Box display="flex" alignItems="center" flexDirection="row">
          <Box>
            <Filters
              onFilter={handleFilter}
              onRemoveFilters={removeFilters}
            />
          </Box>
          <Box marginLeft="auto">
            <PlayerControls
              draftRepoName={draftRepoName}
              onChangeDraftRepo={changeDraftRepo}
              updatePlayers={updatePlayers}
              resetPlayers={resetPlayers}
            />
          </Box>
        </Box>
        <MyPicks picks={myPicks} />
      </header>
      <section className="Players">
        {playersToShow.map((player, index) =>
          <div key={`${player.num}${player.name}`}>
            <Player
              player={player}
              pickNum={checkIfItsMyPick(index)}
              onPropChange={togglePlayerProp}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default PlayersMain;
