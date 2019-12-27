interface IAdvertisement {
  id: string;
  title: string;
  description: string;
  price: number;
  yardage: number;
  category: string;
  userId: string;
  email: string;
  createdDate: any;
  lastModifiedDate: any;
  type: boolean;
  address: string;
  numberOfRoom: number;
  city: string;
  flag: number;
  images: Array<IImage>;
  reservations: Array<IReservation>;
}


