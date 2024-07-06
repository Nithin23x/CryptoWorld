import React from 'react'
import { Routes,Route,Link  } from 'react-router-dom'
import{ Layout , Typography, Space} from 'antd'


import { Navbar,Homepage,Exchanges,CryptoCoinDetails,Cryptocurrencies,News } from './components'
import './App.css'


const App = () => {

    

  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar /> 
           
        </div>

        <div className='main'>
            <Layout>
                <div className='routes'>
                    <Routes> 
                        <Route exact path='/' element={<Homepage /> } />
                        <Route path='/exchanges' element={<Exchanges />}/>
                        <Route  path='/cryptocurrencies' element={<Cryptocurrencies /> } /> 
                        <Route path='/crypto/:coinId' element={<CryptoCoinDetails/> } /> 
                        <Route path='/news' element={<News /> } /> 
                    </Routes>
                </div>
            </Layout>

            <div className='footer'> 
                <Typography.Title level={5} style={{color:'lightpink', textAlign:'center'}} >
                    Crypto World <br /> 
                    All Rights Marked 
                </Typography.Title>
                <Space>
                    <Link to='/'> Home </Link>
                    <Link to='/exchanges'> Exchanges  </Link>
                    <Link to='/news'> News  </Link>
                </Space>
            </div>
        </div>
    </div>
  )
}

export default App

