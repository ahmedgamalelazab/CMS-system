const express = require("express");
const mongoose = require("mongoose");
const Medicine = require("./DataBase/models/MedicineSchema");
const Appointment = require("./DataBase/models/AppointmentSchema");
const Doctor = require("./DataBase/models/DoctorSchema");
const Prescription = require("./DataBase/models/PrescriptionSchema");
const Clinic = require("./DataBase/models/ClinicSchema");
const Patient = require("./DataBase/models/PatientSchema");
const Employee = require("./DataBase/models/EmployeeSchema");

const URI = 'mongodb+srv://root:root@cluster0.ma3ob.mongodb.net/CMSDatabase?retryWrites=true&w=majority'
const localURI = "mongodb://localhost:27017/CMTest"
// mongoose.connect(URI, () => {
//     console.log("DB Connected!");
// })

const server = express();
mongoose.connect( URI)
        .then(()=>{
                console.log("DB Connected");
                const port=process.env.PORT||8080
                server.listen(port,()=>{
                    console.log("I am listening on "+port+".......")
                });
                
        })
        .catch(error=>{
                console.log("DB Conection Problem"+error);

        })
// const server = async () => {
//     try {
//         await mongoose.connect(URI);
//         console.log("DB connected ....");

//         // listen on port Number
//         app.listen(process.env.PORT || 8080, () => {

//             console.log("I am Listenining .......")
//         });
//     } catch (e) {
//         console.log(" DB Problem")
//     }
// }
// server();
// run()
/*****Insert Doctor */
// async function run (){
//     const doc = await Doctor.create({name:"Hadeer",age:22,salary:10000,user:{userName:"Hadeer",password:"1212"},isOwner:true,image:"./lllllll"})
//     console.log(doc)
// };
/*****Insert Patient */
// async function run (){
//         const P = await Patient.create({first_name:"Hadeer",last_name:"Eladawey",age:22,gender:"female",phone:"01205753004",image:"./hhhjj",prescription:["62362d58b5e36ccd0cd00a37"],clinic_id:"6235f3bcc84b8bb6b99a8912",Owner:"6235d6787663488e6e04b9e0"})
//         console.log(P)
//     };
/*****Insert Clinic */
// (async () => {
//     const _clinic = await Clinic.create({ name: "Joy", doctors: ["6235d6787663488e6e04b9e0"], address: "Arab", phone: "123", description: "Test", Owner: "6235d6787663488e6e04b9e0" })
//     console.log(_clinic)
// })();
/*****Insert Medicine */
// async function run(){
//     const medi = new Medicine({ name: "Cystone", price: 155 })
//     await medi.save()
//     console.log(medi)
// };
/*****Insert Prescription */
// async function run(){
//     const prec = new Prescription({patientId:"62362ebeb844169e41aa62d6",doctorId:"62362a83f740bfa26f2afb1b",clinicId:"6235f3bcc84b8bb6b99a8912",listOfMedicines:["panadol","adol","cetal"],invoice:{doctorName:"Hadeer",clinicName:"Joy",patientName:"Hadeer Eladawey",totalPrice:10000000}})
//     await prec.save()
//     console.log(prec)
// };
/*****Insert Employee */
// async function run(){
//     const emp = new Employee({name:"Mohammed",age:44,salary:5000,user:{userName:"Mohammed Ahmed",password:"1234"},clinic_id:"6235f3bcc84b8bb6b99a8912"})
//     await emp.save()
//     console.log(emp)
// };
/*****Insert Appoinment */
// async function run (){
//         const appoinment = await Appointment.create({doctor_id:"62362a83f740bfa26f2afb1b",Patient_id:"62362ebeb844169e41aa62d6",isConfirmed:false,totalPrice:1000})
//         console.log(appoinment)
//     };

/*****Insert Medicine */
// (async () => {
//     const medi = new Medicine({ name: "Cystone", price: 155 })
//     await medi.save()
//     console.log(medi)
// })();

// server.get('/clinic',async(req,res)=>{
//         try{
//                 const clinic=await Clinic.find().populate({
//                         path:'doctors'
//                 }).exec();
//                 res.json(clinic);
//         }catch(e){
//                 console.log(e);
//         }
// });