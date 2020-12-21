import React from 'react';
import Button from '@material-ui/core/Button';
import DropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import styles from './explore.module.css';
import { useHistory } from 'react-router';

const Explore: React.FC = () => {
  const history = useHistory();
  return (
    <Button
      size="small"
      className={styles.exploreButton}
      onClick={() => {
        history.push({
          pathname: '/explore'
        })
      }}
    >
      Explore
      <DropDownIcon />
    </Button>
  )
}

export default Explore;
