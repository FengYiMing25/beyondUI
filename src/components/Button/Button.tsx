import { Layout, Header, Content, Aside, Footer } from "../Layout/layout";
const Button = () => {
  return (
    <>
      <Layout style={{ height: 500, width: 700 }}>
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

export default Button;
