

export interface ClinicModel{

  clinicName:string;
  clinicAddress:string;
  clinicPhone:string;
  clinicDescription:string;
  userEmail:string;
  userPassword:string;
  docName:string;
  docAge:number;
  iswOwner:boolean;
  assignedBy:string|null;



}

export interface ClinicClientInTable{
  id:string,
  name:string;
  doctors:number;
  address:string;
  phone:string;
  createAt:string;
}
