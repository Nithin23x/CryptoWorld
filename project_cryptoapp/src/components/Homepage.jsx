import React from 'react' 
import millify from 'millify'
import {Typography,Row,Col,Statistic} from 'antd'
import { Link } from 'react-router-dom' 


import {Cryptocurrencies, News} from '../components'
import { useGetCryptosQuery } from '../redux/slices/cryptoAPI' 
import Loader from './Loader'


const {Title } = Typography 

const Homepage = () => {

  const {data , isFetching,isLoading} = useGetCryptosQuery(20)


  const globalStats = data?.data?.stats 


 if(isLoading ) return <Loader />


  return (

    <>
      <Title level={2} className='heading'> Global Crypto Stats</Title>
      {/* ant desing Row has 24 column space which occupies total width col-12 means half 
      of the width for each col   */}
      <Row>
        <Col span={12}> <Statistic title='Total Cryptocurrencies' value={globalStats.total } />  </Col>
        <Col span={12}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} />  </Col>
        <Col span={12}> <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} />  </Col>
        <Col span={12}> <Statistic title='Total 24H Volume' value={millify(globalStats.total24hVolume)} />  </Col>
        <Col span={12}> <Statistic title='Total Markets ' value={millify(globalStats.totalMarkets)} />  </Col>
      </Row>

      <div className='home-heading-container'>
        <Title level={2} className='home-title' >Top 10 Cryptocurrencies in World  </Title>

        <Title level={3} className='show-more'> <Link to='/cryptocurrencies'>Show More </Link></Title>
      </div>
      <Cryptocurrencies simplified /> 

      <div className='home-heading-container'>
        <Title level={2} >
          Crypto Latest  News 
        </Title>
        <Title level={3} className='show-more'> <Link to='/news'>Show More </Link></Title>
      </div>
      <News simplified  /> 
      

    </>
  )

}

export default Homepage