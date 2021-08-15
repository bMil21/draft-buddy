import React, { ReactElement } from 'react';
import './Nav.css';
import HomeIcon from '@material-ui/icons/Home';

class Nav extends React.Component {
  render(): ReactElement {
    return (
      <div className="Nav">
        <button>
          <HomeIcon className="icon" />
          <span className="txt">Home</span>
        </button>
      </div>
    );
  }
}

export default Nav;
