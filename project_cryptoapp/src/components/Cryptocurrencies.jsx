import React from 'react'
import { useState,useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card,Row, Col, Input  } from 'antd'


import { useGetCryptosQuery } from '../redux/slices/cryptoAPI'
import Loader from './Loader'

const Cryptocurrencies =({simplified}) => {  

    const count   = simplified ? 10 : 50 
    
    const {data : outData , isLoading , isFetching } = useGetCryptosQuery(count)  
    const [nithin, setNithin] = useState(null )    
    const [searchTerm , setSearchTerm ] = useState('') 

    useEffect(()=> {
       const filteredData = outData?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ) 
      setNithin(filteredData)

    } , [outData,searchTerm])
    
 
  if(isFetching) return <Loader /> 
   
  return (
    <>
    {
      !simplified && (<div className='search-crypto'>
      <Input placeholder='Search Currencies' onChange={ e => {setSearchTerm(e.target.value) } }  /> 
   </div>)
    }
     <Row gutter={[32,32]} className='crypto-card-container'>
         {
           nithin?.map(
             eachCrypto => (
               <Col xs={24} sm={12} lg={6} className='crypto-card' key={eachCrypto.uuid}>
                 <Link to={`/crypto/${eachCrypto.uuid}`}>
                     <Card title={`${eachCrypto.rank} ${eachCrypto.name}`} hoverable extra={<img className='crypto-image' src={eachCrypto.iconUrl}/> }>
                         <p>Price :{millify(eachCrypto.price)} </p>
                         <p>Market Cap : {millify(eachCrypto.marketCap)} </p>
                     </Card>
                 </Link>
               </Col>
             )
           )
         }
     </Row>
    </>
  )
}

export default Cryptocurrencies