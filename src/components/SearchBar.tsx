import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material';

export default function SearchBar({ sx }: { sx?: SxProps<Theme> }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');

  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', ...sx }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={query}
        placeholder="Search Contacts"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        endAdornment={
          query.length > 0 && (
            <IconButton
              onClick={() => {
                setQuery('');
                searchParams.delete('query');
                setSearchParams(searchParams);
              }}
            >
              <CloseIcon />
            </IconButton>
          )
        }
      />
      <IconButton
        onClick={() => {
          setSearchParams({ query });
        }}
        sx={{ p: '10px' }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
