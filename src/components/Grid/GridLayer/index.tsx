import React, { useEffect, useState, memo } from 'react';

import { Layer, Line } from 'react-konva';

import { v4 } from 'uuid';

import Konva from 'konva';

function GridLayer() {
  const [lines, setLines] = useState<Konva.LineConfig[]>([]);

  const lineColor = '#dddddd6b';

  useEffect(() => {
    const layerLines = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    const blockSnapSize = 65;
    const padding = blockSnapSize;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < width / padding; i++) {
      layerLines.push({
        points: [
          Math.round(i * padding) + 0.5,
          0,
          Math.round(i * padding) + 0.5,
          height,
        ],
        stroke: lineColor,
        strokeWidth: 1,
      });
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < height / padding; i++) {
      layerLines.push({
        points: [0, Math.round(i * padding), width, Math.round(i * padding)],
        stroke: lineColor,
        strokeWidth: 1,
      });
    }

    layerLines.push({ points: [0, 0, 10, 10] });

    setLines(layerLines);
  }, []);

  return (
    <Layer>
      {lines.map((line) => (
        <Line key={v4()} {...line} />
      ))}
    </Layer>
  );
}

export default memo(GridLayer);
