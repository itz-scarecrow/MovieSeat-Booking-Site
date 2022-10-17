export interface UserData {
    id: string;
    movieId: string;
    name: string;
    movieName: string;
    scrTime: string,
    seat: number;
    totalPrice: number;
    seatAvl: number;
    isEdit: boolean;
    seatArray: any;
    timingArray: any;
    priceArray: any;
  }
  
  export const UserColumns = [
    {
      key: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      key: 'movieName',
      type: 'text',
      label: 'Movie Name',
    },
    {
        key: 'scrTime',
        type: 'text',
        label: 'Screen Time',
    },
    {
      key: 'seat',
      type: 'number',
      label: 'Seats',
    },
    {
        key: 'seatAvl',
        type: 'number',
        label: 'Seats Available',
    },
    {
        key: 'totalPrice',
        type: 'number',
        label: 'Totalprice',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];