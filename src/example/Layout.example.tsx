import Aside from "../components/Layout/aside";
import Content from "../components/Layout/content";
import Footer from "../components/Layout/footer";
import Header from "../components/Layout/header";
import Layout from "../components/Layout/layout";

const LayoutExample = () => {
  return (
    <>
      {/* 第一个例子
      <h1>example 1</h1>
      <Layout style={{ height: 500 }}>
        <Header>header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <h1>example 2</h1>
      <Layout style={{ height: 500 }}>
        <Header>header</Header>
        <Layout>
          <Aside>aside</Aside>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <h1>example 3</h1>
      <Layout style={{ height: 500 }}>
        <Header>header</Header>
        <Layout>
          <Content>Content</Content>
          <Aside>aside</Aside>
        </Layout>
        <Footer>Footer</Footer>
      </Layout> */}
      <h1>example 4</h1>
      <Layout style={{ height: 500 }}>
        <Aside>aside</Aside>
        <Layout>
          <Header>header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutExample;
