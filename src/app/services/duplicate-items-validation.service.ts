import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DuplicateItemsValidationService {
  private isValid: boolean = true;
  private validationArray: any[] = [];

  public validateFormShortName(form: any) {
    if (!form.IsEcmExportEnabled) return true;

    this.validationArray = [];
    this.isValid = true;

    form.rows.map((row) =>
      row.columns.map((column) => {
        if (!this.isValid) return;
        const { control } = column;
        if (control) {
          if (control.type === "input_text") {
            control.options.map((op) => {
              this.isValid = op.shortName
                ? this.validateDuplicateValues(op.shortName)
                : true;
            });
          }
          if (
            control.type === "radio" ||
            control.type === "checkbox list" ||
            control.type === "checkbox"
          ) {
            this.isValid = control.shortName
              ? this.validateDuplicateValues(control.shortName)
              : true;
          }
        }
      })
    );

    return this.isValid;
  }

  private validateDuplicateValues(value: any) {
    if (value) {
      let index = this.validationArray.findIndex((x) => x === value);

      if (index > -1) {
        return false;
      }
      this.validationArray.push(value);
      return true;
    }
  }
}
