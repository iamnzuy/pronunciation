import { ArrowRightSharpIcon } from "@/components/landing/components/background-blobs";
import { CText } from "@/components/CText";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

type Variant = "primary-default" | "primary-outline";

interface LandingButtonProps extends PressableProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  textClassName?: string;
  withArrow?: boolean;
}

export const LandingButton = ({
  children,
  variant = "primary-default",
  className,
  textClassName,
  withArrow = false,
  ...props
}: LandingButtonProps) => {
  const isOutline = variant === "primary-outline";

  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-center gap-1 rounded-[28px] px-[18px] py-2",
        isOutline ? "border border-primary-01 bg-primary-02" : "bg-primary-01",
        className,
      )}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      {...props}
    >
      <CText
        className={cn("text-t3-bold", isOutline ? "text-primary-01" : "text-white", textClassName)}
      >
        {children}
      </CText>
      {withArrow && (
        <View className="ml-1">
          <ArrowRightSharpIcon color={isOutline ? "#FF6D3A" : "#FFFFFF"} size={18} />
        </View>
      )}
    </Pressable>
  );
};
