import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart); // access global state
  const dispatch = useDispatch();

  return (
    <div className="p-4 border mt-4">
      <h2 className="font-bold">🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} - ${item.price}</span>
            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
