import { browser, by, element, ElementFinder, until } from "protractor";
import { Employee } from "../model/employee.class";
import { EmployeeDetails } from "../model/interface/employee_details.interface";

export class DashboardPage {
  constructor() {}

  async navigate() {}

  async getRandomTableRow() {}

  async nextPage() {}

  async _fillRequiredFields(emp: EmployeeDetails) {
    let { first_name, last_name, gender, birth_date, nationality } = emp;

    var emp_firstName_input = element(
      by.css('input[formcontrolname="firstName"]')
    );
    var emp_lastName_input = element(
      by.css('input[formcontrolname="lastName"]')
    );
    var emp_gender_ddown = element(
      by.css('p-dropdown[formcontrolname="gender"]')
    );
    var emp_birthDate_input = element(
      by.css('input[formcontrolname="birthDate"]')
    );
    var emp_nationality_ddown = element(
      by.css('p-dropdown[formcontrolname="nationality"]')
    );

    emp_firstName_input.clear();
    emp_lastName_input.clear();
    emp_birthDate_input.clear();

    emp_firstName_input.sendKeys(first_name);
    emp_lastName_input.sendKeys(last_name);

    emp_gender_ddown.click();
    element(by.css(`li[aria-label=${gender}]`)).click();

    emp_birthDate_input.sendKeys(birth_date);

    emp_nationality_ddown.click();
    element(by.css(`li[aria-label=${nationality}]`)).click();
  }

//   async _waitForNotificationAndClose() {
//     browser.sleep(1000);

//     var widget_dialog = element(by.css(".ui-widget .ui-messages-close"));

//     // widget_dialog.click();
//   }

  async createEmployee(emp: EmployeeDetails) {
    var emp_add_btn = element(by.css('button[ng-reflect-label="Add"]'));
    var emp_close_btn = element(by.css(".ui-sidebar-left .ui-sidebar-close"));
    var emp_newEmployee_btn = element(
      by.css('button[ng-reflect-label="New Employee"]')
    );

    emp_newEmployee_btn.click();
    this._fillRequiredFields(emp);

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

    this._fillRequiredFields(emp_updated);
    browser.sleep(1000);
    emp_update_btn.click();
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

  async deleteEmploye(emp: EmployeeDetails, row: Number) {
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
  }
}
