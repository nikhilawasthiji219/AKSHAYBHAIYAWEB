import React from 'react';

/* ------------------------------------------------------------------ */
/* Base shimmer skeleton                                              */
/* ------------------------------------------------------------------ */

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  radius = '8px',
}) => {
  return (
    <div
      className={`skeleton ${className ?? ''}`}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
      aria-hidden="true"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Text line skeleton (multiple shimmering lines)                     */
/* ------------------------------------------------------------------ */

interface SkeletonTextProps {
  className?: string;
  lines?: number;
  lineHeight?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  className,
  lines = 3,
  lineHeight = '1.6',
}) => {
  return (
    <div className={`skeleton-text ${className ?? ''}`} style={{ lineHeight }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{
            width: i === lines - 1 ? '60%' : '100%',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Image placeholder skeleton                                         */
/* ------------------------------------------------------------------ */

interface SkeletonImageProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  className,
  width = '100%',
  height = '200px',
  radius = '12px',
}) => {
  return (
    <div
      className={`skeleton-image ${className ?? ''}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Circular avatar skeleton                                           */
/* ------------------------------------------------------------------ */

interface SkeletonCircleProps {
  className?: string;
  size?: string | number;
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  className,
  size = '80px',
}) => {
  return (
    <div
      className={`skeleton-circle ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
      }}
      aria-hidden="true"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Full home-page layout skeleton                                     */
/* ------------------------------------------------------------------ */

export const HomePageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20" aria-label="पृष्ठ लोड हो रहा है">
      {/* Hero section skeleton */}
      <section className="space-y-8">
        <div className="flex items-start gap-6">
          <SkeletonCircle size="56px" className="shrink-0" />
          <div className="flex-1 space-y-4">
            <SkeletonText lines={1} />
            <SkeletonText lines={1} />
            <SkeletonText lines={3} />
          </div>
        </div>
        <SkeletonImage width="100%" height="420px" radius="24px" />
        <div className="flex flex-wrap gap-4 pt-4">
          <Skeleton width="170px" height="52px" radius="14px" />
          <Skeleton width="170px" height="52px" radius="14px" />
        </div>
      </section>

      {/* Trust strip skeleton */}
      <section className="space-y-6">
        <SkeletonText lines={1} />
        <div className="flex gap-4">
          <Skeleton width="32%" height="110px" radius="16px" />
          <Skeleton width="32%" height="110px" radius="16px" />
          <Skeleton width="32%" height="110px" radius="16px" />
        </div>
      </section>

      {/* Services grid skeleton */}
      <section className="space-y-6">
        <SkeletonText lines={1} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <SkeletonImage width="100%" height="180px" radius="16px" />
              <SkeletonText lines={2} />
              <Skeleton width="100%" height="40px" radius="8px" />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery skeleton */}
      <section className="space-y-6">
        <SkeletonText lines={1} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonImage key={i} width="100%" height="200px" radius="16px" />
          ))}
        </div>
      </section>

      {/* Contact skeleton */}
      <section className="space-y-6 pt-12">
        <SkeletonText lines={1} />
        <SkeletonImage width="100%" height="300px" radius="20px" />
        <SkeletonText lines={3} />
        <Skeleton width="100%" height="56px" radius="14px" />
      </section>
    </div>
  );
};
