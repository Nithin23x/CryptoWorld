import React from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../redux/slices/cryptoNewsAPI'
import { each } from 'chart.js/helpers'
import Loader from './Loader'

const {Text , Title} = Typography

const News = ({simplified}) => {

  const newsCount = simplified ? '5' : '30' 

  
   const {data:newsData , isLoading} = useGetNewsQuery(newsCount) 


  if(!newsData?.data) return <Loader /> 


  return (
    <Row gutter={[12,12]}>
      {
        newsData?.data.map(
          (eachNews,i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={eachNews.link} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                      <Title className='news-title' level={4} > {eachNews.title}</Title>
                      <img style={{maxWidth:'200px',maxHeight:'100px'}}  src={eachNews?.photo_url}  alt='news-image'/> 
                  </div>
                  <p>
                    Published Date : {moment(eachNews.published_datetime_utc).startOf('ss').fromNow()} 
                  </p>
                  
                </a>
              </Card>
            </Col>
          )
        )
      }

    </Row>
  )
}

export default News 