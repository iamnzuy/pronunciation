import { PenTool02, BookOpenIcon, PlayIcon, FileEditIcon } from "@/icons";

export const EnumCollection: any = {
    "lesson-1": { title: "Video", subTitle: "Tài liệu", background: "#FFECF0", icon: <BookOpenIcon /> },
    "lesson-2": { title: "Video", subTitle: "Video", background: "#FFECF0", icon: <PlayIcon /> },
    "lesson-3": { title: "Video", subTitle: "Video", background: "#FFECF0", icon: <PlayIcon /> },
    "lesson-4": { title: "Extra material", subTitle: "Tài liệu", background: "#F7EEFC", icon: <BookOpenIcon /> },
    "quiz-1": { title: "Exercise", subTitle: "Bài tập", background: "#E5F2FF", icon: <PenTool02 /> },
    "quiz-2": {
        is_special: true,
        title: "Homework",
        subTitle: "Homework",
        background: "linear-gradient(90deg, #F4C464 0%, #FF4242 114.27%)",
        icon: <FileEditIcon />,
    },
    "quiz-3": { title: "Exercise", subTitle: "Bài tập", background: "#E5F2FF", icon: <PenTool02 /> },
    "quiz-4": { title: "Exercise", subTitle: "Bài tập", background: "#E5F2FF", icon: <PenTool02 /> },
    "quiz-7": { title: "Exercise", subTitle: "Bài tập", background: "#E5F2FF", icon: <PenTool02 /> },
};

export const EnumIcon: any = {
    "lesson-1": <BookOpenIcon width={20} height={20} />,
    "lesson-2": <PlayIcon width={20} height={20} />,
    "lesson-3": <PlayIcon width={20} height={20} />,
    "lesson-4": <BookOpenIcon width={20} height={20} />,
    "quiz-1": <PenTool02 width={20} height={20} />,
    "quiz-2": <FileEditIcon width={20} height={20} />,
    "quiz-3": <PenTool02 width={20} height={20} />,
    "quiz-4": <PenTool02 width={20} height={20} />,
    "quiz-7": <PenTool02 width={20} height={20} />,
  };