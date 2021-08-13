import React, { ReactElement } from 'react';
import PlayersMain from '../../components/PlayersMain';
import Sidebar1 from '../../components/Sidebar1';
import LocalDraftRepo from '../../repos/LocalDraftRepo';
import PlayersService from '../../services/PlayersService';
import './Home.css';

class Home extends React.Component {
  render(): ReactElement {
    return (
      // primary sidebar
      // - nav
      // main area
      // - players main
      //   - search
      //   - update button
      //   - filters
      //   - players list
      //     - players table header
      //     - players table body
      //       - player
      //         - my pick #
      //         - player panel
      // - secondary sidebar
      //   - player details
      <div className="Home">
        <Sidebar1 />
        <PlayersMain 
          playersService={new PlayersService(new LocalDraftRepo())} 
        />
      </div>
    );
  }
}

export default Home;
