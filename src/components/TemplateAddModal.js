import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

function TemplateAddModal(props) {
  const { onAddTemplate, ...otherProps } = props;
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');
  return (
    <React.Fragment {...otherProps}>
      <Button onClick={() => setShowModal(true)} type="primary">템플릿 추가</Button>
      <Modal
        title="템플릿 추가"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        okText="추가"
        cancelText="취소"
        maskClosable={false}
        onOk={() => {
          onAddTemplate(content);
          setShowModal(false);
        }}
      >
        <Input.TextArea value={content} onChange={e => setContent(e.target.value)} autosize={{ minRows: 3 }} />
      </Modal>
    </React.Fragment>
  );
}

export default TemplateAddModal;
