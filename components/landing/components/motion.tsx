import { Variants } from "@/components/landing/helper/animation";
import { useInViewState } from "@/components/landing/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { MotiText, MotiView } from "moti";
import { ReactNode, useState } from "react";
import { Dimensions, LayoutChangeEvent, TextProps, View, ViewProps } from "react-native";
import { Easing, EasingFunction, EasingFunctionFactory } from "react-native-reanimated";

const EASINGS: Record<string, EasingFunction | EasingFunctionFactory> = {
  linear: Easing.linear,
  easeIn: Easing.bezier(0.42, 0, 1, 1),
  easeOut: Easing.bezier(0, 0, 0.58, 1),
  easeInOut: Easing.bezier(0.42, 0, 0.58, 1),
};

const toPixels = (value: string | number): number => {
  if (typeof value === "number") return value;
  if (value.endsWith("vw")) return (parseFloat(value) / 100) * Dimensions.get("window").width;
  if (value.endsWith("vh")) return (parseFloat(value) / 100) * Dimensions.get("window").height;
  return parseFloat(value);
};

const clipPathToRightInset = (clipPath: string): number => {
  const match = clipPath.match(/inset\(\s*\S+\s+([\d.]+)%/);
  return match ? parseFloat(match[1]) / 100 : 0;
};

const toMotiValues = (values: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(values)) {
    if (key === "transition" || key === "clipPath") continue;
    if (key === "x") result.translateX = toPixels(value);
    else if (key === "y") result.translateY = toPixels(value);
    else result[key] = value;
  }

  return result;
};

const toMotiTransition = (transition?: Record<string, any>): Record<string, any> => {
  if (!transition) return { type: "timing" };

  const { type, ease, duration, delay, stiffness, damping, mass, delayChildren, ...rest } =
    transition;
  const result: Record<string, any> = {};

  if (type === "spring") {
    result.type = "spring";
    if (stiffness !== undefined) result.stiffness = stiffness;
    if (damping !== undefined) result.damping = damping;
    if (mass !== undefined) result.mass = mass;
  } else {
    result.type = "timing";
    if (duration !== undefined) result.duration = duration * 1000;
    if (ease !== undefined) result.easing = EASINGS[ease] ?? EASINGS.easeInOut;
  }

  if (delay !== undefined) result.delay = delay * 1000;

  for (const [key, value] of Object.entries(rest)) {
    if (value && typeof value === "object") result[key] = toMotiTransition(value);
  }

  return result;
};

interface MotionProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  variants: Variants;
  immediate?: boolean;
}

export const Motion = ({ children, variants, immediate = false, style, ...props }: MotionProps) => {
  const isInView = useInViewState();
  const isVisible = isInView || immediate;

  const { hidden, visible } = variants;

  if (hidden.clipPath || visible.clipPath) {
    return (
      <ClipPathReveal
        hidden={hidden}
        visible={visible}
        isVisible={isVisible}
        style={style}
        {...props}
      >
        {children}
      </ClipPathReveal>
    );
  }

  return (
    <MotiView
      from={toMotiValues(hidden) as any}
      animate={toMotiValues(isVisible ? visible : hidden) as any}
      transition={toMotiTransition(visible.transition) as any}
      style={style}
      {...props}
    >
      {children}
    </MotiView>
  );
};

interface MotionTextProps extends Omit<TextProps, "children"> {
  children?: ReactNode;
  variants: Variants;
  className?: string;
  immediate?: boolean;
}

export const MotionText = ({
  children,
  variants,
  className,
  immediate = false,
  style,
  ...props
}: MotionTextProps) => {
  const isInView = useInViewState();
  const isVisible = isInView || immediate;

  const { hidden, visible } = variants;

  return (
    <MotiText
      from={toMotiValues(hidden) as any}
      animate={toMotiValues(isVisible ? visible : hidden) as any}
      transition={toMotiTransition(visible.transition) as any}
      className={cn(className)}
      style={style}
      {...props}
    >
      {children}
    </MotiText>
  );
};

interface ClipPathRevealProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  hidden: Record<string, any>;
  visible: Record<string, any>;
  isVisible: boolean;
}

const ClipPathReveal = ({
  children,
  hidden,
  visible,
  isVisible,
  style,
  ...props
}: ClipPathRevealProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0 && (width !== size.width || height !== size.height)) {
      setSize({ width, height });
    }
  };

  const hiddenWidth = size.width * (1 - clipPathToRightInset(hidden.clipPath ?? "inset(0 0% 0 0)"));
  const visibleWidth = size.width * (1 - clipPathToRightInset(visible.clipPath ?? "inset(0 0% 0 0)"));

  const from = { width: hiddenWidth, ...toMotiValues(hidden) };
  const to = { width: visibleWidth, ...toMotiValues(visible) };
  const overhang = size.height * 0.2;

  return (
    <View style={[{ alignItems: "flex-start" }, style]} {...props}>
      <View style={{ opacity: 0 }} onLayout={handleLayout}>
        {children}
      </View>

      {size.width > 0 && (
        <MotiView
          from={from as any}
          animate={(isVisible ? to : from) as any}
          transition={toMotiTransition(visible.transition) as any}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            top: -overhang,
            height: size.height + overhang * 2,
            overflow: "hidden",
          }}
        >
          <View style={{ width: size.width, marginTop: overhang }}>{children}</View>
        </MotiView>
      )}
    </View>
  );
};
