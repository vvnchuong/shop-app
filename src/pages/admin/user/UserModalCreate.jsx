import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../../service/api";

const UserModalCreate = ({ loadUsers, current, pageSize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await createUserAPI(
        values.fullName,
        values.email,
        values.password,
        values.phone
      );

      if (res.data) {
        message.success("Tạo tài khoản thành công!");
        loadUsers(current, pageSize);
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error("Email đã tồn tại");
      }
    } catch (error) {
      console.log("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm người dùng
      </Button>
      <Modal
        title="Thêm người dùng"
        open={isModalOpen}
        onOk={handleCreateUser}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="SĐT"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^(0[3|5|7|8|9])[0-9]{8}$/,
              message: "Số điện thoại không hợp lệ (phải là 10 số, ví dụ: 0912345678)"
            }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalCreate;
