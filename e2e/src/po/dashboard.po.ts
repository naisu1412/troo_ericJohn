import { browser, by, element, ElementFinder, until } from "protractor";
import { Employee } from "../model/employee.class";
import { EmployeeDetails } from "../model/interface/employee_details.interface";
import selectors from "../model/selectors/DashboardSelectors";
import { EmployeeFormComponent } from "./employee_form.po";

export class DashboardPage {
  efc: EmployeeFormComponent;
  constructor() {
    this.efc = new EmployeeFormComponent();
  }

  async navigate() {}

  async getRandomTableRow() {}

  async nextPage() {}

  async createEmployee(emp: EmployeeDetails) {
    var emp_add_btn = element(by.css('button[ng-reflect-label="Add"]'));
    var emp_newEmployee_btn = element(
      by.css('button[ng-reflect-label="New Employee"]')
    );

    emp_newEmployee_btn.click();
    this.efc.fill(emp);
    emp_add_btn.click();
  }

  async updateEmployee(
    emp_updated: EmployeeDetails,
    row: Number,
    page: Number = 1
  ) {
    var emp_update_btn = element(by.css('button[ng-reflect-label="Update"]'));
    var emp_update_row_btn = element(
      by.css(
        `.ui-table tr.ui-selectable-row:nth-child(${row}) button[label='Edit']`
      )
    );

    emp_update_row_btn.click();
    this.efc.fill(emp_updated);
    browser.sleep(1000);
    emp_update_btn.click().then(function () {
      element(by.css(".ui-widget .ui-messages-close")).click();
    });
  }

  async readEmployee(emp: EmployeeDetails, row: Number, page: Number = 1) {
    let { first_name, last_name, gender } = emp;

    let empRow = `.ui-table tr.ui-selectable-row:nth-child(${row})`;

    expect(element(by.css(`${empRow} td:nth-child(1)`)).getText()).toBe(
      first_name
    );
    expect(element(by.css(`${empRow} td:nth-child(2)`)).getText()).toBe(
      last_name
    );
    expect(element(by.css(`${empRow} td:nth-child(3)`)).getText()).toBe(gender);
  }

  async deleteEmployee(row: Number, page: Number = 0) {
    var emp_delete_row_btn = element(
      by.css(
        `.ui-table tr.ui-selectable-row:nth-child(${row}) button[label='Delete']`
      )
    );

    emp_delete_row_btn.click();
    browser.switchTo().alert().accept();
    element.all(by.css(".ui-table tr.ui-selectable-row")).then((employees) => {
      expect(employees.length).toBe(1);
    });
    browser.sleep(3000);
  }
}
