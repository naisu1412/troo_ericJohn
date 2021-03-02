import { Employee } from '../models/employee.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee: Employee[] = [
    {
      id: 0,
      firstName: 'Saido',
      lastName: 'Chesto',
      country: 'Japan',
      nationality: 'Japanese',
      company: 'Facebook',
      designation: 'Gym Instructor',
      workExp: 99
    }
  ];

  constructor() { }

  getEmployees() {
    return this.employee.slice();
  }
}