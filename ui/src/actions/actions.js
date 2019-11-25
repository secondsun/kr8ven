import { GET_REPOSITORIES, INCOMING_REPOSITORIES } from './action_types'


function showRepositories(repos) {
    return {
      type: INCOMING_REPOSITORIES,
      payload: repos
    };
  }

export function getRepositories( options = {}) {
    return dispatch => {
          return fetch(
            `http://localhost:8080/repository`
          )
            .then(response => response.json())
            .then(repos => dispatch(showRepositories(repos)));
      };
}