import React from 'react'
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item

class List extends React.Component {
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
  ]
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  handleOk = () => {
    const {
      dispatch,
      form: { validateFields },
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'cards/addOne',
          payload: values,
        })
        // 重置 `visible` 属性为 false 以关闭对话框
        this.setState({ visible: false })
        this.props.form.resetFields()
      }
    })
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    })
  }
  render() {
    const { cardsList, cardsLoading } = this.props
    const { visible } = this.state
    const {
      form: { getFieldDecorator },
    } = this.props

    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={cardsList}
          loading={cardsLoading}
        />
        <Button onClick={this.showModal}>新建</Button>
        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="描述">
              {getFieldDecorator('desc')(<Input />)}
            </FormItem>
            <FormItem label="链接">
              {getFieldDecorator('url', {
                rules: [{ type: 'url' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'],
  }
}
export default connect(mapStateToProps)(Form.create()(List))
