import React from 'react'
import { Tabs } from 'antd';
import LoginForm from '../components/Login/LoginForm';
import Register from '../components/Register/Register';

const { TabPane } = Tabs;

const Login = () => {

  return (
    <div className='tabs'>

      <Tabs defaultActiveKey="1" >
        <TabPane tab="Sign In" key="1" className='login-items'>
          <LoginForm />
        </TabPane>
        <TabPane tab="Sign Up" key="2" className='login-items'>
          <Register />
        </TabPane>
      </Tabs>

    </div>
  )
}

export default Login