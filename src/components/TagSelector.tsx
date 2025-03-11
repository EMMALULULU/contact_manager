import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag: string, tags: readonly string[], theme: Theme) {
  return {
    fontWeight: tags.includes(tag)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export interface TagSelectorProps {
  options: string[];
  selectedTags: string[];
  setSelectedTags: (event: SelectChangeEvent) => void;
}

const TagSelector: React.FC<TagSelectorProps>  = ({
  options,
  selectedTags, 
  setSelectedTags
}) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={selectedTags}
          onChange={setSelectedTags}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selectedTags.length === 0) {
              return <em>Show ALL</em>;
            }

            return selectedTags.join(', ');
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Show ALL</em>
          </MenuItem>
          {options.map((tagName) => (
            <MenuItem
              key={tagName}
              value={tagName}
              style={getStyles(tagName, selectedTags, theme)}
            >
              {tagName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TagSelector;