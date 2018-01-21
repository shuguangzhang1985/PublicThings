import React from 'react';
import {connect} from 'dva'
import { Layout, Menu, Icon,Row,Col,Table } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Account extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
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


            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default connect()(Account);
