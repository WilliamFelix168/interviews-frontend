import React, { useEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/CloudUpload';
import { useForm } from 'react-hook-form';
import TextField from '../common/form/text';
import Dialog from '../dialog';
import styles from './upload.module.css';
import { useStateContext } from '../../context';

interface UploadContainerProps {
  img: string;
  setImg: (str: string) => void;
}

const UploadContainer: React.FC<UploadContainerProps> = (props: UploadContainerProps) => {
  const { img, setImg } = props;

  const input: any = useRef(null);

  function handleUploadImage(event: any) {
    const { files } = event.target;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        const imgs: any = new Image();
        imgs.src = fr.result;

        imgs.onload = function () {
          setImg(fr.result?.toString() || '');
        }
        imgs.remove();
      }
      fr.readAsDataURL(files[0]);
    }
  }

  function handleUploadClick() {
    if (input.current?.click) {
      input.current.click();
    }
  }

  return (
    <Box
      height={200}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      borderRadius={5}
      mb="1rem"
      style={{
        backgroundColor: '#F2F2F2',
        position: 'relative',
      }}
      className={styles.preview}
    >
      {img.length > 0
        ? <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleUploadClick}
            className={styles.changeBtn}
          >
            Change Photo
            </Button>
          <img src={img} alt="" width="100%" style={{ objectFit: 'cover' }} />
        </>
        : <>
          <UploadIcon />
          <Button onClick={handleUploadClick}>
              Upload here
          </Button>
        </>
      }
      <input type="file" onChange={handleUploadImage} accept="image/*" hidden ref={input} />
    </Box>
  )
}

interface UploadProps {
  open: boolean;
  onClose: () => void;
}

const Upload: React.FC<UploadProps> = (props: UploadProps) => {
  const { open, onClose } = props;

  const [, dispatch] = useStateContext();
  const [img, setImg] = useState('');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  useEffect(() => {
    if (open) {
      setImg('')
    }
  }, [open])

  function handleOnSubmit(values: Record<string, any>) {
    const products = JSON.parse(window.localStorage.getItem('products') || "[]");

    const input = {
      id: (products.length + 1).toString(),
      photo: img,
      ...values,
    }

    products.push(input);

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        value: products,
      }
    })

    alert('Product Uploaded!');

    window.localStorage.setItem('products', JSON.stringify(products));

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Upload'}
    >
      <React.Fragment>
        <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            name="name"
            type="text"
            label="Item Description"
            placeholder="type something"
            required
            control={control}
          />
          <TextField
            name="description"
            type="text"
            multiline
            label="Item Description"
            placeholder="type something"
            control={control}
          />
          <UploadContainer
            img={img}
            setImg={setImg}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </React.Fragment>
    </Dialog >
  )
}

export default Upload;
