import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router';
import ShareIcon from '@material-ui/icons/Share';
// import styles from './detail.module.css';
import { ProductProps } from '../../../context/reducer';
import { useStateContext } from '../../../context';
import { TextField } from '@material-ui/core';
import Link from '../link';

const Detail: React.FC = () => {

  const history = useHistory();

  const location = useLocation()

  const [{ products }] = useStateContext();

  const [open, setOpen] = useState(false);

  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const productId = urlParams.get('product');
    const findedProduct = products.find(row => row.id === productId);

    if (findedProduct) {
      setProduct(findedProduct);
    } else {
      setProduct(null);
    }

  }, [location.search, products]);

  function handleClose() {
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete('product');
    history.push({
      search: urlParams.toString(),
    })
  }

  function handleCloseLink() {
    setOpen(false);
  }

  return (
    <Dialog
      open={!!product}
      fullWidth
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogContent>
        <Box display="flex">
          <Box display="flex" flex="65" flexDirection="column">
            <Box width="100%" borderRadius={8} overflow="hidden">
              <img width="100%" style={{ objectFit: 'contain' }} src={product?.photo} alt="" />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="1rem"
            >
              <Typography variant="h3">
                {product?.name}
              </Typography>
              <Button onClick={() => setOpen(true)}>
                <ShareIcon fontSize="small" />
                <span style={{ marginLeft: '.5rem' }}>Share for 3D Model</span>
              </Button>
            </Box>
          </Box>
          <Box flex="35" padding="1rem" pr="0" pt="0">
            <TextField
              fullWidth
              size="small"
              disabled
              multiline
              InputProps={{
                style: {
                  fontSize: 14
                }
              }}
              rowsMax={15}
              value={product?.description}
            />
          </Box>
        </Box>
      </DialogContent>
      <Link
        open={open}
        onClose={handleCloseLink}
      />
    </Dialog>
  )
}

export default Detail;
