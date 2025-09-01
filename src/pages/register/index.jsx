import { Button, Form, Input, Space, Card, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();

  const handleRegister = (values) => {
    console.log("Form data:", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        title="Đăng ký tài khoản"
        style={{
          width: 500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 8,
        }}
      >
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng ký
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider />
        <p>Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></p>
      </Card>
    </div>
  );
};

export default Register;
