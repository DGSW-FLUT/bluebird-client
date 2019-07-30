import React, { useState } from 'react';
import {
  Form, Modal, Button, Input, Icon, DatePicker, Select, Popconfirm, Descriptions
} from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import AddressPicker from './AddressPicker';

const levelType = ['부회원', '정회원'];

function MemberDetailModals(props) {
  const {
    form, visible, member, handleCancel, onSubmit, changeable, onDelete
  } = props;
  const {
    getFieldDecorator, validateFields
  } = form;

  const [isChange, setIsChange] = useState(false);

  const validateAddress = (rule, value, callback) => {
    if (value.zip_code && value.zip_code > 0) {
      callback();
      return;
    }

    callback('주소를 입력해 주세요');
  };

  const onCancel = () => {
    handleCancel();
    setIsChange(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        const result = await onSubmit({
          ...member,
          ...values,
          ...values.address,
          birth: values.birth.format('YYYY-MM-DD')
        });
        if (result) {
          onCancel();
        }
      }
    });
  };

  const createTextField = (name, koName, icon, placeholder) => {
    const message = `${koName}을 입력해 주세요`;
    return (
      <Form.Item label={koName}>
        {
          getFieldDecorator(name, {
            initialValue: member[name],
            rules: [{ required: true, message }]
          })(<Input
            prefix={icon && (
              <Icon
                type={icon}
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            )}
            placeholder={placeholder || message}
          />)
        }
      </Form.Item>
    );
  };

  return (
    <Modal
      visible={visible}
      title={`${member.name}님 ${isChange ? '수정' : '상세 보기'}`}
      onCancel={onCancel}
      footer={
        !isChange
          ? [
            changeable && (
              <Popconfirm
                title="정말로 삭제하시겠습니까?"
                onConfirm={() => onDelete(member)}
                okText="삭제"
                key="delete"
                cancelText="취소"
              >
                <Button type="danger">삭제</Button>
              </Popconfirm>
            ),
            changeable && <Button key="change" type="primary" onClick={() => setIsChange(true)}>수정</Button>,
            <Button key="back" onClick={onCancel} type="primary">확인</Button>
          ] : [
            <Button key="change_cancel" onClick={() => setIsChange(false)}>취소</Button>,
            <Button key="change_ok" type="primary" onClick={handleChange}>수정</Button>
          ]}
    >
      {
        isChange
          ? (
            <Form layout="inline">
              {createTextField('name', '이름', 'user')}
              <Form.Item label="생년월일">
                {
                  getFieldDecorator('birth', {
                    initialValue: moment(member.birth || '1970-01-01', 'YYYY-MM-DD'),
                    rules: [{ type: 'object', required: true, message: '생년월일을 입력해 주세요' }]
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="생년월일을 입력해 주세요"
                    />
                  )
                }
              </Form.Item>
              <Form.Item label="주소">
                {
                  getFieldDecorator('address', {
                    initialValue: {
                      zip_code: member.zip_code,
                      address: member.address
                    },
                    rules: [{
                      validator: validateAddress,
                      required: true,
                      message: '주소를 입력해 주세요'
                    }]
                  })(
                    <AddressPicker />
                  )
                }
              </Form.Item>
              {
                createTextField('job', '직업', 'idcard')
              }
              {
                createTextField('phone_number', '핸드폰 번호', 'phone', '010-1234-5678')
              }
              <Form.Item label="등급">
                {
                  getFieldDecorator('level',
                    {
                      initialValue: member.level,
                      rules: [{ required: true, message: '등급을 선택해 주세요' }]
                    })(
                      <Select placeholder="등급을 선택해 주세요">
                        {
                          levelType.map(type => (
                            <Select.Option value={type} key={type}>
                              {type}
                            </Select.Option>
                          ))
                        }
                      </Select>,
                    )
                }
              </Form.Item>
            </Form>
          )
          : (
            <Descriptions layout="vertical" size="small" bordered>
              <Descriptions.Item label="번호">
                {member.id}
              </Descriptions.Item>
              <Descriptions.Item label="이름">
                {member.name}
              </Descriptions.Item>
              <Descriptions.Item label="생일">
                {moment(member.birth, 'YYYY-MM-DD').format('YYYY년 MM월 DD일')}
              </Descriptions.Item>
              <Descriptions.Item label="주소" span={3}>
                {member.address}
              </Descriptions.Item>
              <Descriptions.Item label="직업" span={1.5}>
                {member.job}
              </Descriptions.Item>
              <Descriptions.Item label="등급" span={1.5}>
                {member.level}
              </Descriptions.Item>
              <Descriptions.Item label="핸드폰 번호" span={3}>
                <a href={`callto:${member.phone_number}`}>{member.phone_number}</a>
              </Descriptions.Item>
              <Descriptions.Item label="추가 날짜" span={3}>
                {member.created_at}
              </Descriptions.Item>
              <Descriptions.Item label="수정 날짜" span={3}>
                {member.created_at}
              </Descriptions.Item>
            </Descriptions>
          )
      }
    </Modal>
  );
}

export default Form.create()(MemberDetailModals);
