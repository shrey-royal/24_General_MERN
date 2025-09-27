import { useDispatch } from "react-redux";
import { addItem } from "./cartSlice";

function Product({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-2 m-2">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button
        className="bg-blue-500 text-white p-1"
        onClick={() => dispatch(addItem(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
