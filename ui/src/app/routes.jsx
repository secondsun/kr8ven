import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Alert, PageSection } from '@patternfly/react-core';
import { DynamicImport } from './DynamicImport';
import { accessibleRouteChangeHandler } from './utils/utils';
import RepositoryHome from './Repository/RepositoryHome';
import { NotFound } from './NotFound/NotFound';
import { useDocumentTitle } from './utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { RepositoryForm } from './Repository/RepositoryForm';

let routeFocusTimer;

const getSupportModuleAsync = () => () => import(/* webpackChunkName: 'support' */ './Support/Support');

const Support = (routeProps) => {
  const lastNavigation = useLastLocation();
  return (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <DynamicImport load={getSupportModuleAsync()} focusContentAfterMount={lastNavigation !== null}>
      {(Component) => {
        let loadedComponent;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (Component === null) {
          loadedComponent = (
            <PageSection aria-label="Loading Content Container">
              <div className="pf-l-bullseye">
                <Alert title="Loading" className="pf-l-bullseye__item" />
              </div>
            </PageSection>
          );
        } else {
          loadedComponent = <Component.Support {...routeProps} />;
        }
        return loadedComponent;
      }}
    </DynamicImport>
  );
};

const routes = [
  {
    component: RepositoryHome,
    exact: true,
    label: 'Respoitories',
    path: '/repositories',
    title: 'Respoitories',
    show:true
  },{
    component: RepositoryForm,
    exact: true,
    label: 'Create Repository',
    path: '/repositories/create',
    title: 'Create Repository',
    show:false
  },
  {
    component: RepositoryHome,
    exact: true,
    label: 'Home',
    path: '/',
    title: 'Home',
    show:true
  },
  {
    component: Support,
    exact: true,
    isAsync: true,
    label: 'Support',
    path: '/support',
    title: 'Support Page Title',
    show:true
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
}

const RouteWithTitleUpdates = ({
  component: Component,
  isAsync = false,
  title,
  ...rest
}) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps) {
    return (
      <Component {...rest} {...routeProps} />
    );
  }

  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
}

const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
