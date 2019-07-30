import React, { forwardRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Input, Modal } from 'antd';

const AddressPicker = (props, ref) => {
  const { onChange, value } = props;

  const [isSelect, setIsSelect] = useState(false);

  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    onChange({ address: fullAddress, zip_code: data.zonecode });
    setIsSelect(false);
  };

  const enableModal = () => setIsSelect(true);

  return (
    <>
      <Input.Group compact>
        <Input style={{ width: '20%' }} onClick={enableModal} value={value.zip_code} readOnly />
        <Input style={{ width: '80%' }} onClick={enableModal} value={value.address} readOnly />
      </Input.Group>

      <Modal
        footer={null}
        visible={isSelect}
        closable={false}
        onCancel={() => setIsSelect(false)}
        bodyStyle={{ padding: 0, height: '500px' }}
      >
        <DaumPostcode
          ref={ref}
          onComplete={handleAddress}
          defaultQuery={value.zip_code}
          height="100%"
        />
      </Modal>
    </>
  );
};

export default forwardRef(AddressPicker);
