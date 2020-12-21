import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import styles from './list.module.css';
import Detail from '../../components/product/detail';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from 'react-router';
import { useStateContext } from '../../context';
import { ProductProps } from '../../context/reducer';

interface ListItemProps extends ProductProps {
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { name, photo, onClick } = props;
  return (
    <Grid item md={4} lg={4} xs={4} onClick={onClick}>
      <Box className={styles.listItem}>
        <Box width="100%" className={styles.listItemImg}>
          <img src={photo} width="100%" alt="" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          p={1}
        >
          <Typography>
            {name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}

const List: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const history = useHistory();

  const [{ products }, dispatch] = useStateContext();

  useEffect(() => {
    const savedProducts = JSON.parse(window.localStorage.getItem('products') || "[]");

    if (savedProducts.length > 0) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          value: savedProducts,
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Grow
          in={!!urlParams.get('search')}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.searchResult}>
            <Typography variant="h4" gutterBottom>
              {`Results for "${urlParams.get('search')}"`}
            </Typography>
          </div>
        </Grow>
        <Grid container spacing={2} className={styles.list}>
          {
            (products.length === 0)
              ? (
                <Grid item md={true} xs={true}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <CancelIcon style={{ fontSize: 32, marginBottom: '1rem' }} color="action" />
                    <Typography align="center" variant="h4">No Products Found</Typography>
                  </Box>
                </Grid>
              )
              : products.filter(
                row => row.name?.toLocaleLowerCase().includes(urlParams.get('search')?.toLocaleLowerCase() || '')
              ).map((row, key) => (
                <ListItem
                  key={key}
                  id={row.id}
                  name={row.name}
                  photo={row.photo} 
                  onClick={() => {
                    urlParams.set('product', row.id.toString());
                    history.push({
                      search: urlParams.toString(),
                    })
                  }}
                />
              ))
          }
        </Grid>
      </div>
      <Detail />
    </div>
  )
}

export default List;
