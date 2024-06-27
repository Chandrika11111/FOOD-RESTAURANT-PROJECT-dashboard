import React from 'react'

const FirmWelcome = () => {
  const firmName=localStorage.getItem('firmName')
  return (
    <div className='firmWelcome'>
      <h1>welcome {firmName},</h1>
      <h3>Add your Products to our Taste Heaven</h3>
      <div className="firmWelcomeImg">
        <img src='/assets/chef2.jpg'/>
      </div>
    </div>
  )
}

export default FirmWelcome