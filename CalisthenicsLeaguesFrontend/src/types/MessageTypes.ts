export interface Message{
    id: number,
    league: number,
    content: string,
    datetime: Date,
    user: string,
    userProfilePicture: string,
    isFile: boolean
}