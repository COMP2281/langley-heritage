import React, { useState } from 'react';
import { 
  LoginOutlined, 
  EnvironmentOutlined,
  RadarChartOutlined 
} from '@ant-design/icons';
import { Menu, Card, Row, Col, Typography, Image } from 'antd';
import { useNavigate } from "react-router-dom";
import sedlec from "../assets/images/sedlec.png";
import Lachaise from "../assets/images/Lachaise.png";
import George from "../assets/images/George.png";
import mission from "../assets/images/mission.jpg";


const { Title, Paragraph, Text } = Typography;

const cemeteryData = [
  {
    name: "Sedlec Ossuary (Bone Church)",
    location: "Kutná Hora, Czech Republic",
    mission: "Confront mortality through artistic expression of human remains",
    features: [
      "Contains skeletal remains of ~40,000 people arranged into chandeliers and decorations[1,2](@ref)",
      "Established during 14th-century plague outbreaks, redesigned in 1870 by František Rint",
      "UNESCO World Heritage Site combining Gothic architecture with macabre art",
      "Serves as meditation on life's transience through shocking visual impact[3](@ref)"
    ],
    image: sedlec
  },
  {
    name: "Père Lachaise Cemetery",
    location: "Paris, France",
    mission: "Preserve cultural memory through artistic memorials",
    features: [
      "Final resting place of Oscar Wilde, Chopin, and Jim Morrison[7](@ref)",
      "Blends English garden design with elaborate mausoleums",
      "Annual visitation exceeds 2 million for its 'open-air museum' of sculptures[5,7](@ref)",
      "Contains iconic memorials like the Communards' Wall (1871 Paris Commune)"
    ],
    image: Lachaise
  },
  {
    name: "Royal Vault at St George's Chapel",
    location: "Windsor, UK",
    mission: "Maintain royal heritage through innovative preservation",
    features: [
      "Holds 25+ British royals including Queen Elizabeth II and Prince Philip[4](@ref)",
      "Uses triple-layer lead-lined coffins for long-term preservation[4](@ref)",
      "Features marble effigies and 19th-century hydraulic lift system",
      "Combines medieval architecture with modern maintenance technologies"
    ],
    image: George
  }
];

const MissionContent = () => (
  <div style={{ padding: '24px', margin: '0 auto' }}>
    <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
      Langley Park Cemetery
    </Title>
    <div style={{textAlign: 'center',}}>
      <Image width={'60%'} src={mission} />
    </div>
    {/* <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
      Sacred Spaces of Remembrance
    </Title>
    <Paragraph style={{ textAlign: 'center', marginBottom: '32px' }}>
      Exploring European cemetery-cathedrals that transform mortality into artistic legacy
    </Paragraph>

    <Row gutter={[24, 24]}>
      {cemeteryData.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card
            hoverable
            cover={
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Image src={item.image} />
              </div>
            }
          >
            <Card.Meta
              title={<Text strong>{item.name}</Text>}
              description={
                <Text type="secondary">
                  <EnvironmentOutlined /> {item.location}
                </Text>
              }
            />
            <div style={{ marginTop: '16px' }}>
              <Text strong>Core Mission:</Text>
              <Paragraph style={{ margin: '8px 0' }}>
                {item.mission}
              </Paragraph>
              <Text strong>Historical Significance:</Text>
              <ul style={{ margin: '8px 0' }}>
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </Row> */}
  </div>
);

const MapContent = () => (
  <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
    mapPage
  </div>
);

const App = () => {
  const navigate = useNavigate();
  const [current = 0, setCurrent] = useState('');
  
  const onClick = (e) => {
    if(e.key === 'sign'){
      navigate("/login");
    }
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={{margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={[
            {
              label: 'Contact Map',
              key: 'Map',
              icon: <EnvironmentOutlined />,
            },
            {
              label: 'Our Mission',
              key: 'Mission',
              icon: <RadarChartOutlined />,
            },
            {
              label: 'Sign Up',
              key: 'sign',
              icon: <LoginOutlined />,
            },
          ]} 
          // style={{ width: '80%' }}
        />
      </div>
      
      {current === 'Mission' && <MissionContent />}
      {current !== 'Mission' && <MapContent />}
    </div>
  );
};

export default App;