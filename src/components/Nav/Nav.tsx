import React, { ReactElement } from 'react';
import { FaHome } from 'react-icons/fa';
import './Nav.css';

class Nav extends React.Component {
  render(): ReactElement {
    return (
      <div className="Nav">
        <button>
          <FaHome className="icon" />
          <span className="txt">Home</span>
        </button>
      </div>
    );
  }
}

export default Nav;
