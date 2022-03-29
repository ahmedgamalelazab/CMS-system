import { Component, OnInit } from '@angular/core';
import { IClinicEmployee } from '../../network interfaces/Models';
import { AdminClinicService } from '../../services/admin.clinic.service';
import { ClinicStateStoreService } from '../../services/clinic.store.service';

@Component({
  selector: 'pm-clinicEmployees',
  templateUrl: './clinicEmployees.component.html',
  styleUrls: ['./clinicEmployees.component.css'],
})
export class ClinicEmployeesComponent implements OnInit {
  clinicEmployees: IClinicEmployee[];

  constructor(
    private adminClinicService: AdminClinicService,
    private clinicStoreStateService: ClinicStateStoreService
  ) {
    this.clinicEmployees = [];
  }

  ngOnInit(): void {
    this.adminClinicService
      .adminGetClinicEmployees(this.clinicStoreStateService.getClinicId())
      .subscribe({
        next: (response) => {
          response.data.forEach((employee: any) => {
            this.clinicEmployees.push({
              age: employee.age,
              assignedBy: employee.assignedBy,
              clinic: employee.clinic,
              createdAt: new Date(employee.createdAt).toLocaleDateString(),
              id: employee._id,
              name: employee.name,
              salary: employee.salary,
              updatedAt: new Date(employee.updatedAt).toLocaleDateString(),
              user: employee.user,
            });
          });
        },
        error: (err) => console.log(err),
        complete: () => console.log('get clinic employees request completed'),
      });
  }

  onEmployeeItemClick(empRef: Element) {}
}
