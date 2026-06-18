import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-25">
      <Spline scene="https://prod.spline.design/RmjkB-GUGwsjiMVR/scene.splinecode" />
    </div>
  );
}