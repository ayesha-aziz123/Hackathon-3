
export interface simplifiedProduct {
    images: string[],
    _id: string,
    name: string,
    price: number,
    slug: string,
    category: string,
    imageUrl: string,
    hoverImageUrl:string
}

export interface fullProduct {
    _id: string,
    images: string[],
    name: string,
    description: string,
    slug: string,
    category: string
    price: number,
    product_id: string
}
