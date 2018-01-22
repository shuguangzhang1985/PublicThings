import React from 'react';
import {connect} from 'dva'
import { Layout, Menu, Icon,Row,Col,Table, Input, Popconfirm,Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const data = [];
for (let i = 0; i < 3; i++) {
  data.push({
    key: i.toString(),
    name: `舆情账号 ${i}`,
    authority: '增删改查'
  });
}
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '账号',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '权限',
      dataIndex: 'authority',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>保存 </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a> 取消</a>
                  </Popconfirm>
                </span>
                : <span>
                    <Button size="small" onClick={() => this.edit(record.key)}>编辑信息</Button>
                    <Button size="small" onClick={() => this.edit(record.key)} style={{margin:"0 10px"}}>重置密码</Button>
                    <Button size="small" type="danger" onClick={() => this.edit(record.key)}>删除</Button>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
handleChange(value, key, column) {
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    target[column] = value;
    this.setState({ data: newData });
  }
}
edit(key) {
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    target.editable = true;
    this.setState({ data: newData });
  }
}
save(key) {
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    delete target.editable;
    this.setState({ data: newData });
    this.cacheData = newData.map(item => ({ ...item }));
  }
}
cancel(key) {
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
    delete target.editable;
    this.setState({ data: newData });
  }
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
              <Menu.Item key="3">
                <Icon type="user" />
                <span>用户管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Row type="flex" align="middle" style={{marginBottom:35}}>
                <Col span={24}>
                  <Button><Icon type="plus" /> 新增用户</Button>
                </Col>
              </Row>
              <Table bordered dataSource={this.state.data} columns={this.columns} />;

            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default connect()(Account);
