import { Product } from "./types/types";
import ProductList from "./_components/ProductList";

export const revalidate = 0;

async function fetchProducts() {
  const response = await fetch('http://localhost:4444/products', {
    method: 'GET',
    headers: {
      'Accept': 'application/json', 
      'Cache-Control': 'no-cache', 
    },
    credentials: 'include', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json(); 
}

export default async function Home() {

  let products: Product[];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error(error);
    products = []; 
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
