import React, { memo } from 'react';

import { ToolbarItemProps } from './types';

import { ToolbarItemStyle } from './styles';

function ToolbarItem(props: ToolbarItemProps) {
  const { children, ...otherProps } = props;

  return <ToolbarItemStyle {...otherProps}>{children}</ToolbarItemStyle>;
}

export default memo(ToolbarItem);
export * from './types';
export * from './styles';
