export const countWords = (text) => {
    if (!text) return 0;
    return String(text).trim().split(/\s+/).filter(Boolean).length;
};
