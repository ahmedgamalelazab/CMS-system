

export interface ClinicModel{

  clinicName:string;
  clinicAddress:string;
  clinicPhone:string;
  clinicDescription:string;
  docUserEmail:string;
  docUserPassword:string;
  docName:string;
  docAge:number;
  docIsOwner:boolean;
  docAssignedBy:string|null;



}

export interface ClinicClientInTable{
  name:string;
  doctors:number;
  address:string;
  phone:string;
  createAt:string;
}
