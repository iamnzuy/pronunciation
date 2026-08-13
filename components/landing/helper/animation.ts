export interface Variants {
  hidden: Record<string, any>;
  visible: Record<string, any> & { transition?: Record<string, any> };
}

export const getRevealFromLeftVariant = (duration = 0.8, delay = 0, opacity?: { from: number; to: number }): Variants => ({
    hidden: {
        clipPath: "inset(-20% 100% -20% 0%)",
        ...(opacity && { opacity: opacity.from })
    },
    visible: {
        clipPath: "inset(-20% 0% -20% 0%)",
        ...(opacity && { opacity: opacity.to }),
        transition: { duration, delay, ease: "easeInOut" }
    }
});

export const getTextColorTransitionVariant = (initialColor: string, finalColor: string, delay = 1.6, duration = 0.4): Variants => ({
    hidden: { color: initialColor },
    visible: {
        color: finalColor,
        transition: { delay, duration, ease: "easeOut" }
    }
});

export const getFlowUpVariant = (duration = 0.6, delay = 0, y = 300): Variants => ({
    hidden: { y, opacity: 0 },
    visible: {
        y: 0, opacity: 1,
        transition: {
            type: "tween", ease: "easeOut", duration, delay,
            opacity: { duration, delay, ease: "easeOut" }
        }
    }
});
