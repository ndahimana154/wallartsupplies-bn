
export interface CategoryFilters {
    name?: string;
    status?: string;
    createdFrom?: Date;
    createdTo?: Date;
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
}