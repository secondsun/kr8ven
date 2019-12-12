import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { getRepositories } from '../../actions/actions';

import { RepositoryList } from './RepositoryList';
import {
  Toolbar,
  Button,
  ToolbarGroup,
  ToolbarItem,
  ToolbarSection
} from '@patternfly/react-core';
const RepositoryHome = (props) => {

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
      <Toolbar>
        <ToolbarItem className="">
          <Button component="a"  aria-label="Create Repository" href="repositories/create">Create Repository</Button>
        </ToolbarItem>
      </Toolbar>
      <RepositoryList repositories={repositories} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryHome);
