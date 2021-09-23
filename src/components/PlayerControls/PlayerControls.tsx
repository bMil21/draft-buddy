import React from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { DraftRepoEnum } from '../../models/DraftRepoMap';
import ConfirmDialog from '../ConfirmDialog';
import { useState } from 'react';

interface PlayerControlsProps {
  draftRepoName: DraftRepoEnum;
  onChangeDraftRepo: (draftRepoName: DraftRepoEnum) => void;
  resetPlayers: () => Promise<void>;
  updatePlayers: () => Promise<void>;
}

function PlayerControls(props: PlayerControlsProps): JSX.Element {
  const [shouldShowResetDialog, setShouldShowResetDialog,] = useState<boolean>(false);

  const handleDraftRepoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChangeDraftRepo(event.target.value as DraftRepoEnum);
  };

  const openResetDialog = (): void => {
    setShouldShowResetDialog(true);
  };

  const closeResetDialog = (): void => {
    setShouldShowResetDialog(false);
  };

  const confirmReset = (): void => {
    props.resetPlayers();
    closeResetDialog();
  };

  const cancelReset = (): void => {
    closeResetDialog();
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
    >
      {shouldShowResetDialog === true
        ? <ConfirmDialog
          content='Are you sure you want to reset?'
          cancel={cancelReset}
          confirm={confirmReset}
        />
        : null
      }
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
        onClick={() => openResetDialog()}
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
