// import { Col, Row } from 'antd'
// import React,{useState} from 'react'
// import Contact from '../components/Main/Contact'
// import MessageBar from '../components/Main/MessageBar'
// import Settings from '../components/Main/Settings'
// import { MyContext } from '../context'



// const Main = () => {
//   const [currentUser,setCurrentUser] = useState(null)
//   const [selectedUser,setSelectedUser] = useState(null)

//   return (
//       <MyContext.Provider value={{currentUser,setCurrentUser,selectedUser,setSelectedUser}}>
//     <div>
//         <Row>
//         <Col lg={9}>
//             <Contact />
//         </Col>
//         <Col lg={13}>
//             <MessageBar />
//         </Col>
//         </Row>
//     </div>
//         </MyContext.Provider>
//   )
// }
import React from 'react'
// import MainScreen from '../components/Main/MainScreen'
import Chat from '../components/Main/Chat'


const Main =()=>{
    return(
        <Chat />
    )
}

export default Main