import React, { Fragment, useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";

const Wrapper = React.lazy(() => import("../../material/layout"));
const history = createBrowserHistory();

function MainRouter(props: any) {
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(false);
  }, []);

  const PrivateRoute = ({ children, ...rest }: any) => {
    return <Route {...rest} render={() => children} />;
  };

  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          {!isLoad &&
            props.options.map((e: any, i: number) => (
              <PrivateRoute key={i} {...e}>
                <Wrapper {...e} />
              </PrivateRoute>
            ))}
        </Switch>
      </Router>
    </Fragment>
  );
}

export default MainRouter;
