import { Button, Drawer, Descriptions, Badge } from 'antd';
import moment from "moment";

const UserViewDetail = (props) => {

  const { isOpenUserDetail, handleCloseOpenUserDetail, selectedUser } = props;

  if (!selectedUser) return null;

  const items = [
    {
      key: "_id",
      label: "Id",
      children: selectedUser._id,
    },
    {
      key: "fullName",
      label: "Họ tên",
      children: selectedUser.fullName,
    },
    {
      key: "email",
      label: "Email",
      children: selectedUser.email,
    },
    {
      key: "phone",
      label: "SĐT",
      children: selectedUser.phone,
    },
    {
      key: "role",
      label: "Vai trò",
      children: <Badge status="processing" text={`${selectedUser.role}`} />,
      span: 2
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      children: moment(selectedUser.createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      children: moment(selectedUser.updatedAt).format("DD/MM/YYYY HH:mm")
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết người dùng"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={handleCloseOpenUserDetail}
        open={isOpenUserDetail}
        width="40vw"
      >
        <Descriptions title="Thông tin người dùng" column={2} bordered items={items} />
      </Drawer>
    </>
  );
}

export default UserViewDetail;