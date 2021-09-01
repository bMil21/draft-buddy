import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import React from 'react';
import './Filters.css';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PlayerModel from '../../models/PlayerModel';

interface FiltersProps {
  onFilter: (key: keyof PlayerModel, value: PlayerModel[keyof PlayerModel]) => void;
  onRemoveFilters: () => void;
}

function Filters(props: FiltersProps): JSX.Element {
  return (
    <ButtonGroup className="filters-button-group" variant="contained" aria-label="Filters">
      <Button onClick={() => props.onRemoveFilters()}>All</Button>
      <Button onClick={() => props.onFilter('position', 'QB')}>QB</Button>
      <Button onClick={() => props.onFilter('position', 'RB')}>RB</Button>
      <Button onClick={() => props.onFilter('position', 'WR')}>WR</Button>
      <Button onClick={() => props.onFilter('position', 'TE')}>TE</Button>
      <Button onClick={() => props.onFilter('position', 'DEF')}>DEF</Button>
      <Button onClick={() => props.onFilter('position', 'K')}>K</Button>
      <IconButton onClick={() => props.onFilter('faved', true)}>
        <StarIcon></StarIcon>
      </IconButton>
      <IconButton onClick={() => props.onFilter('faved', false)}>
        <StarBorderIcon></StarBorderIcon>
      </IconButton>
    </ButtonGroup>
  );
}

export default Filters;
