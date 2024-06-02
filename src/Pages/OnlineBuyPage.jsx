import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    productName: "Product 1",
    price: 29.99,
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    productName: "Product 2",
    price: 49.99,
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    productName: "Product 3",
    price: 19.99,
  },
  {
    id: 4,
    imageUrl: "https://via.placeholder.com/150",
    productName: "Product 4",
    price: 39.99,
  },
  {
    id: 5,
    imageUrl: "https://via.placeholder.com/150",
    productName: "Product 5",
    price: 59.99,
  },
];

const OnlineBuyPage = ({ cartItems, setCartItems }) => {
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">Online Buy</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            imageUrl={item.imageUrl}
            productName={item.productName}
            price={item.price}
            addToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default OnlineBuyPage;
