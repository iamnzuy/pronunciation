import { useEffect } from "react";
import {
  Modal as RNModal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  BackHandler,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

interface ModalProps {
  open?: boolean;
  toggle?: () => void;
  children: React.ReactNode;
  disableClose?: boolean;
  preventHideClickOverlay?: boolean;
}

const Modal = ({
  open = false,
  toggle = () => {},
  children,
  disableClose,
  preventHideClickOverlay,
}: ModalProps) => {
  const backdropOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.93);
  const cardTranslateY = useSharedValue(8);

  useEffect(() => {
    if (open) {
      backdropOpacity.value = withTiming(1, { duration: 150 });
      cardOpacity.value = withTiming(1, { duration: 180 });
      cardScale.value = withSpring(1, { damping: 20, stiffness: 260 });
      cardTranslateY.value = withSpring(0, { damping: 20, stiffness: 260 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 150 });
      cardOpacity.value = withTiming(0, { duration: 120 });
      cardScale.value = withTiming(0.93, { duration: 120 });
      cardTranslateY.value = withTiming(8, { duration: 120 });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!disableClose) toggle();
      return true;
    });
    return () => sub.remove();
  }, [open, disableClose, toggle]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { scale: cardScale.value },
      { translateY: cardTranslateY.value },
    ],
  }));

  const onPressBackdrop = () => {
    if (disableClose || preventHideClickOverlay) return;
    toggle();
  };

  return (
    <RNModal
      visible={open}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={() => !disableClose && toggle()}
    >
      <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <View style={[StyleSheet.absoluteFill, styles.backdrop]} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <View style={styles.wrapper} pointerEvents="box-none">
        <Animated.View style={[styles.card, cardStyle]}>
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
    alignSelf: "center",
  },
});

export default Modal;
