import React from 'react'

const ProfilUpdate = () => {
function update(e){
  e.preventDefault()
}

  return (
    <div>
      <form>
        <input placeholder='Username'></input>
        <input placeholder='E-mail'></input>
        <input placeholder='Password'></input>
        <input placeholder='Phone Number'></input>
        <button type='submit' onClick={update}> Save & Proceed </button>
      </form>
    </div>
  )
}

export default ProfilUpdate