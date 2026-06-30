import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PropsWithChildren, useRef } from 'react';
import { View, ViewProps } from 'react-native';

gsap.registerPlugin(useGSAP);

type MotionViewProps = PropsWithChildren<
  ViewProps & {
    delay?: number;
    animation?: 'rise' | 'pop' | 'slide';
  }
>;

export function MotionView({
  animation = 'rise',
  children,
  delay = 0,
  style,
  ...props
}: MotionViewProps) {
  const containerRef = useRef<View>(null);

  useGSAP(
    () => {
      const target = containerRef.current as unknown as HTMLElement | null;

      if (!target) {
        return;
      }

      const fromVars =
        animation === 'pop'
          ? { autoAlpha: 0, scale: 0.88, y: 18 }
          : { autoAlpha: 0, scale: animation === 'slide' ? 1 : 0.98, y: animation === 'slide' ? 42 : 26 };

      gsap.set(target, { willChange: 'transform, opacity' });

      const tween = gsap.fromTo(target, fromVars, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.86,
        delay: delay / 1000,
        ease: animation === 'pop' ? 'back.out(1.5)' : 'power3.out',
        clearProps: 'willChange',
      });

      return () => tween.kill();
    },
    { dependencies: [animation, delay] },
  );

  return (
    <View ref={containerRef} style={style} {...props}>
      {children}
    </View>
  );
}
