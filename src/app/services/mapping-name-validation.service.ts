import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MappingNameValidationService {
  private isValid: boolean = true;

  private valid : any[] =[];
  private shortNames: any[] = [];

  public validateFormShortName(form: any) {
    if (!form.IsEcmExportEnabled) return true;

    this.shortNames = [];
    form.rows.map((row) =>
      row.columns.map((column) => {
        const { control } = column;
        this.validateControl(control);
      })
    );

    return this.isValid;
  }

  public validateImageOverlayFormShortName(form: any) {
    if (!form.IsEcmExportEnabled) return true;

    this.shortNames = [];

    form.placeholders.map((placeholder) => {
      const { control } = placeholder;
      var isValid = this.validateControl(control);
      this.valid.push(isValid);
    });

    for (var i = 0; i < this.valid.length; i++) {
      if (this.valid[i] === false) {
        this.isValid = false;
        break;
      }
      else {
        this.isValid = true;
      }
    }
    this.valid = [];

    return this.isValid;
  }

  private validateShortName(shortName) {
    if (shortName) {
      let index = this.shortNames.findIndex((x) => x === shortName);

      if (index > -1) {
        return false;
      }
      this.shortNames.push(shortName);
      return true;
    }
    else
    {
      return true;
    }
  }

  private validateControl(control: any) {
    if (control) {
      if (control.type === "input_text") {
        control.options.map((op) => {

          if (op.shortName != undefined) {
            this.isValid = this.validateShortName(op.shortName);
          }
          else {
            this.isValid = true;
          }
        });
      } else {
        this.isValid = this.validateShortName(control.shortName);
      }
    }
    return this.isValid;
  }
}
