export const getHighestStatus = (question: any, draftResult: any) => {
    let highestStatus = null;
    if (typeof draftResult?.score === "number" && typeof question.result?.score === "number") highestStatus = draftResult?.score > question.result?.score ? draftResult : question.result;
    else if (typeof draftResult?.score === "number") highestStatus = draftResult;
    else if (typeof question.result?.score === "number") highestStatus = question.result;
    return highestStatus;
}