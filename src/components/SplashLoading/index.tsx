import Lottie from 'lottie-react';
import animate from '@/assets/lottie.json';

export default function SplashLoading() {
  return (
    <div className="w-screen h-screnn">
      <Lottie animationData={animate} loop={true} />
    </div>
  );
}
