import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export default function Brain() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-full">
        <Spline
          scene="https://prod.spline.design/fiz6KJp6IAsTURo4/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </Suspense>
  );
}
