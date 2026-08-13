import { useLandingScroll } from "@/components/landing/hooks/use-landing-scroll";
import { InViewContext } from "@/components/landing/hooks/use-in-view";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, View, ViewProps } from "react-native";
import { runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated";

interface ScrollTriggerProps extends ViewProps {
  children: ReactNode;
  amount?: number;
}

export default function ScrollTrigger({
  children,
  amount = 0.4,
  onLayout,
  ...props
}: ScrollTriggerProps) {
  const { scrollY, viewportHeight } = useLandingScroll();
  const [isInView, setIsInView] = useState(false);

  const offsetY = useSharedValue(0);
  const sectionHeight = useSharedValue(0);
  const hasFired = useRef(false);

  const markInView = useCallback(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    setIsInView(true);
  }, []);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;
      offsetY.value = y;
      sectionHeight.value = height;

      if (height > 0 && viewportHeight > 0) {
        const visible = Math.min(y + height, viewportHeight) - Math.max(y, 0);
        if (visible / Math.min(height, viewportHeight) >= amount) markInView();
      }

      onLayout?.(event);
    },
    [onLayout, offsetY, sectionHeight, viewportHeight, amount, markInView],
  );

  useEffect(() => {
    if (viewportHeight === 0 || sectionHeight.value === 0) return;
    const y = offsetY.value;
    const height = sectionHeight.value;
    const visible = Math.min(y + height, viewportHeight) - Math.max(y, 0);
    if (visible / Math.min(height, viewportHeight) >= amount) markInView();
  }, [viewportHeight, amount, markInView, offsetY, sectionHeight]);

  useAnimatedReaction(
    () => ({ offset: scrollY.value, y: offsetY.value, height: sectionHeight.value }),
    ({ offset, y, height }) => {
      if (height === 0 || viewportHeight === 0) return;

      const top = y - offset;
      const visible = Math.min(top + height, viewportHeight) - Math.max(top, 0);
      const ratio = visible / Math.min(height, viewportHeight);

      if (ratio >= amount) runOnJS(markInView)();
    },
    [amount, viewportHeight, markInView],
  );

  return (
    <View onLayout={handleLayout} {...props}>
      <InViewContext.Provider value={isInView}>{children}</InViewContext.Provider>
    </View>
  );
}
