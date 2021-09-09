import React from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { DraftRepoEnum } from '../../models/DraftRepoMap';

interface PlayerControlsProps {
  draftRepoName: DraftRepoEnum;
  onChangeDraftRepo: (draftRepoName: DraftRepoEnum) => void;
  resetPlayers: () => Promise<void>;
  updatePlayers: () => Promise<void>;
}

function PlayerControls(props: PlayerControlsProps): JSX.Element {
  const handleDraftRepoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChangeDraftRepo(event.target.value as DraftRepoEnum);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
    >
      <FormControl>
        <InputLabel id="demo-simple-select-filled-label">Source</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.draftRepoName}
          onChange={handleDraftRepoChange}
        >
          <MenuItem value={DraftRepoEnum.local}>Local</MenuItem>
          <MenuItem value={DraftRepoEnum.espn}>ESPN</MenuItem>
          <MenuItem value={DraftRepoEnum.ffballCalc}>FFball Calculator</MenuItem>
        </Select>
      </FormControl>
      <Divider orientation="vertical" flexItem />
      <Button
        color="secondary"
        startIcon={<RotateLeftIcon />}
        onClick={() => props.resetPlayers()}
      >
        Reset
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button
        color="secondary"
        startIcon={<CloudDownloadIcon />}
        onClick={() => props.updatePlayers()}
      >
        Update
      </Button>
    </Box>
  );
}

export default PlayerControls;
