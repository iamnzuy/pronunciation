import Svg, { Defs, Ellipse, Path, RadialGradient, Stop, LinearGradient } from "react-native-svg";

interface BlobProps {
  width: number;
  height: number;
}

export const Section1Blob = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 569 162" fill="none">
    <Path
      d="M12.6042 0.625675C1.02316 8.17868 -2.39522 79.3643 1.60106 82.8636C5.59733 86.3629 232.194 84.4592 237.104 86.1788C242.014 87.8984 236.183 160.497 254.104 161.582C272.024 162.667 321.659 161.259 381.604 161.582C443.274 161.914 554.604 158.072 554.604 158.072C563.041 153.925 571.514 89.9268 567.603 86.1788C563.691 82.4308 503.604 86.1788 483.604 86.1788C438.97 86.1788 472.948 4.91681 455.104 3.92752C413.919 1.64413 18.3389 -1.30592 12.6042 0.625675Z"
      fill="#13A62E"
    />
  </Svg>
);

export const Section2Blob = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 334 146" fill="none">
    <Path
      d="M22.2761 1.66494C10.6951 9.197 -3.29953 61.4459 0.696748 64.9355C4.69303 68.4251 24.2865 66.2083 29.1966 67.9231C34.1066 69.638 7.27468 139.176 25.1953 140.258C43.1159 141.34 110.497 139.936 170.441 140.258C232.112 140.589 317.426 145.121 317.426 145.121C325.862 140.985 336.732 73.9103 332.82 70.1727C328.909 66.4352 288.695 70.1727 268.695 70.1727C224.061 70.1727 280.539 2.49371 262.695 1.50717C221.509 -0.769887 28.0109 -0.261295 22.2761 1.66494Z"
      fill="#13A62E"
    />
  </Svg>
);

export const Section3Blob = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 300 81" fill="none">
    <Path
      d="M18.016 0.5091C10.6701 0.509099 5.05527 -1.51525 0.93769 2.50943C-3.17986 6.53411 7.5679 77.3711 8.04987 78.4751C8.53183 79.579 19.8337 79.2082 21.0415 79.2769L111.738 80.9903C120.093 80.8987 186.327 81.036 189.598 80.9902C291.484 79.7305 224.024 79.0709 282.529 79.0709L285.988 79.0709C288.957 78.6816 289.151 76.7281 289.88 74.85C292.85 67.3607 293.418 61.9905 295.188 51.9265C297.31 37.9488 297.13 29.6157 298.9 16.0927C299.607 7.64079 300 10.0557 300 4.01867C292.728 3.30867 289.17 2.50941 280.933 2.50941C193.994 -2.32315 105.056 3.57812 18.016 0.5091Z"
      fill="#007AFF"
    />
  </Svg>
);

export const Section5Blob = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 252 68" fill="none">
    <Path
      d="M14.9342 1.26581C8.8449 1.26581 4.1905 -0.412566 0.777288 2.92426C-2.63592 6.26109 6.27333 64.9914 6.67284 65.9067C7.07236 66.822 16.4409 66.5146 17.4422 66.5715L92.6244 67.9921C99.5495 67.9162 154.454 68.03 157.165 67.992C241.622 66.9476 185.703 66.4007 234.199 66.4007L237.067 66.4008C239.528 66.0779 244.186 66.4008 250.178 63.9907C252.639 57.7813 253.169 53.9673 248.177 44.4452C242.684 30.9137 243.186 28.4079 239.19 14.186C237.067 6.63141 236.066 1.34488 233.199 1.34488L222.712 1.34488C150.645 -2.66176 87.0847 3.81031 14.9342 1.26581Z"
      fill="#FF6D3A"
    />
  </Svg>
);

export const Section6Blob = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 549 150" fill="none">
    <Path
      d="M16.5341 0.600409C7.52588 22.1006 -3.43407 78.6029 1.029 82.1022C5.49207 85.6015 285.547 80.3826 291.031 82.1022C296.514 83.8218 276.517 148.017 296.531 149.102C316.544 150.187 359.584 148.779 426.531 149.102C495.404 149.434 535.03 147.102 535.03 147.102C544.452 142.955 551.396 77.3486 547.027 73.6006C544.184 71.1609 521.556 74.2038 511.527 73.6006C506.149 73.2771 509.027 52.8974 509.027 45.1006C509.027 23.6006 523.959 5.09137 504.031 4.10208C458.034 1.81869 22.9386 -1.33118 16.5341 0.600409Z"
      fill="#13A62E"
    />
  </Svg>
);

export const EllipseGradientOrange = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 2062 517" fill="none">
    <Defs>
      <LinearGradient id="ellipseOrange" x1="1031" y1="0" x2="1031" y2="342" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF6D3A" />
        <Stop offset="1" stopColor="#FFFAF6" />
      </LinearGradient>
    </Defs>
    <Ellipse cx="1031" cy="258.5" rx="1031" ry="258.5" fill="url(#ellipseOrange)" />
  </Svg>
);

const TAB_BG_PATH =
  "M331.5 0C514.582 0 663 150.179 663 333.082C663 337.71 662.903 342.317 662.715 346.901H663L663 1623H0L0 346.901H0.285069C0.096874 342.317 0 337.71 0 333.082C0 150.179 148.418 0 331.5 0Z";

export const BackgroundGradientGreen = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 663 1623" fill="none">
    <Defs>
      <RadialGradient
        id="tabGreen"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(466.482 963.182 -464.266 1178.01 -117.117 473.249)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0.043475" stopColor="#13A62E" />
        <Stop offset="1" stopColor="#ECFBE4" />
      </RadialGradient>
    </Defs>
    <Path d={TAB_BG_PATH} fill="#D9D9D9" />
    <Path d={TAB_BG_PATH} fill="url(#tabGreen)" />
  </Svg>
);

export const BackgroundGradientComposite = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 663 1623" fill="none">
    <Defs>
      <RadialGradient
        id="tabCompositeBase"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(466.482 963.182 -464.266 1178.01 -117.117 473.249)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0.043475" stopColor="#13A62E" />
        <Stop offset="1" stopColor="#ECFBE4" />
      </RadialGradient>
      <RadialGradient
        id="tabCompositeOverlay"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(82 36) rotate(45) scale(682.358 838.185)"
      >
        <Stop stopColor="#FFC100" />
        <Stop offset="0.52" stopColor="#FF3532" />
        <Stop offset="1" stopColor="#4B86F4" />
      </RadialGradient>
    </Defs>
    <Path d={TAB_BG_PATH} fill="#D9D9D9" />
    <Path d={TAB_BG_PATH} fill="url(#tabCompositeBase)" />
    <Path d={TAB_BG_PATH} fill="url(#tabCompositeOverlay)" />
  </Svg>
);

export const BackgroundGradientOrange = ({ width, height }: BlobProps) => (
  <Svg width={width} height={height} viewBox="0 0 663 1623" fill="none">
    <Defs>
      <RadialGradient
        id="tabOrangeBase"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(466.482 963.182 -464.266 1178.01 -117.117 473.249)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0.043475" stopColor="#13A62E" />
        <Stop offset="1" stopColor="#ECFBE4" />
      </RadialGradient>
      <RadialGradient
        id="tabOrangeOverlay"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(176.365 1315.93 -1003.79 1208.3 173 120.5)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0.043475" stopColor="#FF6D3A" />
        <Stop offset="1" stopColor="#FFF0EB" />
      </RadialGradient>
    </Defs>
    <Path d={TAB_BG_PATH} fill="#D9D9D9" />
    <Path d={TAB_BG_PATH} fill="url(#tabOrangeBase)" />
    <Path d={TAB_BG_PATH} fill="url(#tabOrangeOverlay)" />
  </Svg>
);

export const ArrowRightSharpIcon = ({ color = "#FF6D3A", size = 18 }: { color?: string; size?: number }) => (
  <Svg width={size} height={(size * 12) / 18} viewBox="0 0 18 12" fill="none">
    <Path
      d="M16 6H1M12 1l4.293 4.293c.333.333.5.5.5.707 0 .207-.167.374-.5.707L12 11"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
