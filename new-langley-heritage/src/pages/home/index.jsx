import React, { useState, useEffect } from "react";
import useLoginStore from "../../store/useLoginStore.js";
import favicon from "../../assets/images/welcome.jpg";
import "./index.css";
// 图标
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ReadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Space, Image } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
const Home = () => {
  useEffect(() => {
    const userInfo = localStorage.getItem("zhifou-user");
    if (!userInfo) {
      navigate("/HomePage");
    }
  }, []);
  const navigate = useNavigate();
  const { userLogout } = useLoginStore();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("zhifou-user"))
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      label: "exit",
      key: "1",
    },
  ];
  // exit
  const onClick = ({ key }) => {
    userLogout();
    navigate("/HomePage");
  };
  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ textAlign: "center", marginTop: "5px" }}>
            {collapsed ? (
              <Image width={40} src={favicon} />
            ) : (
              <h3 style={{ color: "white", textAlign: "center" }}>
                Group discussion project
              </h3>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={pathname}
            selectedKeys={pathname}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">homePage</Link>
            </Menu.Item>
            {/* <Menu.Item icon={<UserOutlined />} key="/user">
              <Link to="/user">userManagement</Link>
            </Menu.Item>
            <Menu.Item icon={<ReadOutlined />} key="/blog">
              <Link to="/blog">blogManagement</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="user-info">
              <Dropdown menu={{ items, onClick }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    hello
                    {/* {userInfo?.name} */}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Group discussion project ©{new Date().getFullYear()} Created by Group discussion project
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default Home;
