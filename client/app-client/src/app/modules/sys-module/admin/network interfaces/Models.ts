/**
 * @description : Network interface , only works with httpRequests
 */
export interface ClinicModel {
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicDescription: string;
  userEmail: string;
  userPassword: string;
  docName: string;
  docAge: number;
  iswOwner: boolean;
  assignedBy: string | null;
}

/**
 * @description : Network Interface : only works with httpRequests
 */

export interface ClinicClientInTable {
  id: string;
  name: string;
  doctors: number;
  address: string;
  phone: string;
  createAt: string;
  description:string;
  owner:any;
}

/**
 * @description : offline Model
 */
export interface IClinicState {
  clinicId: string;
  clinicObj:ClinicClientInTable | null;
}

/**
 * @description : network model : only works when we ask for list of doctors
 */

export interface IClinicDoctor {
  id: string;
  assignedBy: string;
  name: string;
  age: string;
  user: string;
  isOwner: string;
  profileImage: string;
  isConnectedToClinic: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description: offline interface , only works to get the data and present it in the clinic employees data
 */
export interface IClinicEmployee {
  id: string;
  name: string;
  age: string;
  salary: 1200;
  user: string;
  clinic: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClinicPayload{
  clinicName:string,
  clinicAddress:string,
  clinicPhone:string,
  clinicDescription:string,
  owner:string,
}
