import Aside from "../components/Layout/aside";
import Content from "../components/Layout/content";
import Footer from "../components/Layout/footer";
import Header from "../components/Layout/header";
import Layout from "../components/Layout/layout";
import "./Layout.example.less"
const LayoutExample = () => {
  return (
    <>
      第一个例子
      <h1>example 1</h1>
      <Layout style={{ height: 500,width:700 }}>
        <Header className="x">header</Header>
        <Content className="y">Content</Content>
        <Footer className="x">Footer</Footer>
      </Layout>
      <h1>example 2</h1>
      <Layout style={{ height: 500,width:700  }}>
        <Header className="x">header</Header>
        <Layout>
          <Aside className="z">aside</Aside>
          <Content className="y">Content</Content>
        </Layout>
        <Footer className="x">Footer</Footer>
      </Layout>
      <h1>example 3</h1>
      <Layout style={{ height: 500,width:700  }}>
        <Header className="x">header</Header>
        <Layout>
          <Content className="y">Content</Content>
          <Aside className="z">aside</Aside>
        </Layout>
        <Footer className="x">Footer</Footer>
      </Layout>
      <h1>example 4</h1>
      <Layout style={{ height: 500,width:700 }}>
        <Aside className="z">aside</Aside>
        <Layout>
          <Header className="x">header</Header>
          <Content className="y">Content</Content>
          <Footer className="x">Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutExample;
