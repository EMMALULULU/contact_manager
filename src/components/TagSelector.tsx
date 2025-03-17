import * as React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import { Checkbox, IconButton, Paper, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
export interface TagSelectorProps {
  options: string[];
}

export default function TagSelector({ options: _options }: TagSelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = React.useState(
    searchParams.get('tags')?.split(',') ?? []
  );
  const options = useMemo(() => {
    return [...new Set(_options)].filter((option) => option?.length);
  }, [_options]);

  return (
    <Paper sx={{ minWidth: '20px', borderRadius: '24px' }}>
      <Select
        sx={{
          borderRadius: '24px',
        }}
        fullWidth
        multiple
        displayEmpty
        value={selectedTags}
        onChange={(event) => {
          const tag = event.target.value as string[];
          setSelectedTags(tag);
          searchParams.set('tags', tag.join(','));
          setSearchParams(searchParams);
        }}
        input={<OutlinedInput />}
        renderValue={() => {
          return `Tags ${
            selectedTags.length ? ': ' + selectedTags.join(', ') : ''
          }`;
        }}
        endAdornment={
          selectedTags.length ? (
            <IconButton
              onClick={() => {
                searchParams.delete('tags');
                setSearchParams(searchParams);
                setSelectedTags([]);
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : undefined
        }
      >
        {options.map((option) => (
          <MenuItem key={option + Math.random()} value={option}>
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {option}
              <Checkbox checked={selectedTags.includes(option)} />
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
}
