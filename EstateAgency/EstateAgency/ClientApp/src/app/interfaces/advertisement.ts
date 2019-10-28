interface IAdvertisement {
    id: string;
    title: string;
    description: string;
    price: number;
    yardage: number;
    category: string;
    userId: string;
    createdDate: any;
    lastModifiedDate: any;
    type: boolean;
    address: string;
    numberOfRoom: number;
    rent: number;
    city: string;
    images: Array<IImage>;
}


