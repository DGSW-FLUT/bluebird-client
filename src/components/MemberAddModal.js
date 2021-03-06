import {
 DatePicker, Form, Icon, Input, Modal, Select, Checkbox 
} from 'antd';
import React, { useState } from 'react';

import config from '../config';
import AddressPicker from './AddressPicker';
import CareerListInput from './CareerListInput';

const { levelType, genderType } = config;

function MemberAddModal(props) {
  const {
 visible, handleCancel, onAdd, form 
} = props;

  const [agree, setAgree] = useState(false);

  const { getFieldDecorator, validateFields } = form;

  const onCancel = () => {
    handleCancel();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        const result = await onAdd({
          ...values,
          ...values.address,
          birth: values.birth.format('YYYY-MM-DD'),
          agree: agree ? '1' : '0'
        });
        if (result) {
          onCancel();
        }
      }
    });
  };
  const validateAddress = (rule, value, callback) => {
    if (value.zip_code && value.zip_code > 0) {
      callback();
      return;
    }

    callback('주소를 입력해 주세요');
  };
  const createTextField = (name, koName, icon, placeholder) => {
    const message = `${koName}을 입력해 주세요`;
    return (
      <Form.Item label={koName}>
        {getFieldDecorator(name, {
          rules: [{ required: true, message }]
        })(
          <Input
            prefix={
              icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder={placeholder || message}
          />
        )}
      </Form.Item>
    );
  };

  return (
    <Modal
      visible={visible}
      title="회원 추가"
      onCancel={onCancel}
      onOk={onSubmit}
      okText="추가"
      maskClosable={false}
      cancelText="취소"
    >
      <Form layout="inline">
        {createTextField('name', '이름', 'user')}
        <Form.Item label="생년월일">
          {getFieldDecorator('birth', {
            rules: [
              {
                type: 'object',
                required: true,
                message: '생년월일을 입력해 주세요'
              }
            ]
          })(
            <DatePicker
              style={{ width: 200 }}
              placeholder="생년월일을 입력해 주세요"
              showToday={false}
            />
          )}
        </Form.Item>
        <Form.Item label="주소">
          {getFieldDecorator('address', {
            initialValue: {
              zip_code: null,
              address: ''
            },
            rules: [
              {
                validator: validateAddress,
                required: true,
                message: '주소를 입력해 주세요'
              }
            ]
          })(<AddressPicker />)}
        </Form.Item>
        {createTextField('job', '직업', 'idcard')}
        {createTextField('education', '학력', 'bank')}
        {createTextField(
          'phone_number',
          '핸드폰 번호',
          'phone',
          '010-1234-5678'
        )}

        {createTextField('attendance_fee', '입회금액', 'dollar', '')}

        <Form.Item label="성별">
          {getFieldDecorator('gender', {
            initialValue: '남자',
            rules: [{ required: true, message: '성별을 선택해 주세요' }]
          })(
            <Select style={{ width: 100 }} placeholder="성별을 선택해 주세요">
              {genderType.map(type => (
                <Select.Option value={type} key={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="경력">
          {getFieldDecorator('careers', {
            initialValue: []
          })(<CareerListInput />)}
        </Form.Item>
        <Form.Item label="등급">
          {getFieldDecorator('level', {
            initialValue: '정회원',
            rules: [{ required: true, message: '등급을 선택해 주세요' }]
          })(
            <Select style={{ width: 100 }} placeholder="등급을 선택해 주세요">
              {levelType.map(type => (
                <Select.Option value={type} key={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Checkbox
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
          style={{ margin: '12px 8px' }}
        >
          개인정보 활용 동의
        </Checkbox>
      </Form>
    </Modal>
  );
}

export default Form.create()(MemberAddModal);
