import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import React from 'react';
import './Filters.css';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { PlayerModelProp } from '../../models/PlayerModel';

interface FiltersProps {
  onFilter: (playerModelProp: PlayerModelProp) => void;
  onRemoveFilters: () => void;
}

function Filters(props: FiltersProps): JSX.Element {
  return (
    <ButtonGroup className="filters-button-group" variant="contained" aria-label="Filters">
      <Button onClick={() => props.onRemoveFilters()}>All</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'QB', })}>QB</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'RB', })}>RB</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'WR', })}>WR</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'TE', })}>TE</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'DEF', })}>DEF</Button>
      <Button onClick={() => props.onFilter({ key: 'position', value: 'K', })}>K</Button>
      <IconButton onClick={() => props.onFilter({ key: 'faved', value: true, })}>
        <StarIcon></StarIcon>
      </IconButton>
      <IconButton onClick={() => props.onFilter({ key: 'faved', value: false, })}>
        <StarBorderIcon></StarBorderIcon>
      </IconButton>
    </ButtonGroup>
  );
}

export default Filters;
