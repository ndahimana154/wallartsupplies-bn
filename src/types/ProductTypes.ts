
export interface CategoryFilters {
    name?: string;
}

export interface QueryOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: string
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

export interface iProductData {
    id: number;
    name: string;
    price: number;
    moq: number;
    description: string;
    images: string[];
    customAttr: { key: string; value: string }[];
    slug: string;
    categoryId: number;
    status: boolean
    views?: number
}
