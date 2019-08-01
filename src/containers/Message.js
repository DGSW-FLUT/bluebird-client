import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Row, Col, AutoComplete, Button, Typography, Tag
} from 'antd';

const { Text } = Typography;
@inject('layout', 'member')
@observer
class Message extends React.Component {
  state = {
    receiveMembers: [],
    searchKeyword: ''
  }

  createAutoCompleteItem = member => (
    <AutoComplete.Option key={member.id} text={member.name}>
      <Text>{member.name}</Text>
      <Text type="secondary" style={{ float: 'right' }}>
        {member.phone_number}
      </Text>
    </AutoComplete.Option>
  )

  getDataSource = () => {
    const { member } = this.props;
    const { searchKeyword, receiveMembers } = this.state;
    return member.memberList
      .filter(
        m => m.name.indexOf(searchKeyword) > -1
          && receiveMembers.indexOf(m.id) === -1
      )
      .map(this.createAutoCompleteItem);
  }


  onSearch = (value) => {
    this.setState({
      searchKeyword: value
    });
  }

  onSelect = (id) => {
    const { receiveMembers } = this.state;
    this.setState({
      receiveMembers: receiveMembers.concat(parseInt(id, 10))
    });
  }

  render() {
    const { member } = this.props;
    const { receiveMembers } = this.state;
    return (
      <div>
        <Row>
          <Col>
            수신인
          </Col>
        </Row>
        <Row>
          <Col>
            {
              receiveMembers.map((m, idx) => {
                const find = member.memberList.find(v => v.id === m);
                return (
                  <Tag
                    closable
                    onClose={() => {
                      this.setState({
                        receiveMembers: receiveMembers.splice(idx, 1)
                      });
                    }}
                  >
                    {find.name}
                  </Tag>
                );
              })
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <AutoComplete
              dataSource={this.getDataSource()}
              onSearch={this.onSearch}
              onSelect={this.onSelect}
              optionLabelProp="text"
            />
          </Col>
          <Col>
            <Button
              type="primary"
            >
              직접 선택
            </Button>
          </Col>

        </Row>
      </div>
    );
  }
}

export default Message;
