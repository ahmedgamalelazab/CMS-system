export class Appointment {
    // constructor(public _id:number,public doctor_name:string,public date:string
    //             ,public time:string) { }

    constructor(public clinic: any, public doctor: any, public patient: any, public date: Date, public isConfirmed: boolean, public totalPrice: Number, public payment: string, public _id?: any) { }
}
