import Svg, { Path } from "react-native-svg";

export const TooltipArrowIcon = ({ fill = "#FF6D3A", width = 28, height = 8, ...props }: any) => (
    <Svg width={width} height={height} viewBox="0 0 28 8" fill="none" {...props}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28 8L25.2683 8C25.2683 8 25.2683 8 25.2683 8C25.2683 8 22.5366 8 20.4878 5.97895C18.439 3.9579 17.7561 2.94737 16.3902 1.26316C15.0244 -0.421052 14.3415 -0.421052 12.9756 1.26316C11.6098 2.94737 10.2439 4.63158 8.87805 5.97895C7.5122 7.32632 6.82927 8 3.41463 8C-1.90735e-06 8 0 8 0 8L28 8Z"
            fill={fill}
        />
    </Svg>
);