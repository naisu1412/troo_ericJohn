import { browser, by, element, ElementFinder, protractor } from "protractor";
import { FormFieldsTypes } from "../model/enum/form_fields.enum";
import { EmployeeDetails } from "../model/interface/employee_details.interface";
import { FormFields } from "../model/interface/form.interface";
import { FormComponent } from "./form.po";

export class EmployeeFormComponent extends FormComponent {
    async fill(employee_details: EmployeeDetails) {
        let { first_name, last_name, gender, birth_date, nationality } = employee_details;

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
}