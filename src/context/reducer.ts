export interface PayloadProps {
  value: any;
}

export interface ActionProps {
  type: string;
  payload: PayloadProps;
}

export interface ProductProps {
  id: string;
  name?: string;
  description?: string;
  photo?: string;
}
export interface InitialValueProps {
  user: any;
  products: ProductProps[];
}

export const initialValue: InitialValueProps = {
  user: null,
  products: [],
}

function Reducer(
  state: InitialValueProps = initialValue,
  action: ActionProps
): InitialValueProps {
  switch (action.type) {
    case "SET_USER": {
      const { value } = action.payload;

      return {
        ...state,
        user: value
      }
    }

    case "SET_PRODUCTS": {
      const { value } = action.payload;

      return {
        ...state,
        products: value
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

export default Reducer;
