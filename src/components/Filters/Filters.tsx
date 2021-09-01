import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import React from 'react';
import './Filters.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PlayerModel, { PlayerModelProps } from '../../models/PlayerModel';

interface FiltersProps {
  filters: PlayerModelProps;
  onFilter: (key: keyof PlayerModel, value: PlayerModel[keyof PlayerModel]) => void;
  onRemoveFilters: () => void;
}

function Filters(props: FiltersProps): JSX.Element {
  return (
    <ButtonGroup className="filters-button-group" variant="contained" aria-label="Filters">

      <IconButton
        onClick={() => props.onFilter('picked', true)}
        color={(props.filters.get('picked') === true) ? 'primary' : 'default'}
      >
        <CheckBoxIcon></CheckBoxIcon>
      </IconButton>

      <IconButton
        onClick={() => props.onFilter('picked', false)}
        color={(props.filters.get('picked') === false) ? 'primary' : 'default'}
      >
        <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
      </IconButton>

      <Button
        onClick={() => props.onRemoveFilters()}
        color={(props.filters.size < 1) ? 'primary' : 'default'}
      >All</Button>

      <Button
        onClick={() => props.onFilter('position', 'QB')}
        color={(props.filters.get('position') === 'QB') ? 'primary' : 'default'}
      >QB</Button>

      <Button
        onClick={() => props.onFilter('position', 'RB')}
        color={(props.filters.get('position') === 'RB') ? 'primary' : 'default'}
      >RB</Button>

      <Button
        onClick={() => props.onFilter('position', 'WR')}
        color={(props.filters.get('position') === 'WR') ? 'primary' : 'default'}
      >WR</Button>

      <Button
        onClick={() => props.onFilter('position', 'TE')}
        color={(props.filters.get('position') === 'TE') ? 'primary' : 'default'}
      >TE</Button>

      <Button
        onClick={() => props.onFilter('position', 'DEF')}
        color={(props.filters.get('position') === 'DEF') ? 'primary' : 'default'}
      >DEF</Button>

      <Button
        onClick={() => props.onFilter('position', 'K')}
        color={(props.filters.get('position') === 'K') ? 'primary' : 'default'}
      >K</Button>

      <IconButton
        onClick={() => props.onFilter('faved', true)}
        color={(props.filters.get('faved') === true) ? 'primary' : 'default'}
      >
        <StarIcon></StarIcon>
      </IconButton>

      <IconButton
        onClick={() => props.onFilter('faved', false)}
        color={(props.filters.get('faved') === false) ? 'primary' : 'default'}
      >
        <StarBorderIcon></StarBorderIcon>
      </IconButton>

    </ButtonGroup>
  );
}

export default Filters;
