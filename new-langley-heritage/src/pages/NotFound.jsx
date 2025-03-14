import { Image } from "antd";
import notFund from "../assets/images/404.png";
const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Image width={400} src={notFund} />
    </div>
  );
};

export default NotFound;
