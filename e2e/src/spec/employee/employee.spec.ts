import { DashboardPage } from "../../po/dashboard.po";
import { browser, by, element, logging } from "protractor";
import { Employee } from "e2e/src/model/employee.class";
import { EmployeeDetails } from "e2e/src/model/interface/employee_details.interface";
/**
 * Issues Found in app:
 * Bug when clicking clear then updating, does not able to save correctly
 * Bug when selecting Japanese
*/
describe("Employee CRUD", async () => {
  let dashboardPage: DashboardPage;

  let empRecord: EmployeeDetails = {
    first_name: "Eric John",
    last_name: "De Jesus",
    birth_date: "08/02/1996",
    gender: "Male",
    nationality: "Filipino",
  };

  let empRecord_updated: EmployeeDetails = {
    first_name: "Erick John",
    last_name: "DJ",
    birth_date: "02/08/1996",
    gender: "Secret",
    nationality: "Chinese", //
  };

  beforeAll(async () => {
    browser.get("http://localhost:4200/dashboard");
    browser.waitForAngularEnabled(false);
    dashboardPage = new DashboardPage();
  });

  it("should be able to add a new Employee record", async () => {
    dashboardPage.createEmployee(empRecord);
  });

  it("should be able to read an Employee record", async () => {
    dashboardPage.readEmployee(empRecord, 2);
  });

  it("should be able to update an Employee record", async () => {
    dashboardPage.updateEmployee(empRecord_updated, 2);
  });

  it("should be able to read an Updated Employee record", async () => {
    dashboardPage.readEmployee(empRecord_updated, 2);
  });

  it("should be able to delete an Employee record", async () => {
    dashboardPage.deleteEmploye(empRecord_updated, 2);
  });

  //TODO: create assertion for the dialog after creation and update
});
