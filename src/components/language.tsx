import { FC } from 'react';

//export const Language: FC = () => {
//  return (
//    <>
//      <div className="language">language</div>
//    </>
//  );
//};

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#bb4996',
    },
  },
});

export const Language: FC = () => {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 80, height: 20, color: '#fff' }}>
        <FormControl>
          <InputLabel sx={{ color: '#fff' }} id="demo-simple-select-label">
            Lang
          </InputLabel>
          <Select
            sx={{ minWidth: 80, height: 30, border: '#bb4996 solid 2px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={handleChange}
          >
            <MenuList
              sx={{
                backgroundColor: '#3f1e47',
                padding: 0,
                border: '#bb4996 solid 2px',
                color: '#fff',
              }}
            >
              <MenuItem sx={{ color: '#fff' }} value={10}>
                Eng
              </MenuItem>
              <MenuItem value={20}>Ukr</MenuItem>
              <MenuItem value={30}>Rus</MenuItem>
            </MenuList>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};
