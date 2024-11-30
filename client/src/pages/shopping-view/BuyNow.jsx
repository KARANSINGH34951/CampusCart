import { useLocation } from "react-router-dom";

const BuyNow = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div className='bg-white'>
      <h1>Buy Now</h1>
      <img src={product.images} alt="productImg" />
      <p>Product Name: {product.name}</p>
      <p>Price: ₹{product.price}</p>
    
    </div>
  );
};

export default BuyNow;
