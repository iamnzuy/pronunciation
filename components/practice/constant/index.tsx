export enum EnityName {
    word = "từ vựng",
    sentence = "câu",
    paragraph = "đoạn văn",
}

export enum ClassNames {
    bold = "font-bold",
    underline = "underline",
    italic = "italic",
}

export const FilterOption = {
    "": "Tất cả",
    not_practiced: "Chưa luyện",
    not_passed: "Chưa đạt",
}

export const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" },
};

export type FilterTab = "all" | "not_practiced" | "not_passed";
