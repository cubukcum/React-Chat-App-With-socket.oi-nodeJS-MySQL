import React from 'react'
import Header from '../components/Header/Header'

const LoginLayout = ({element}) => {
  return (
    <div>
      <Header />
      {element}
    </div>
  )
}

export default LoginLayout