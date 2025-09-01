import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../service/api";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {

  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    const res = await loginAPI(
      values.username,
      values.password
    );

    if(res.data){
      dispatch(
      loginSuccess({
        user: res.data.user,
        token: res.data.access_token
      })
    );
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập thành công");
      navigate ("/");
    }else {
      message.error("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backdropFilter: "#f0f2f5"
        }}>

        <Card
          title="Đăng nhập"
          style={{
            width: 500,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 8
          }}
        >
          <Form
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off">
            <Form.Item
              name="username"
              label="Email"
              rules={[{required: true, message: "Vui lòng nhập email"},
                      { type: "email", message: "Email không hợp lệ"}]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email"/>
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{required: true, message: "Vui lòng nhập mật khẩu"},
                      { min: 6, message: "Mật khẩu ít nhất 6 ký tự"}]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu"/>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{width: "100%"}}
                >
                  Đăng nhập
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Divider />
          <p>Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></p>
        </Card>
      </div>
    </>
  )
}

export default Login;