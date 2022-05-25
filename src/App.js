import React from "react";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import "./style/App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Route,
  Routes
} from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import NoMatch from "./pages/NoMatch";

const history = createBrowserHistory({ window });

function App() {
  console.log(history);
  return (
    <HistoryRouter history={history} basename='pokemon'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
