export const generateStressMap = (fullIpa: string, phonemeList: any[]): any => {
    const map: any = {};
    if (!fullIpa || !phonemeList) return map;
    let processingStr = fullIpa.replace(/[\/\s]/g, "")
    for (let i = 0; i < phonemeList.length; i++) {
        if (processingStr.startsWith("ˈ") || processingStr.startsWith("'")) {
            map[i] = "primary";
            processingStr = processingStr.substring(1);
        }
        else if (processingStr.startsWith("ˌ") || processingStr.startsWith(",")) {
            map[i] = "secondary";
            processingStr = processingStr.substring(1);
        }

        const pText = phonemeList[i]?.phoneme || "";
        if (processingStr.startsWith(pText)) {
            processingStr = processingStr.substring(pText.length);
        }
    }
    return map;
};

export const checkingDescender = (word: string) => {
    return /[gyjpq]/i.test(word);
};