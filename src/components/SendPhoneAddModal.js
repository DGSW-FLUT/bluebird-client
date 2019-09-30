import React, { useState, useCallback } from 'react';
import {
 Modal, Input, Button, Form, Icon, Upload
} from 'antd';

function SendPhoneAddModal(props) {
  const { onAddSendPhone, ...otherProps } = props;
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState();
  const onFileUpload = useCallback((e) => {
    console.log(e);
    setFile(e.file.originFileObj);
  }, []);
  return (
    <React.Fragment {...otherProps}>
      <Button onClick={() => setShowModal(true)} type="primary">발신번호 추가</Button>
      <Modal
        title="발신번호 추가"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        okText="추가"
        cancelText="취소"
        maskClosable={false}
        onOk={() => {
          onAddSendPhone(phone, file);
          setPhone('');
          setFile('');
          setShowModal(false);
        }}
      >
        <Form.Item>
          <Input
            value={phone}
            onChange={(e) => { setPhone(e.target.value); }}
            prefix={(
              <Icon
                type="phone"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            )}
            placeholder="추가할 발신 번호"
          />
          <Upload name="file" onChange={onFileUpload}>
            <Button>
              <Icon type="file" />
              Upload...
            </Button>
          </Upload>
          <span style={{ color: 'red' }}>등록 할 발신번호에 해당하는 통신서비스 이용 증명원을 첨부하시길 바랍니다.</span>
        </Form.Item>
      </Modal>
    </React.Fragment>
  );
}

export default SendPhoneAddModal;
