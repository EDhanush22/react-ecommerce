import axios from 'axios';
import { useEffect,useState } from 'react';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductsGrid';
import "./HomePage.css";

export const HomePage = ({cart}) => {
  const [products, setProduts] = useState([]);

  useEffect(() => {
    axios.get ('/api/products')
      .then((response) => {
        setProduts(response.data);
      });
  },[]);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page"> 
        <ProductsGrid products={products}/>
      </div>
    </>
  );
};
