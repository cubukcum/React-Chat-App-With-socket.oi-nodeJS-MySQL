import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'
import { useEffect } from 'react';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const n = useNavigate();

useEffect(() =>{
  if (localStorage.getItem("currentUser")){
    n('/chat')
  }
},[])


  const login = () => {
    console.log(localStorage.getItem('currentUser'))
    setLoading(true)
    api.post("/login", {
      username: username,
      password: password,
    }).then(e => {
      console.log(e.status)
      if (e.status) {
        message.success(e?.data.message)
        localStorage.setItem("currentUser", e?.data.userId)
        n('/chat')
      }
    }).catch(e => {
      message.error("Wrong Username/Password" + e.message)
    }).finally(() => {
      console.log("basarili")
      setLoading(false)
    })
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='flex-container'>
      <Form
        name="basic"
        onFinish={login}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm