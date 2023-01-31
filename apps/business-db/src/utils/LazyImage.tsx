import { Skeleton, SkeletonProps } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  imageProps: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  alt: string
  SkeletonProps?: SkeletonProps
};

export default function LazyImage({ imageProps, alt, SkeletonProps }: Props) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    let observer: any;
    if (!shouldLoad && placeholderRef.current) {
      observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setShouldLoad(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => { };
    }
  }, [shouldLoad, placeholderRef]);

  return (shouldLoad
    ? <img {...imageProps} alt={alt} />
    : <div className="img-placeholder" ref={placeholderRef} ><Skeleton {...SkeletonProps} height={SkeletonProps?.height ?? 250} /></div>
  );
}