export const getTypeId = (item: any) => {
    return item.collection === "quiz" ? item.quiz_type : item.type;
};