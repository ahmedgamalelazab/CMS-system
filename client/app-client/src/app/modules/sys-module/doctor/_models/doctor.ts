export class Doctor {
    constructor(public _id: string, public name: string, public age: number,
        public user: string, public isOwner: boolean,
        public profileImage: string, public assignedBy: string,
        public isConnectedToClinic: boolean, public email: string,
        public password: string) {
    }

    // get Id() {
    //     return this.id;
    // }

    // set Id(id: number) {
    //     this.id = id;
    // }

    // get Name() {
    //     return this.name;
    // }

    // set Name(name: string) {
    //     this.name = name;
    // }

    // get Age() {
    //     return this.age;
    // }

    // set Age(age: number) {
    //     this.age = age;
    // }


}
