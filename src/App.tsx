import DialogExample from "./example/Dialog.example";
import IconExample from "./example/Icon.example";
import ButtonExample from "./example/Button.example";
import LayoutExample from "./example/Layout.example";
import "./App.less";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import logo from '../logo.png'

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
        <Layout style={{border:'1px solid red'}}>
          <Header>
            <div>header</div>
            {/* <div><img src={logo} alt="" /></div> */}
          </Header>
          <Layout>
            <Aside>
              <ul>
                <h3>组件</h3>
                <li>
                  <Link to="/icon">icon</Link>
                </li>
                <li>
                  <Link to="/layout">layout</Link>
                </li>
                <li>
                  <Link to="/button">button</Link>
                </li>
                <li>
                  <Link to="/dialog">dialog</Link>
                </li>
              </ul>
            </Aside>
            <Content>
                  <Route path="/icon"><IconExample /></Route>
                  <Route path="/layout"><LayoutExample /></Route>
                  <Route path="/button"><ButtonExample /></Route>
                  <Route path="/dialog"><DialogExample /></Route>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </>
    </Router>
    
  );
}

export default App;
