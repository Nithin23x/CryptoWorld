import React,{useState} from 'react'
import HTMLReactParser from 'html-react-parser/lib/index'
import { useParams } from 'react-router-dom'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import millify from 'millify'
import { Col,Row,Typography,Select, Collapse } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery , useGetCoinHistoryQuery} from '../redux/slices/cryptoAPI'
import LineChart from './LineChart'
import Loader from './Loader'

const {Title , Text } = Typography
const {Option} =Select 


const CryptoCoinDetails = () => {
  const{coinId} = useParams()
  const {data , isLoading} = useGetCryptoDetailsQuery(coinId)
  const [timeHistory, setTimeHistory] = useState('7d') 
  const{data:coinHistory  , isFetching} = useGetCoinHistoryQuery({coinId, timeHistory})
  const cryptoDetails = data?.data?.coin 

 

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
   { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.supplyAt ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if(isLoading) return  <Loader /> 

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name}- ({cryptoDetails?.symbol})  Price 
        </Title>
        <p>
          {cryptoDetails?.name} Live price in U.S 
          
        </p>
      </Col> 
      <Select defaultValue='7d' value={timeHistory} className='select-timeperiod' 
      placeholder='Select Time Period'
      onChange={(value) => setTimeHistory(value)}>
          {
            time.map(
              date  => <Option key={date}></Option>
            )
          }
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)}  coinName={cryptoDetails?.name}  /> 

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={2} className='coin-details-heading'>{cryptoDetails?.name} Value Statistics</Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name}
            </p>
          </Col>
          {
            stats.map(({icon ,title,value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'> 
                <Text >{icon } </Text>
                <Text> {title} </Text>
            </Col>
            <Text className='stats'> {value}</Text>
            </Col>)
          )}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={2} className='coin-details-heading'>Other  Statistics {cryptoDetails?.name}</Title>
            
          </Col>
          {
            genericStats.map(({icon ,title,value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'> 
                <Text >{icon } </Text>
                <Text> {title} </Text>
            </Col>
            <Text className='stats'> {value}</Text>
            </Col>)
          )}
        </Col>
      </Col>

        <Col className='coin-desc-link'>
          <Col className='coin-links'>
            <Title level={3} className='coin-details-heading'> {cryptoDetails?.name} Links  </Title>
            {
              cryptoDetails?.links.map(
                link => (
                  <Row className='coin-link'  key={link.name} >
                      <Title level={5} className='link-name'> {link.type}</Title>
                      <a href={link.url} target='_blank' rel='noreferrer'>
                           {link.name}
                      </a>
                  </Row>
                )
              )
            }

          </Col>
        </Col>
    </Col>
  )
}

export default CryptoCoinDetails