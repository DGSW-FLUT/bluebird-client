import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Icon, Spin } from 'antd';

// DO NOT USE CUZ IT'S MAKING!
// DO NOT USE CUZ IT'S MAKING!
// DO NOT USE CUZ IT'S MAKING!

// 사용법
//
// FunctionComponent
// const loadable = React.useRef();
// 
// ClassComponent
// loadable = React.createRef();
//
// <Loadable ref={loadable}>
//   <Component />
// </Loadable>
//
// loadable.current.setPending(bool)
// loadable.current.togglePending()

const Spinner = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Loadable = forwardRef(({ component: Component, ...rest }, ref) => {
  const [_isPending, _setPending] = useState(false);

  useImperativeHandle(ref, () => ({
    setPending(status) {
      _setPending(status);
    },
    togglePending() {
      _setPending(!_isPending);
    }
  }));

  return (
    <Spin indicator={Spinner} spinning={_isPending} {...rest} render={props => <Component {...props} />} />
  );
});

export default Loadable;
