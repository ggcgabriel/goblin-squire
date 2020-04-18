import React, { memo, useCallback } from 'react';

import { Tooltip } from 'dreampact';

import { useDispatch } from 'react-redux';

import useTheme from '../../../hooks/useTheme';

import { ToolbarStyle } from './styles';

import ToolbarItem from './ToolbarItem';
import { toolbarItems } from './props';

import { Creators } from '../../../store/ducks/editor';

function Toolbar() {
  const dispatch = useDispatch();

  const [, handleToggleTheme, isDarkTheme] = useTheme();

  const handleAddRectangle = useCallback(() => {
    dispatch(
      Creators.addShape(
        {
          x: 65,
          y: 65,
          width: 65,
          height: 65,
          fill: 'white',
          id: Math.random().toString(),
          stroke: 'black',
          strokeWidth: 1,
        },
        'rectangle'
      )
    );
  }, [dispatch]);

  const handleAddCircle = useCallback(() => {
    dispatch(
      Creators.addShape(
        {
          x: 65,
          y: 65,
          width: 65,
          height: 65,
          fill: 'white',
          id: Math.random().toString(),
          radius: 65,
          stroke: 'black',
          strokeWidth: 1,
        },
        'circle'
      )
    );
  }, [dispatch]);

  const handleAddText = useCallback(() => {
    dispatch(
      Creators.addShape(
        {
          x: 65,
          y: 65,
          color: 'red',
          id: Math.random().toString(),
          text: 'Type here...',
          fontSize: 20,
          fontFamily: 'Montserrat',
        },
        'text'
      )
    );
  }, [dispatch]);

  return (
    <ToolbarStyle>
      {toolbarItems(isDarkTheme, {
        handleAddCircle,
        handleAddRectangle,
        handleAddText,
        handleToggleTheme,
      }).map(({ icon: Icon, tooltip, onClick }) => (
        <ToolbarItem key={Math.random()} onClick={onClick}>
          <Tooltip title={tooltip} position="right">
            <Icon />
          </Tooltip>
        </ToolbarItem>
      ))}
    </ToolbarStyle>
  );
}

export default memo(Toolbar);

export * from './styles';
