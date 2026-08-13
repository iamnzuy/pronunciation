import { useCallback, useMemo, useRef, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const SCROLL_END_DELAY = 120;

export const useLandingScrollState = () => {
  const scrollY = useSharedValue(0);
  const scrollRange = useSharedValue(1);
  const isScrolling = useSharedValue(false);

  const [viewportHeight, setViewportHeight] = useState(0);
  const contentHeight = useRef(0);
  const viewportRef = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleScrollEnd = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      isScrolling.value = false;
    }, SCROLL_END_DELAY);
  }, [isScrolling]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      isScrolling.value = true;
      runOnJS(scheduleScrollEnd)();
    },
  });

  const updateRange = useCallback(() => {
    scrollRange.value = Math.max(contentHeight.current - viewportRef.current, 1);
  }, [scrollRange]);

  const onContentSizeChange = useCallback(
    (_width: number, height: number) => {
      contentHeight.current = height;
      updateRange();
    },
    [updateRange],
  );

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      viewportRef.current = event.nativeEvent.layout.height;
      setViewportHeight(event.nativeEvent.layout.height);
      updateRange();
    },
    [updateRange],
  );

  const scrollState = useMemo(
    () => ({ scrollY, scrollRange, isScrolling, viewportHeight }),
    [scrollY, scrollRange, isScrolling, viewportHeight],
  );

  return { scrollState, scrollHandler, onContentSizeChange, onLayout };
};
