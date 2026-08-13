import { CText } from "@/components/CText";
import { LandingButton } from "@/components/landing/components/button";
import { Motion } from "@/components/landing/components/motion";
import { TABS_DATA } from "@/components/landing/constant";
import { Image, Linking, View } from "react-native";

export default function InteractiveTabs() {
  return (
    <View className="w-full max-w-[1240px] gap-8">
      <View className="w-full flex-col gap-6">
        {TABS_DATA.map((card) => (
          <Motion
            key={card.title}
            variants={{
              hidden: { x: "100vw", opacity: 0 },
              visible: {
                x: 0, opacity: 1, transition: {
                  type: "tween",
                  ease: "easeOut", duration: 1.2,
                  opacity: { duration: 1.2, ease: "easeIn" },
                  delayChildren: 1.2
                }
              }
            }}
            className="w-full"
          >
            <View
              className="relative flex-1 justify-between overflow-hidden rounded-[32px] border-2 border-primary-01 bg-white p-4"
              style={{ minHeight: card.minHeight }}
            >
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: -194,
                  width: 663,
                  height: 153,
                  overflow: "hidden",
                }}
              >
                <card.background width={663} height={1623} />
              </View>

              <Motion
                className="z-[2]"
                variants={{
                  hidden: { y: 80, opacity: 0 },
                  visible: {
                    y: 0, opacity: 1,
                    transition: { type: "spring", stiffness: 80, damping: 15, delay: 1.2 }
                  }
                }}
              >
                <View className="gap-6">
                  <View className="self-start rounded-full bg-secondary-02 p-4">
                    <CText className="text-t3-bold text-secondary-01">{card.badge}</CText>
                  </View>

                  <View className="gap-4">
                    <View className="flex-row flex-wrap items-center">
                      <CText className="text-h6">{card.detailTitle}</CText>
                      {card.titleLogo && (
                        <Image
                          source={card.titleLogo}
                          style={{ height: 22, width: (22 * 164) / 34, marginLeft: 6 }}
                          resizeMode="contain"
                        />
                      )}
                    </View>

                    <View style={{ marginLeft: 24 }}>
                      {card.bullets.map((bullet) => (
                        <View key={bullet} className="flex-row">
                          <CText className="text-t3">{"\u2022  "}</CText>
                          <CText className="flex-1 text-t3">{bullet}</CText>
                        </View>
                      ))}
                    </View>

                    <CText className="text-t3-bold">{card.subtext}</CText>
                  </View>

                  <LandingButton className="self-start" onPress={() => Linking.openURL(card.link)}>
                    {card.buttonText}
                  </LandingButton>
                </View>
              </Motion>

              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                  aspectRatio: 800 / 580,
                  zIndex: 1,
                }}
              >
                <Motion
                  className="h-full w-full"
                  variants={{
                    hidden: { y: 80, opacity: 0 },
                    visible: {
                      y: 0, opacity: 1,
                      transition: { type: "spring", stiffness: 80, damping: 15, delay: 1.2 }
                    }
                  }}
                >
                  <Image
                    source={card.imageMobile ?? card.image}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </Motion>
              </View>
            </View>
          </Motion>
        ))}
      </View>
    </View>
  );
}
