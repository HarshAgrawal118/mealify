import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/navBar/header/Header'
import ExploreMenu from '../../components/exploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import Appdown from '../../components/appdownload/Appdown';
export default function Home() {
  const [category , setCategory] = useState('all');
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <Appdown />
    </div>
  )
}
