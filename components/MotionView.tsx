import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type MotionViewProps = PropsWithChildren<{
  delay?: number;
  animation?: 'rise' | 'pop' | 'slide';
  style?: StyleProp<ViewStyle>;
}>;

export function MotionView({
  animation = 'rise',
  children,
  delay = 0,
  style,
}: MotionViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(animation === 'slide' ? 34 : 22)).current;
  const scale = useRef(new Animated.Value(animation === 'pop' ? 0.9 : 0.98)).current;

  useEffect(() => {
    const sequence = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        damping: 16,
        stiffness: 120,
        mass: 0.85,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        damping: 18,
        stiffness: 130,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]);

    sequence.start();
    return () => sequence.stop();
  }, [animation, delay, opacity, scale, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
