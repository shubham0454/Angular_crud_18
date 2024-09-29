import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModal } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// export class AppComponent {
//   employeeForm: FormGroup = new FormGroup({});
//   employeeObj: EmployeeModal = new EmployeeModal();
//   employeeList: EmployeeModal[] = [];

//   constructor() {
//     this.createForm();
//     const oldData = localStorage.getItem("EmpData");
//     if(oldData != null){
//       const parseData = JSON.parse(oldData);
//       this.employeeList = parseData;
      
//     }

//   }
//   createForm() {
//     this.employeeForm = new FormGroup({
//       empid: new FormControl(this.employeeObj.empId),
//       name: new FormControl(this.employeeObj.name), 
//       city: new FormControl(this.employeeObj.city), 
//       address: new FormControl(this.employeeObj.address),
//       contactNo: new FormControl(this.employeeObj.contactNo),
//       emailId : new FormControl(this.employeeObj.emailId),
//       pinCode : new FormControl(this.employeeObj.pinCode),
//       state : new FormControl(this.employeeObj.state),

//     })
//   }

//   onSave(){
//     const oldData = localStorage.getItem("EmpData");
//     if(oldData != null){
//       const parseData = JSON.parse(oldData);
//       this.employeeForm.controls['empid'].setValue(parseData.length +1);
//      this.employeeList.unshift(this.employeeForm.value);
//     }else{
//       this.employeeList.unshift(this.employeeForm.value);
//     }
//     localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
//   }

// }
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModal = new EmployeeModal();
  employeeList: EmployeeModal[] = [];

  constructor() {
    this.createForm();
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeList = parseData;
      }
    }
  }
  reset(){
    this.employeeObj = new EmployeeModal();
    this.createForm()
  }
  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId) ,
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state),
    });
  }

  onSave() {
 
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['empId'].setValue(parseData.length + 1);
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeList.unshift(this.employeeForm.value);
      }
      // Save the updated list to localStorage
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      this.reset()
    }
  }
  onEdit(item: EmployeeModal){
 this.employeeObj = item;
 this.createForm()
  }
  onUpdate(){
    
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value)
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset()
  }
  onDelete(id:number){
   const isDelete = confirm("are you sure want to Delete");
   if(isDelete){
    const index = this.employeeList.findIndex(m=>m.empId == id);
    this.employeeList.splice(index,1)
   }
  }
}
