export interface ShirtContext {
    id: number;
    leagueName: string;
    shirtImage: string;
    size: string;
    quantity: number;
    price: number;
}

export interface Shirt{
    id: number,
    leagueName: string,
    shirtImageBlackFront: string,
    shirtImageBlackBack: string,
    shirtImageWhiteFront: string,
    shirtImageWhiteBack: string,
    price: number,
}