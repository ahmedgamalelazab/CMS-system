export class Prescription {
    constructor(public _id: number, public doctor: number, public clinic: number, public patient: number, 
        public medicine: Array<string>,  public date: Date,public hasPayed: boolean,public totalPrice: number, 
        public paymentMethod: string) { }
}
