import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  sidebarForm: FormGroup;
  display: boolean;
  dataSource: any[];
  employees: Employee[];
  cols: any[];
  newEmployee: Employee;
  username = '';
  msgs: Message[] = [];
  lowerLeftNotification: Message[] = [];
  uploadedFiles: any[] = [];
  formType: string;

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.userService.loggedInUserSubject.subscribe(user => {
        this.username = user;
    });

    if (this.username === '') {
      this.router.navigate(['login']);
    }

    this.dataSource = [
      { label: 'Facebook', value: 'Facebook' },
      { label: 'Google', value: 'Google' },
      { label: 'Monster Gulf', value: 'Monster Gulf' },
      { label: 'JobsDB', value: 'JobsDB' },
      { label: 'Twitter', value: 'Twitter' }
      ];

    this.sidebarForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      workExp: new FormControl(null, Validators.required),
      cv: new FormControl(null),
      dataSource: new FormControl(null)
    });

    this.employees = this.employeeService.getEmployees();

    this.cols = [];
    const empKeys = Object.keys(this.employees[0]);

    empKeys.forEach(empKey => {
      this.cols.push({field: empKey});
    });
  }

  onShow(formType: 'New' | 'Update', rowData?: any) {
    this.msgs = [];
    this.lowerLeftNotification = [];
    if (rowData) {
      Object.keys(rowData).forEach(empKey => {
        this.sidebarForm.get(empKey).setValue(rowData[empKey]);
      });
    }

    if (formType === 'New') {
      this.sidebarForm.reset();
    }

    this.formType = formType;
    this.display = true;
  }

  onClearForm() {
    this.sidebarForm.reset();
  }

  onInsertData() {
    this.msgs = [];
    if (this.sidebarForm.valid) {
      if (this.formType === 'Update') {
        const existingEmployee = this.employees.find(emp => emp.id === this.sidebarForm.value.id);
        if (_.isEqual(existingEmployee, this.sidebarForm.value)) {
          this.msgs.push({severity: 'warn', summary: '', detail: 'No data was changed!'});
          return;
        } else {
          this.employees[this.employees.indexOf(existingEmployee)] = this.sidebarForm.value;
        }
      } else {
        this.sidebarForm.value.id = this.employees.sort((emp1, emp2) => emp1.id - emp2.id)[this.employees.length - 1].id + 1;
        this.employees = [...this.employees, this.sidebarForm.value];
      }
      this.display = false;
      this.lowerLeftNotification = [];
      this.lowerLeftNotification.push(
        {
          severity: 'success',
          summary: 'Success: ',
          detail: `Data has been ${this.formType === 'Update' ? 'updated' : 'added'}!`
        }
      );
    } else {
      this.msgs.push({severity: 'error', summary: 'Error: ', detail: 'Please complete all required fields!'});
      this.sidebarForm.reset();
    }
  }

  onDeleteRow($event: Event, rowData: any) {
    $event.stopPropagation();
    if (confirm(`Are you sure you want to remove ${rowData.firstName} ${rowData.lastName} from the list of employees?`)) {
      this.employees.splice(this.employees.indexOf(this.employees.find(employee => employee.id === rowData.id)), 1);
    }
  }
}
