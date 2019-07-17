import React, { Component, Suspense } from "react";

// import axios from "axios";
import "./Blog.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
// import asyncComponent from "../../hoc/asyncComponents";
// import NewPost from "./NewPost/NewPost";
const AsyncNewPost = React.lazy(() => import("./NewPost/NewPost"));
// const AsyncNewPost = asyncComponent(() => {
//   return import("./NewPost/NewPost");
// });

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink activeClassName="myActiveStyle" to="/posts" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="myActiveStyle"
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    seach: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home2</h1>} /> */}

        <Switch>
          {this.state.auth ? (
            <Route
              path="/new-post"
              exact
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <AsyncNewPost />
                </Suspense>
              )}
            />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not Found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
          {/* <Route path="/" component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
