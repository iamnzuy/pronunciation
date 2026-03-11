import { cn } from "@/lib/utils";
import { Text, TextInput, TextInputProps, TextProps } from "react-native";

export const CText = ({ children, className, ...props }: TextProps) => {
  return (
    <Text
      className={cn("text-dark-75 font-nunito", className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CTextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <TextInput
      className={cn("text-dark-75 font-nunito", className)}
      {...props}
    />
  );
};