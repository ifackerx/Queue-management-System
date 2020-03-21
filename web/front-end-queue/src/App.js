import React, { useState } from "react";
import TableDnd from "./component/TableDnd";
import SentWork from "./component/SentWork";
import styled from "styled-components";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, Menu, Breadcrumb, Icon, Col, Row, Modal } from "antd";

import "./index.css";

const HeaderStyle = styled.div`
  padding: 2.5rem;
  margin: auto;
  width: 80%;
  background: #black;
  text-algin: right;
  border-radius: 10px;
`;

const NavItemStyle = styled.div`
  color: red;
  background: pink;
  cursor: pointer;

  :hover {
    color: pink;
    background: orange;
  }
`;

const Logo = styled.div`
  margin-right: auto;
`;

const NavGrid = styled.div``;

const HeaderNav = styled.div`
  font-size: 1.15em;
  font-weight: 50;
  color: white;
  background: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 10%;
`;

const MenuBar = styled.ul`
  padding-top: 4.5%;
  list-style: none;
  li {
    display: inline-block;
    padding: 9px 25px;
    align-items: center;
    transition: all 0.3s ease 0s;
  }

  li :hover {
    color: #696969;
  }
`;

const ButtonNav = styled.button`
  border-radius: 50px;
  padding: 9px 25px;
  border: none;
  background-color: #1890ff;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  color: white;
  :hover {
    background-color: #1c83e2;
  }
`;

const { Header, Content, Footer } = Layout;

const App = () => {
  const [visible, setVisible] = useState(true)
  const [statusPage, setstatusPage] = useState(false);

  const isWorked = () => {
    setstatusPage(true);
  };

  const isWorked2 = () => {
    setstatusPage(false);
  };

  const handleVisible = () => {
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false)
  };


  return (
    <div>
      <HeaderNav>
        <Logo>Home</Logo>

        <nav>
          <MenuBar>
            <li>
              <a onClick={isWorked2}>Your Task</a>
            </li>
            <li>
              <a onClick={isWorked}>Add Task</a>
            </li>
          </MenuBar>
        </nav>
        <ButtonNav onClick={handleVisible}>LOGIN</ButtonNav>
      </HeaderNav>

      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            {statusPage ? <SentWork /> : <TableDnd />}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>Quemanage Ment</Footer> */}
      </Layout>

  
      <Modal>
          visible={visible}
          closable={false}
          onOk={null}
          onCancel={handleCancel}
          footer={[
            <button key="cancle" onClick={handleCancel}>
              Return
            </button>
          ]}

        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
   

    </div>
  );
};

export default App;
