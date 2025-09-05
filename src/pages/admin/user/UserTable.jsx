import { EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserModalCreate from "./UserModalCreate";
import UserViewDetail from "./UserViewDetail";

const UserAdminPage = () => {

  const { loadUsers, dataUsers, current, setCurrent, pageSize, total } = useOutletContext();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenUserDetail, setIsOpenUserDetail] = useState(false);

  useEffect(() => {
    loadUsers(current, pageSize);
  }, [current, pageSize])

  const handlePagination = (pagination) => {
    if (pagination != current) {
      setCurrent(pagination);
    }
  }

  const handleOpenUserDetail = (user) => {
    setSelectedUser(user);
    setIsOpenUserDetail(true);
  }

  const handleCloseOpenUserDetail = () => {
    setIsOpenUserDetail(false);
  }

  const handleEditUser = (user) => {
    console.log(user);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <a onClick={() => handleOpenUserDetail(record)}>{record._id}</a>
      )
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

  return (
    <>
      {/* User modal create */}
      <UserModalCreate
        loadUsers={loadUsers}
        current={current}
        pageSize={pageSize}
      />
      {/* End User Modal create */}

      {/* Table user */}
      <Table
        dataSource={dataUsers} columns={columns}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: handlePagination
        }}
      />

      {/* User detail */}
      <UserViewDetail 
        isOpenUserDetail={isOpenUserDetail}
        handleCloseOpenUserDetail={handleCloseOpenUserDetail}
        selectedUser={selectedUser}
      />
      {/* End user detail */}
    </>
  )
}

export default UserAdminPage;