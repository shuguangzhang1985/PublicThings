import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon,Card,Row,Col,Breadcrumb,Tag, Input, Tooltip } from 'antd';
import { Chart, Geom, Axis, Coord, Label, Legend, Guide, Shape } from 'bizcharts'
import { View } from '@antv/data-set';
import EditableTagGroup from '../components/Tags'
import 'antd/dist/antd.css';


const { Html } = Guide;
const data = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];
const dv = new View();
dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
});
const cols = {
  percent: {
    formatter: val => {
      val = (val * 100) + '%';
      return val;
    }
  }
}
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function IndexPage() {

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
            <Row style={{marginBottom:35}}>
              <Col span={24}>
                <Breadcrumb>
                  <Breadcrumb.Item href="">
                    <Icon type="home" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="">
                    <Icon type="tag" />
                    <span>标签管理</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>

            <Row>
              <Col span={24}><EditableTagGroup></EditableTagGroup></Col>
            </Row>

            <Row>
              <Col span={24}>

                <Chart data={dv} scale={cols} forceFit>
                  <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                  <Axis name="percent" />
                  <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
                  <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                  />
                  <Guide >
                    <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">重大事件<br><span style="color:#262626;font-size:2.5em">200</span></div>' alignX='middle' alignY='middle'/>
                  </Guide>
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color='item'
                    tooltip={['item*percent',(item, percent) => {
                      percent = percent * 100 + '%';
                      return {
                        name: item,
                        value: percent
                      };
                    }]}
                    style={{lineWidth: 1,stroke: '#fff'}}
                  >
                    <Label content='percent' formatter={(val, item) => {
                      return item.point.item + ': ' + val;}} />
                  </Geom>
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
