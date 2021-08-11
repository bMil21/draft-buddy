import React, { ReactElement } from 'react';
import Nav from '../Nav';
import './Sidebar1.css';

class Sidebar1 extends React.Component {
  render(): ReactElement {
    return (
      <div className="Sidebar1">
        <Nav />
      </div>
    );
  }
}

export default Sidebar1;
