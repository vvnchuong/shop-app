import { EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const UserAdminPage = () => {

  const { loadUsers, dataUsers, current, setCurrent , pageSize, total } = useOutletContext();

  useEffect(() => {
    loadUsers(current, pageSize);
  }, [current, pageSize])

  const handlePagination = (pagination) => {
    if(pagination != current){
      setCurrent(pagination);
    }
  }

  const handleEditUser = (user) => {
    console.log(user);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue", cursor: "pointer" }}
            onClick={handleEditUser(record)}
          />
        </Space>
      )
    }
  ];

  console.log("Check",pageSize);

  return (
    <>
      <Table 
        dataSource={dataUsers} columns={columns}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: handlePagination
        }}
      />;
    </>
  )
}

export default UserAdminPage;