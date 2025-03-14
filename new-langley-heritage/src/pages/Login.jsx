import { Card, Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/useLoginStore.js";
// 导入图片
import zhifou from "../assets/images/hello.jpg";
const Login = () => {
  const { userLogin } = useLoginStore();
  const navigate = useNavigate();
  // 用户登录
  const onFinish = async (loginForm) => {
    try {
      await userLogin(loginForm);
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.message);
  };
  return (
    <div
      style={{
        height: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 400,
        }}
        cover={<img alt="example" src={zhifou} />}
      >
        <Form
          style={{
            maxWidth: 400,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="number"
            name="username"
            rules={[
              {
                required: true,
                message: "User account cannot be empty!",
              },
            ]}
          >
            <Input placeholder="Please enter your account" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input a password!",
              },
            ]}
          >
            <Input.Password placeholder="Please input a password" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
