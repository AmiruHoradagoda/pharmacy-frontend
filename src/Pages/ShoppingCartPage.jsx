import React from "react";

const ShoppingCartPage = ({
  cartItems,
  onRemoveItem,
  onEmptyCart,
  onIncrementItem,
  onDecrementItem,
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const total = calculateTotal();
  const shipping = total > 0 ? 480 : 0; // Add your own shipping calculation logic here
  const grandTotal = total + shipping;

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Shopping Cart</h1>
      <div className="flex justify-between">
        <div className="w-2/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">
            Shopping Cart [ Items: {cartItems.length} ]
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Subtotal</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.productName}</td>
                  <td className="p-2 border">
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                        onClick={() => onIncrementItem(item.id)}
                      >
                        +
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                        onClick={() => onDecrementItem(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border">{item.price.toFixed(2)}</td>
                  <td className="p-2 border">
                    {(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            onClick={onEmptyCart}
          >
            Empty Cart
          </button>
        </div>
        <div className="w-1/3 p-4 border">
          <h2 className="mb-4 text-2xl font-bold">Cart Totals</h2>
          <div className="flex justify-between mb-2">
            <span>Total w/o Tax</span>
            <span>{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping *</span>
            <span>{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 font-bold">
            <span>Grand Total</span>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
          <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
