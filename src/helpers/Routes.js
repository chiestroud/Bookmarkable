import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Personal from '../views/Personal';
import OpenSpace from '../views/OpenSpace';
import Admin from '../views/Admin';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

const AdminRoute = ({ component: Component, admin, ...rest }) => {
  const routeChecker = (taco) => (admin
    ? (<Component {...taco} admin={admin} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AdminRoute.propTypes = {
  component: PropTypes.func,
  admin: PropTypes.any
};
export default function Routes({ user, admin }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <PrivateRoute
          path='/open-space'
          user={user}
          component={() => <OpenSpace user={user} admin={admin} />} />
        <PrivateRoute
          path='/personal'
          user={user}
          component={() => <Personal user={user} />} />
        <AdminRoute
          path='/admin'
          admin={admin}
          component={() => <Admin />} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  admin: PropTypes.any
};
