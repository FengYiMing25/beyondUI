import DialogExample from "./example/Dialog.example";
import IconExample from "./example/Icon.example";
import ButtonExample from "./example/Button.example";
import LayoutExample from "./example/Layout.example";
import "./App.less";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import logo from "../logo.png";

import {
  Layout,
  Header,
  Footer,
  Content,
  Aside,
} from "./components/Layout/layout";

function App(): JSX.Element {
  return (
    <Router>
      <>
        <Layout>
          <Header className="headerBox">
            <div className="logoBox">
              <img width="75" height="75" src={logo} alt="" />
              <span>Beyone UI</span>
            </div>
          </Header>
          <Layout>
            <Aside className="asideBox">
            <h3>组件</h3>
              <ul>
                <li>
                  <NavLink to="/icon">icon</NavLink>
                </li>
                <li>
                  <NavLink to="/layout">layout</NavLink>
                </li>
                <li>
                  <NavLink to="/button">button</NavLink>
                </li>
                <li>
                  <NavLink to="/dialog">dialog</NavLink>
                </li>
              </ul>
            </Aside>
            <Content className="contentBox">
              <Route path="/icon">
                <IconExample />
              </Route>
              <Route path="/layout">
                <LayoutExample />
              </Route>
              <Route path="/button">
                <ButtonExample />
              </Route>
              <Route path="/dialog">
                <DialogExample />
              </Route>
            </Content>
          </Layout>
          <Footer className="footerBox">&copy; BeyondUI</Footer>
        </Layout>
      </>
    </Router>
  );
}

export default App;
