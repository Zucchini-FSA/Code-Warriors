import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function DifficultyFilter(props) {
  const { handleChange, difficulty } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="controlled-open-select-label">
          Difficulty
        </InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={difficulty}
          onChange={handleChange}
        >
          <MenuItem value={''} selected>All</MenuItem>
          <MenuItem value={'Easy'}>Easy</MenuItem>
          <MenuItem value={'Hard'}>Hard</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
