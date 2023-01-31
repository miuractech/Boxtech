import { IconPlus } from '@tabler/icons';
import { Button, ButtonProps } from '@mantine/core';
import React from 'react';

import { randomId, useMediaQuery } from '@mantine/hooks';

export interface AddbutonProps extends ButtonProps {
  // size?: any;
  onClick?: () => void;
  icon?: boolean;
  text: string;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export const AddButton = ({
  onClick,
  icon,
  text,
  style,
  loading,
  size,
  ...rop
} : AddbutonProps) => {
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  return (
    <Button
      size={size}
      loading={loading}
      style={style}
      id={randomId()}
      type="submit"
      onClick={onClick}
      className="bg-blue-500"
      leftIcon={icon ? <IconPlus size={!mediaQuery ? 18 : 20} /> : ''}
      {...rop}
    >
      {text}
    </Button>
  );
};
