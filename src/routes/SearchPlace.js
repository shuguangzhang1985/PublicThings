import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon,Card,Row,Col,Breadcrumb,Tag, Input, Tooltip,Table, Popconfirm } from 'antd';
import { Chart, Geom, Axis, Coord, Label, Legend, Guide, Shape } from 'bizcharts'
import { View } from '@antv/data-set';
import EditableTagGroup from '../components/Tags'
import 'antd/dist/antd.css';


const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `南通市`,
    address: `舆情信息 ${i}`,
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


const { Html } = Guide;
const data1 = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];
const dv = new View();
dv.source(data1).transform({
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


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '地点',
      dataIndex: 'name',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '舆情',
      dataIndex: 'address',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>编辑</a>
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
  render() {
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
              <Row style={{marginBottom:35}}>
                <Col span={24}>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                      <Icon type="search" />
                      <span>按照地点搜索</span>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Table bordered size="small" dataSource={this.state.data} columns={this.columns} />
              <div style={{width:"65%"}}>
                <Chart height={window.innerHeight-300} data={dv} scale={cols}  forceFit>
                  <Coord type='theta' radius={0.55} />
                  <Axis name="percent" />
                  <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
                  <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
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
                </div>

            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


export default connect()(EditableTable);
