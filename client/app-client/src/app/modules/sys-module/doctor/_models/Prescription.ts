export class Prescription {
    constructor
        (public _id: string,public doctor: any, public clinic: any, public patient: any,
            public medicine: any[], public date: Date, public hasPayed: boolean, public totalPrice: number,
            public paymentMethod: string, public tiedToDoctor: boolean, public createdAt: Date, public updatedAt: Date) { }

    //     (public _id: string, public doctor: Doctor, public clinic: Clinic,
    //         public patient: Patient, public medicine: Medicine[], public date: Date,
    //         public hasPayed: boolean, public totalPrice: number, public paymentMethod: string
    //         , public tiedToDoctor: boolean) // paymentMethod => [cash || visa] 
    // { }
}
