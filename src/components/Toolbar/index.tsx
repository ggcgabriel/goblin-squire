import React, { memo, useCallback, useRef } from 'react';

import { Tooltip, useWindowSize } from 'dreampact';

import { v4 } from 'uuid';

import Konva from 'konva';

import { useTheme, useEditor } from '../../hooks';

import { ToolbarStyle } from './styles';

import ToolbarItem from './ToolbarItem';
import { toolbarItems } from './props';

function Toolbar() {
  const { addShape } = useEditor();
  const { width: maxWidth, height: maxHeight } = useWindowSize();

  const [, handleToggleTheme, isDarkTheme] = useTheme();

  const fileUploadEl = useRef<HTMLInputElement>(null);

  const handleAddRectangle = () =>
    addShape(
      new Konva.Rect({
        x: 65,
        y: 65,
        width: 65,
        height: 65,
        fill: '#ffffff',
        cornerRadius: 0,
        id: v4(),
        stroke: '#000000',
        strokeWidth: 1,
      }),
      'rectangle'
    );

  const handleAddCircle = () =>
    addShape(
      new Konva.Circle({
        x: 65,
        y: 65,
        width: 65,
        height: 65,
        fill: '#ffffff',
        id: v4(),
        radius: 65,
        stroke: '#000000',
        strokeWidth: 1,
      }),
      'circle'
    );

  const handleAddText = () =>
    addShape(
      new Konva.Text({
        x: 65,
        y: 65,
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 0,
        id: v4(),
        text: 'Type here...',
        fontSize: 20,
        fontFamily: 'Montserrat',
      }),
      'text'
    );

  const handleAddImage = useCallback(() => {
    if (fileUploadEl.current) {
      fileUploadEl.current.click();
    }
  }, []);

  const calculateAspectRatioFit = useCallback(
    (srcWidth: number, srcHeight: number) => {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      return { width: srcWidth * ratio, height: srcHeight * ratio };
    },
    [maxWidth, maxHeight]
  );

  const fileChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!evt.target.files) {
        return;
      }
      const file = evt.target.files[0];
      const reader = new FileReader();

      const image = new Image();
      image.onload = () => {
        const ratio = 0;

        const { width, height } = calculateAspectRatioFit(
          image.width,
          image.height
        );

        addShape(
          new Konva.Image({
            x: 65,
            y: 65,
            width,
            height,
            id: v4(),
            stroke: 'transparent',
            strokeWidth: 1,
            image,
          }),
          'image'
        );

        if (fileUploadEl.current) {
          fileUploadEl.current.value = '';
        }
      };

      reader.addEventListener(
        'load',
        () => {
          image.src = reader.result as string;
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [addShape, maxWidth, maxHeight]
  );

  return (
    <ToolbarStyle>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileUploadEl}
        onChange={fileChange}
      />
      {toolbarItems(isDarkTheme, {
        handleAddCircle,
        handleAddRectangle,
        handleAddText,
        handleToggleTheme,
        handleAddImage,
      }).map(({ icon: Icon, tooltip, onClick }) => (
        <ToolbarItem key={v4()} onClick={onClick}>
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
