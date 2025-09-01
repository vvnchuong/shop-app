import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAllUsersAPI } from "../../service/api";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {

  const [dataUsers, setDataUsers] = useState([]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const loadUsers = async (current, pagination) => {
    const res = await getAllUsersAPI(current, pagination);
    setDataUsers(res.data.result);
    setCurrent(res.data.meta.current);
    setPageSize(res.data.meta.pageSize);
    setTotal(res.data.meta.total);
  }


  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin")
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      onClick: () => navigate("/admin/users")
    },
    {
      key: "books",
      icon: <BookOutlined />,
      label: "Quản lý sách",
      onClick: () => navigate("/admin/books")
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Quản lý đơn hàng",
      onClick: () => navigate("/admin/orders")
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            margin: 0,
            background: "rgba(255,255,255,0.3)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "64px",
            fontSize: 18,
            fontWeight: "bold"
          }}
        >
          {collapsed ? "A" : "Admin"}
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>

      {/* Main layout */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          Trang quản trị
        </Header>

        <Content style={{ margin: 0 }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360
            }}
          >

            <Outlet context={{ loadUsers, dataUsers, current, setCurrent, pageSize, total }} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
