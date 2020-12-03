export interface RespuestaPosts {
    id: number;
    date: string;
    modified: string;
    slug: string;
    link: string;
    title: GUID[];
    content: Content;
    excerpt: Content;
    author: number;
    featured_media: number;
    sticky: boolean;
    template: string;
    meta: any[];
    categories: number[];
    tags: any[];
    _links: Link[];
}

export interface Link {
    author?: Author[];
    replies?: Author[];
}

export interface GUID {
    rendered?: string;
}

export interface Author {
    embeddable?: boolean;
    href?: string;
}

export interface Content {
    rendered?: string;
    protected?: boolean;
}