export class Prescription {
    constructor( public pid:number,public patientName:string,public doctortName:string,public clinicName:string,public listmedicine:Array<string>,public date:Date) { }
}
