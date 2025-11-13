
export interface CategoryFilters {
    name?: string;
}

export interface QueryOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
}


export interface ProductFilters {
    name?: string;
    status?: boolean;
    description?: string;
    categoryId?: number
}

export interface iCategoryData {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
}