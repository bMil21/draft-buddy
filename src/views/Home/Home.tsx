import React, { ReactElement } from 'react';
import PlayersMain from '../../components/PlayersMain';
import Sidebar1 from '../../components/Sidebar1';
import DraftRepoMap, { DraftRepoEnum } from '../../models/DraftRepoMap';
import EspnDraftRepo from '../../repos/EspnDraftRepo';
import PlayersService from '../../services/PlayersService';
import './Home.css';

interface HomeState {
  draftRepoName: DraftRepoEnum;
}

class Home extends React.Component {
  state: HomeState = {
    draftRepoName: DraftRepoEnum.espn,
  };

  handleChangeDraftRepo = (draftRepoName: DraftRepoEnum): void => {
    console.log(draftRepoName);
    const draftRepo = DraftRepoMap.get(draftRepoName);
    if (draftRepo) {
      this.setState({
        draftRepoName: draftRepoName,
      });
    } else {
      console.error('Unable to find draft repo.');
    }
  };

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
          playersService={new PlayersService(
            DraftRepoMap.get(this.state.draftRepoName) || new EspnDraftRepo()
          )}
          onChangeDraftRepo={this.handleChangeDraftRepo}
          draftRepoName={this.state.draftRepoName}
        />
      </div>
    );
  }
}

export default Home;
