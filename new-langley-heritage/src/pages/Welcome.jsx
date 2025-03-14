import { Watermark, Image } from "antd";
import welcome from "../assets/images/welcome.jpg";
const Welcome = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Watermark content="Group discussion project">
        <h1>Welcome to the group discussion project</h1>
        <Image width={888} src={welcome} />
      </Watermark>
    </div>
  );
};

export default Welcome;
