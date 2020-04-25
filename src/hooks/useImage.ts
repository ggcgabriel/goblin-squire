import { useEffect, useState } from 'react';

type State = {
  image: undefined | HTMLImageElement;
  status: string;
};

const defaultState: State = {
  image: undefined,
  status: 'loading',
};

const useImage = (url: string, crossOrigin?: string) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const img = document.createElement('img');

    const onload = () => {
      setState({ image: img, status: 'loaded' });
    };

    const onerror = () => {
      setState({ image: undefined, status: 'failed' });
    };

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    img.src = url;

    return () => {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
      setState(defaultState);
    };
  }, [url, crossOrigin]);

  return [state];
};

export default useImage;
