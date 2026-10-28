import { useState, useEffect, useRef } from 'react';
import styles from './ImageWithSpinner.module.css';

const ImageWithSpinner = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  style = {},
  wrapperStyle = {},
  spinnerSize = 32,
  loading = 'lazy',
  aspectRatio,
  onError,
  onLoad,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If the image is already cached and loaded by the browser, mark it loaded immediately
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(e);
  };

  const combinedWrapperStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...wrapperStyle,
  };

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`} style={combinedWrapperStyle}>
      {!isLoaded && !hasError && (
        <div className={styles.spinnerContainer} aria-hidden="true">
          <svg
            className={styles.spinnerSvg}
            viewBox="0 0 40 40"
            width={spinnerSize}
            height={spinnerSize}
          >
            {/* 8-dot circular spinner with progressive opacities & radiuses */}
            <circle cx="29.55" cy="10.45" r="3.6" opacity="1.0" fill="currentColor" />
            <circle cx="33.5" cy="20" r="3.2" opacity="0.85" fill="currentColor" />
            <circle cx="29.55" cy="29.55" r="2.8" opacity="0.70" fill="currentColor" />
            <circle cx="20" cy="33.5" r="2.4" opacity="0.55" fill="currentColor" />
            <circle cx="10.45" cy="29.55" r="2.0" opacity="0.40" fill="currentColor" />
            <circle cx="6.5" cy="20" r="1.7" opacity="0.28" fill="currentColor" />
            <circle cx="10.45" cy="10.45" r="1.4" opacity="0.18" fill="currentColor" />
            <circle cx="20" cy="6.5" r="1.2" opacity="0.10" fill="currentColor" />
          </svg>
        </div>
      )}

      {hasError ? (
        <div className={styles.fallbackContainer} title="Image could not be loaded">
          <span className={styles.fallbackIcon}>🖼️</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : styles.imageHidden} ${className}`}
          style={style}
          {...rest}
        />
      )}
    </div>
  );
};

export default ImageWithSpinner;
