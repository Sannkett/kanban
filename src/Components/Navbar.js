import React from 'react'
import Display from '../icons_FEtask/Display.svg';
import down from '../icons_FEtask/down.svg';


export default function Navbar({ grouping, setGrouping, ordering, setOrdering }) {

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
  };
  return (
    <div className='nav'>


      <div className="dropdown">

        <button className="display">
          <img src={Display} alt="" />
          <span className='display-para'>Display</span>
          <img src={down} alt="" />
        </button>

        <div className="dropdown-menu">

          <div className="grouping same">
            <span>Grouping</span>
            <select className='status-btn btn' value={grouping} onChange={handleGroupingChange}>
              <option>Status</option>
              <option>User</option>
              <option>Priority</option>
            </select>
          </div>

          <div className="ordering same">
            <span>Ordering</span>
            <select className='status-btn btn' value={ordering} onChange={handleOrderingChange}>
              <option>Based on Priority</option>
              <option>Based on Title</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  )
}
