import Section from '@/components/Section/Section'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cart from '@/components/Cart/Cart'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products,setProducts]=useState([]);
  const setLocalData = ()=>{
    const cart = window.localStorage.getItem('cart-product');
    if(!cart){
      window.localStorage.setItem('cart-product',JSON.stringify([]));
    }
  }
  const getProduct = ()=>{
    const URL = "https://dummyjson.com/products"
    axios.get(URL)
    .then(response=>{
      setProducts(response.data.products)
    })
  }
  useEffect(()=>{
    getProduct();
    setLocalData();
  },[]);
  return (
    <main>
      <div className='lg:container mx-auto'>
      <Section sectionName='New Arrival' products={products}/>
      </div>
      <Cart/>
    </main>
  )
}
