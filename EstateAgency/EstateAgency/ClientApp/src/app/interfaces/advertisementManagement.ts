interface IAdvertisementManagement {
    id: string;
    title: string;
    userId: string;
    createdDate: string;
    email: string;
    type: number;
    flag: number;
    images: Array<IImage>;
}
