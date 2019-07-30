import React, { useState } from 'react';
import {
  Form, Modal, Button, Input, Icon, DatePicker
} from 'antd';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';
import AddressPicker from './AddressPicker';

function MemberDetailModals(props) {
  const {
    form, visible, member, handleCancel, onSubmit
  } = props;
  const {
    getFieldDecorator, getFieldError, isFieldTouched, validateFields
  } = form;

  const [isChange, setIsChange] = useState(false);

  const createError = name => isFieldTouched(name) && getFieldError(name);

  const validateAddress = (rule, value, callback) => {
    if (value.zip_code && value.zip_code > 0) {
      callback();
      return;
    }

    callback('주소를 입력해 주세요');
  };
  const birthError = createError('birth');
  const addrError = createError('address');

  const handleChange = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  const createTextField = (name, koName, icon, placeholder) => {
    const error = createError(name);
    const message = `${koName}을 입력해 주세요`;
    return (
      <Form.Item validateStatus={error ? 'error' : ''} help={error || ''} label={koName}>
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
      onCancel={handleCancel}
      footer={
        isChange
          ? [
            <Button key="delete" type="danger">삭제</Button>,
            <Button key="change" type="primary" onClick={() => setIsChange(true)}>수정</Button>,
            <Button key="back" onClick={handleCancel} type="primary">확인</Button>
          ] : [
            <Button key="change_cancel" onClick={() => setIsChange(false)}>취소</Button>,
            <Button key="change_ok" type="primary" onClick={handleChange}>수정</Button>
          ]}
    >
      <Form layout="inline">
        {createTextField('name', '이름', 'user')}
        <Form.Item validateStatus={birthError ? 'error' : ''} help={birthError || ''} label="생년월일">
          {
            getFieldDecorator('birth', {
              initialValue: moment(member.birth || '1970-01-01', 'YYYY-MM-DD'),
              rules: [{ type: 'object', required: true, message: '생년월일을 입력해 주세요' }]
            })(
              <DatePicker
                locale={locale}
                style={{ width: '100%' }}
                placeholder="생년월일을 입력해 주세요"
              />
            )
          }
        </Form.Item>
        <Form.Item validateStatus={addrError ? 'error' : ''} help={addrError || ''} label="주소">
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
          createTextField('phone_number', '핸드폰 번호', 'phone', '(000-0000-0000)형식으로 입력해 주세요')
        }

      </Form>
    </Modal>
  );
}

export default Form.create()(MemberDetailModals);
