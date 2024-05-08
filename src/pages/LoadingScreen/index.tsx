import Lottie from 'lottie-react';
import animate from '@/assets/lottie.json';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-screen h-screen shadow bg-primary-500">
      <Lottie animationData={animate} loop={true} />
    </div>
  );
}
