import { Button, Input, List } from 'antd';
import React from 'react';

import axios from '../axios';

export default class CareerListInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || [])
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || [];
    this.state = {
      careerList: value
    };
  }

  triggerChange = async (careerList) => {
    const { onChange } = this.props;

    this.setState({
      careerList
    });

    onChange(careerList);
  };

  addCareer = async (career) => {
    const { user } = this.props;
    const { careerList } = this.state;
    if (user) {
      await axios.post(`/users/addCareer/${user.id}`, { career });
    }
    this.triggerChange(careerList.concat(career));
  };

  removeCareer = async (career, index) => {
    const { user } = this.props;
    const { careerList } = this.state;

    if (user) {
      await axios.delete(`/users/delCareer/${career.id}`);
    }
    careerList.splice(index, 1);
    this.triggerChange(careerList);
  };


  render() {
    const { careerList } = this.state;
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={careerList}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  key="career-delete"
                  onClick={() => this.removeCareer(item, index)}
                >
                  삭제
                </Button>
              ]}
            >
              {item.content || item}
            </List.Item>
          )}
        />
        <Input.Search
          enterButton="검색"
          placeholder="경력을 추가해 주세요"
          onSearch={this.addCareer}
        />
      </>
    );
  }
}
