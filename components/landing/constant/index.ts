import {
  BackgroundGradientComposite,
  BackgroundGradientGreen,
  BackgroundGradientOrange,
} from "@/components/landing/components/background-blobs";

export const CARDS_DETAIL = [
  {
    title: "Luyện đề IELTS 4 kỹ năng",
    image: require("@/assets/images/landing/banner-luyen-4-ky-nang.png"),
    buttonText: "Luyện tập ngay",
    link: "https://youpass.vn/luyen-thi/ielts/writing",
    bullets: [
      "Luyện với giao diện y như thi thật",
      "Kho đề chất lượng cập nhật liên tục",
      "Giải thích đáp án siêu chi tiết",
    ],
    subtext: 'Không chỉ "show" điểm - bạn hiểu sai ở đâu và cách làm cho đúng',
  },
  {
    title: "Khoá học IELTS Intensive 7.0",
    image: require("@/assets/images/landing/banner-khoa-hoc-intensive-7.0.png"),
    buttonText: "Thoát kẹt band ngay",
    link: "https://youpass.vn/khoa-hoc-ielts-intensive-aim-7",
    bullets: [
      "Study Plan chi tiết từng tuần",
      "Trọn bộ bài giảng & bài tập 4 kỹ năng IELTS",
      "Giáo viên đồng hành 1-1 luôn sẵn sàng giải đáp",
    ],
    subtext: "Biết chính xác mỗi tuần học gì, không lo lạc hướng trên hành trình đạt band",
  },
];

export const PROGRESS_DURATION = 20;

export const TABS_DATA = [
  {
    badge: "Nếu bạn cần luyện IELTS Free",
    title: "Kho đề luyện đầy đủ 4 kỹ năng - Miễn phí",
    detailTitle: "Kho đề luyện đầy đủ 4 kỹ năng - Miễn phí",
    bullets: [
      "Luyện với giao diện y như thi thật",
      "Kho đề chất lượng cập nhật liên tục",
      "Giải thích đáp án siêu chi tiết",
    ],
    subtext: 'Không chỉ "show" điểm - bạn hiểu sai ở đâu và cách làm cho đúng',
    minHeight: 631,
    buttonText: "Luyện tập ngay thôi!",
    link: "https://youpass.vn/luyen-thi/ielts/writing",
    imageIcon: require("@/assets/images/landing/prism-diamond.png"),
    image: require("@/assets/images/landing/youpass-app-mockup-ielts-practice.png"),
    background: BackgroundGradientGreen,
  },
  {
    badge: "Luyện mãi mà vẫn kẹt band",
    title: "Thoát kẹt band nhờ luyện IELTS đúng cách, với các tính năng",
    detailTitle: "Thoát kẹt band nhờ luyện IELTS đúng cách, với các tính năng",
    titleLogo: require("@/assets/images/landing/youpass-pro-logo.png"),
    bullets: [
      "Giải thích mọi lỗi sai - bạn biết đang yếu ở đâu, không tự học trong vô vọng",
      "Chẻ nhỏ việc luyện đề theo từng bước logic, luyện đúng cách để tiến bộ",
      "Có tất cả mọi thứ bạn cần để luyện đề: Dictation, phân tích lập luận, nâng cấp bài",
    ],
    subtext: "Không cần mất thời gian tìm thêm tài liệu",
    minHeight: 715,
    buttonText: "Luyện tập ngay thôi!",
    link: "https://youpass.vn/luyen-de-dung-cach-cung-youpass-pro",
    imageIcon: require("@/assets/images/landing/pro-icon.png"),
    image: require("@/assets/images/landing/youpass-app-mockup-ielts-pro.png"),
    imageMobile: require("@/assets/images/landing/youpass-app-mockup-ielts-pro-mobile.png"),
    background: BackgroundGradientComposite,
  },
  {
    badge: "Nếu bạn cần học IELTS",
    title: "Lộ trình học IELTS Intensive 7.0 toàn diện trong 3-6 tháng",
    detailTitle: "Lộ trình học IELTS toàn diện với Khoá YouPass Intensive 7.0",
    bullets: [
      "Study Plan chi tiết từng tuần",
      "Trọn bộ bài giảng & bài tập 4 kỹ năng IELTS",
      "Giáo viên đồng hành 1-1 luôn sẵn sàng giải đáp",
    ],
    subtext: "Không cần mất thời gian tìm thêm tài liệu",
    minHeight: 631,
    buttonText: "Tìm hiểu ngay thôi!",
    link: "https://youpass.vn/khoa-hoc-ielts-intensive-aim-7",
    imageIcon: require("@/assets/images/landing/intensive_fire.png"),
    image: require("@/assets/images/landing/youpass-app-mockup-ielts-intensive.png"),
    background: BackgroundGradientOrange,
  },
];

export const MARQUEE_ROWS = [
  [
    require("@/assets/images/landing/marquee/marquee_1.png"),
    require("@/assets/images/landing/marquee/marquee_2.png"),
    require("@/assets/images/landing/marquee/marquee_3.png"),
    require("@/assets/images/landing/marquee/marquee_4.png"),
    require("@/assets/images/landing/marquee/marquee_5.png"),
    require("@/assets/images/landing/marquee/marquee_6.png"),
    require("@/assets/images/landing/marquee/marquee_7.png"),
  ],
  [
    require("@/assets/images/landing/marquee/marquee_5.png"),
    require("@/assets/images/landing/marquee/marquee_8.png"),
    require("@/assets/images/landing/marquee/marquee_4.png"),
    require("@/assets/images/landing/marquee/marquee_9.png"),
    require("@/assets/images/landing/marquee/marquee_10.png"),
    require("@/assets/images/landing/marquee/marquee_11.png"),
    require("@/assets/images/landing/marquee/marquee_12.png"),
  ],
];
