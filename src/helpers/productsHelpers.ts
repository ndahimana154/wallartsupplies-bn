
export const generateSlug = (name: string): string => {
    const baseSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    const uniquePart = Math.floor(Date.now() / 1000);

    return `${baseSlug}-${uniquePart}`;
};