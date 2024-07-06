import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import { Ticks, scales } from 'chart.js'

const { Title, Text } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log(coinHistory)
  const coinPrice = []
  const coinTimeStamp = []
  

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString() ) 
  }

  // const data = {
  //   labels : coinTimeStamp , 
  //   datasets :[
  //     {label : "Price In USD ",
  //     data : coinPrice,
  //     fill :'false',
  //     backgroundColor : '#0071bd',
  //     borderColor : '#0071bd'
  //   }

  //   ]
  // }

  // const options ={
  //   scales:{
  //     yAxes :[
  //       {
  //         Ticks :{
  //           beginAtZero : true
  //         }
  //       }
  //     ]
  //   }
  // }

  console.log(coinPrice)
  console.log(coinTimeStamp)

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'> {coinName} Price Chart  </Title>
        <Col className='price-container'>
          <Title level={4} className='price-change'>Change: <span style={{color:'#34a5eb'}}>{coinHistory?.data?.change} %</span></Title>
          <Title level={4} className='current-price'> Current {coinName} Price: <span style={{color:'#34a5eb'}}>{currentPrice}$</span>  </Title>
        </Col>
      </Row>
     
    </>
  )
}

export default LineChart