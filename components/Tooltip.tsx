import { useRef, useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const TOOLTIP_WIDTH = 180;
const TOOLTIP_GAP = 8;

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const triggerRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, showAbove: true });

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);
  const translateY = useSharedValue(6);

  const showTooltip = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      const tipX = Math.min(
        Math.max(x + width / 2 - TOOLTIP_WIDTH / 2, 8),
        SCREEN_WIDTH - TOOLTIP_WIDTH - 8
      );
      const showAbove = y > SCREEN_HEIGHT / 2;
      setPosition({ x: tipX, y: showAbove ? y - TOOLTIP_GAP : y + height + TOOLTIP_GAP, width, showAbove });
      setVisible(true);
      opacity.value = withTiming(1, { duration: 150 });
      scale.value = withSpring(1, { damping: 18, stiffness: 280 });
      translateY.value = withSpring(0, { damping: 18, stiffness: 280 });
    });
  };

  const hideTooltip = () => {
    opacity.value = withTiming(0, { duration: 120 });
    scale.value = withTiming(0.85, { duration: 120 });
    translateY.value = withTiming(6, { duration: 120 });
    setTimeout(() => setVisible(false), 130);
  };

  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: position.showAbove ? translateY.value : -translateY.value },
    ],
  }));

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        <TouchableWithoutFeedback onPress={showTooltip}>
          <View>{children}</View>
        </TouchableWithoutFeedback>
      </View>

      <Modal visible={visible} transparent animationType="none" onRequestClose={hideTooltip}>
        <TouchableWithoutFeedback onPress={hideTooltip}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[
                styles.tooltip,
                tooltipStyle,
                {
                  left: position.x,
                  width: TOOLTIP_WIDTH,
                  ...(position.showAbove
                    ? { bottom: SCREEN_HEIGHT - position.y }
                    : { top: position.y }),
                },
              ]}
            >
              {content}
              {/* Arrow */}
              <View
                style={[
                  styles.arrow,
                  position.showAbove ? styles.arrowBottom : styles.arrowTop,
                  { left: TOOLTIP_WIDTH / 2 - 6 },
                ]}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#FF6D3A",
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    left: TOOLTIP_WIDTH / 2 - 7,
  },
  arrowBottom: {
    bottom: -7,
    borderTopWidth: 7,
    borderTopColor: "#FF6D3A",
  },
  arrowTop: {
    top: -7,
    borderBottomWidth: 7,
    borderBottomColor: "#FF6D3A",
  },
});

export default Tooltip;
