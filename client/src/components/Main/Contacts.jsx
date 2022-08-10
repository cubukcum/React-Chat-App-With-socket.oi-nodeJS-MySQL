import React, {useState, useEffect} from 'react'



const Contacts = ({data, currentUser, online}) => {
    const [userData, setUserData] = useState(null)
    
    useEffect(()=> {

        // const userId = data.members.find((id)=>id!==currentUser)
        const getUserData = async ()=> {
          try
          {
            //   const {data} =await getUser(userId)
            //  setUserData(data)

          }
          catch(error)
          {
            console.log(error)
          }
        }
    
        // getUserData();
      }, [])

    return (
        <>
      <div className="follower conversation">
        <div>
          {/* {online && <div className="online-dot"></div>} */}
          <img
            src="https://joeschmoe.io/api/v1/random"
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{data?.username} {data?.email}</span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
    )
}

export default Contacts