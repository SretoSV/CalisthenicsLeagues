export interface ShirtContext {
    id: number;
    league: string;
    shirtImage: string;
    size: string;
    quantity: number;
    price: number;
}

export interface Shirt{
    id: number,
    league: string,
    shirtImageBlackFront: string,
    shirtImageBlackBack: string,
    shirtImageWhiteFront: string,
    shirtImageWhiteBack: string,
    price: number,
}