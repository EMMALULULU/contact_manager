import { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearchClicked: (searchKey: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchClicked
}) => {
  const [searchKey, setSearchKey] = useState("");
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'  }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Contacts"
        value={searchKey}
        onChange={(event) => setSearchKey(event.target.value)}
      />
      <IconButton onClick={() => onSearchClicked(searchKey)} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}


export default SearchBar;