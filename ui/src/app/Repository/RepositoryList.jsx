import React from 'react';
import {
    DataList,
    DataListItem,
    DataListCell,
    DataListItemRow,
    DataListItemCells
  } from '@patternfly/react-core';
export const RepositoryList = ({repositories}) => {

    return <DataList aria-label="list of repositories">
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
  </DataList>;

}