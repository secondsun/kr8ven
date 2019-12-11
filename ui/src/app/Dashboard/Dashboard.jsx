import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { getRepositories } from '../../actions/actions';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  DataList,
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListCheck,
  DataListItemCells,
  DataListAction
} from '@patternfly/react-core';

const Dashboard = (props) => {

  if (!props.repositories || props.repositories.length == 0) {
    props.load();
  } else {
  }

  const repositories = props.repositories;

  return (
    <PageSection>
      <Title size="lg">
        Repositories 
      </Title>
      <DataList aria-label="list of repositories">
        {
          repositories.map((repo) => (
             <DataListItem aria-labelledby="simple-item1">
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="identifier">
                      <span id="simple-item1">{repo.identifier}</span>
                    </DataListCell>,
                    <DataListCell key="name">
                      <span id="simple-item1">{repo.name}</span>
                    </DataListCell>,
                    <DataListCell key="persistent">
                      <span id="simple-item1">{repo.persistent}</span>
                    </DataListCell>,
                    <DataListCell key="remoteUrl">
                      <span id="simple-item1">{repo.remoteUrl}</span>
                    </DataListCell>
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          ))
        }
      </DataList>
    </PageSection>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    ...state
  };
}
const mapDispatchToProps = dispatch => ({
  load: () => dispatch(getRepositories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
