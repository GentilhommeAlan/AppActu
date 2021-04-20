export type article = {
    source: {
        id? : string|number;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
};

type actu = {
    status: string;
    totalResults: number;
    articles: article[];
};

export default actu;