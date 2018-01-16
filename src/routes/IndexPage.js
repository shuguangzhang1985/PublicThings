import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon,Card,Row,Col } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function IndexPage() {
  // 数据源
  const data = [
    { genre: '涉警', sold: 275, income: 2300 },
    { genre: '诈骗', sold: 115, income: 667 },
    { genre: '聚众', sold: 120, income: 982 },
    { genre: '上访', sold: 350, income: 5271 },
    { genre: '江苏省', sold: 150, income: 3710 }
  ];

// 定义度量
  const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
  };

  return (
    <Layout>
      <Header style={{color:'#fff',fontSize:20}}>
          舆情后台管理系统
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Icon type="tag" />
              <span>标签管理</span>
            </Menu.Item>
            <SubMenu key="sub2" title={<span><Icon type="search" />搜索</span>}>
              <Menu.Item key="5">按地点搜索</Menu.Item>
              <Menu.Item key="6">按时间搜索</Menu.Item>
              <Menu.Item key="7">按关键字搜索</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Row gutter={16} style={{marginBottom:40}}>
              <Col span={8}>
                <Card title="热搜" extra={<a href="#">更多</a>} style={{ width: 300 }}>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="热搜" extra={<a href="#">更多</a>} style={{ width: 300 }}>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="热搜" extra={<a href="#">更多</a>} style={{ width: 300 }}>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                  <p>时事热点追踪</p>
                  <p>区域热点盘点</p>
                  <p>品牌口碑分析</p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Chart width={600} height={400} data={data} scale={cols}>
                  <Axis name="genre" />
                  <Axis name="sold" />
                  <Legend position="top" dy={-20} />
                  <Tooltip />
                  <Geom type="interval" position="genre*sold" color="genre" />
                </Chart>
              </Col>
            </Row>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
