import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { useForm } from 'react-hook-form';
import TextField from '../../common/form/text';
import { useHistory } from 'react-router';

const SearchBar: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    }
  });

  const history = useHistory();

  function handleOnSubmit(values: Record<string, any>) {
    history.push({
      pathname: '/explore',
      search: `search=${values.search.toLowerCase()}`,
    })
  }

  return (
    <Box
      flexGrow={1}
    >
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <TextField
          noMarginBottom
          name="search"
          type="text"
          required
          control={control}
          placeholder="Search 3D Models"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="disabled" />
              </InputAdornment>
            )
          }}
        />
      </form>
    </Box>
  )
}

export default SearchBar;
