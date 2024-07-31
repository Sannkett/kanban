import React from 'react'
// import inProgress from '../icons_FEtask/inProgress.svg';
// import LowPriority from '../icons_FEtask/LowPriority.svg';

export default function Cards(props) {

  return (

    <div className='card'>

      <div className="card-content">
        <p className='cam-para'>{props.id}</p>
        {/* <img src={inProgress} alt="" /> */}
        <span>{props.title}</span>

        <div className='card-tag'>
          <p className='cam-para'>Feature Request</p>
        </div>
      </div>

    </div>
  )
}
