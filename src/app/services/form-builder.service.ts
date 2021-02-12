import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import cloneDeep from "lodash/cloneDeep";
import { Observable, Subject } from "rxjs";
import { ApiService } from "./api.service";
import * as FormControls from "./form-controls.json";
import { HttpService } from "./http.service";
import * as ImageOverlayFormControls from "./image-overlay-form-controls.json";

@Injectable({
  providedIn: "root",
})
export class FormBuilderService {

  public showPopover: boolean = false;
  public editRowIndex: number = null;
  public currentFormState: object;
  public popovers: any = {
    add_row: false,
    add_radio: false,
    add_media: false,
    add_text: false,
    add_list: false,
    add_signature: false,
    add_buttons: false,
    add_attachment: false,
  };

  public COLUMN_SELECTION_REQUIRED_MESSAGE = "Please select column to add.";
  public onSignatureControlUpdated = new Subject<any>();
  public onTogglePreview = new Subject<any>();
  public popupConfirm = new Subject<any>();
  public navigateAway = new Subject<any>();

  private undoRedoMaxThreshold = 5; // user can undo redo 5 steps max
  private undoArray: Array<object> = []; //form object Array
  private redoArray: Array<object> = []; //form object Array

  public lookup: any;

  constructor(
    private translateService: TranslateService,
    private apiService: ApiService,
    private http: HttpService,
    private httpService: HttpClient) { }

  public getFormControl(controlName: string): any {
    // get and return default json object for specified control
    return (FormControls as any).default[controlName];
  }

  public getImageOverlayFormControl(controlName: string): any {
    // get and return default json object for specified control
    return (ImageOverlayFormControls as any).default[controlName];
  }

  public getRow(type: string) {
    // generate random id
    const randomId: string = this.getRandomId();

    switch (type) {
      // full width row with single column
      case "1":
        return {
          id: randomId,
          columns: [
            { id: this.getRandomId(), width: 100, control: null, type: 0 },
          ],
        };
      // row with equaly divided 2 columns
      case "2":
        return {
          id: randomId,
          columns: [
            { id: this.getRandomId(), width: 50, control: null, type: 1 },
            { id: this.getRandomId(), width: 50, control: null, type: 1 },
          ],
        };
      // row with 2 columns, first column 25% and second column 75%
      case "3":
        return {
          id: randomId,
          columns: [
            { id: this.getRandomId(), width: 25, control: null, type: 2 },
            { id: this.getRandomId(), width: 75, control: null, type: 3 },
          ],
        };
      // row with 2 columns, first column 75% and second column 25%
      case "4":
        return {
          id: randomId,
          columns: [
            { id: this.getRandomId(), width: 75, control: null, type: 3 },
            { id: this.getRandomId(), width: 25, control: null, type: 2 },
          ],
        };
    }
  }

  public getColumnWidth(columnType: any): number {
    // check column type and return width in percentage
    switch (columnType) {
      case 0:
        return 100;
      case 1:
        return 50;
      case 2:
        return 25;
      case 3:
        return 75;
    }
  }

  public getRandomId(): string {
    // generate and return random number/id
    return Math.random().toString(36).substr(2, 16);
  }

  public toggleControlsPopover(name: string): void {
    // iterate over all popovers
    for (const key in this.popovers) {
      if (name === key) {
        // toggle popover visibility
        this.popovers[name] = !this.popovers[name];

        // if popover is closed remove selected row index
        if (!this.popovers[name]) {
          this.editRowIndex = null;
        }
      }
      else {
        // hide popover
        this.popovers[key] = false;
      }
    }
  }

  public upload(formData: FormData): Observable<any> {
    // send APi call to upload image
    return this.http.post(this.apiService.get("uploadMedia"), formData, {
      skipContentType: "true",
    });
  }

  public uploadSignature(token: string, sessionId: string, formData: FormData): Observable<any> {
    let url = this.apiService.get("uploadSignature");
    url = url.replace('{slug}', token);
    url = url.replace('{sessionId}', sessionId);

    // send APi call to upload signature
    return this.http.post(url, formData, {
      skipContentType: "true",
    });
  }

  public uploadAttachments(token: string, sessionId: string, controlId: string, formData: FormData): Observable<any> {
    let url = this.apiService.get("uploadAttachments");
    url = url.replace('{slug}', token);
    url = url.replace('{sessionId}', sessionId);
    url = url.replace('{controlId}', controlId);

    // send APi call to upload signature
    return this.http.postWithOptions(url, formData, {
      headers: { skipContentType: "true" },
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUploadedAttachment(token: string, sessionId: string, fileId : string): Observable<any> {
    let url = this.apiService.get("deleteUploadedAttachment");
    url = url.replace('{slug}', token);
    url = url.replace('{sessionId}', sessionId);
    url = url.replace('{fileId}', fileId);

    // send APi call to delete uploaded attachment
    return this.http.delete(url);
  }

  public addActiontoUndoArray(form: object) {
    if (this.undoArray.length < this.undoRedoMaxThreshold) {
      this.undoArray.push(form);
    } else {
      this.undoArray.shift();
      this.undoArray.push(form);
    }
  }

  public addActiontoRedoArray(form: object) {
    if (this.redoArray.length < this.undoRedoMaxThreshold) {
      this.redoArray.push(form);
    } else {
      this.redoArray.shift();
      this.redoArray.push(form);
    }
  }

  public getActionFromUndoArray(currentFormState: object) {
    if (this.undoArray.length > 0) {
      const form = cloneDeep(this.undoArray.pop());
      const redoForm = cloneDeep(currentFormState);
      this.addActiontoRedoArray(redoForm);
      return form;
    } else {
      return null;
    }
  }

  public getActionFromRedoArray(currentFormState: object) {
    if (this.redoArray.length > 0) {
      const form = cloneDeep(this.redoArray.pop());
      const undoForm = cloneDeep(currentFormState);
      this.addActiontoUndoArray(undoForm);
      return form;
    } else {
      return null;
    }
  }

  public clearRedoArray() {
    this.redoArray = [];
  }

  public validateNumber(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  public saveForm(form: any): Observable<any> {
    return this.http.post(this.apiService.get("saveForm"), form);
  }

  public editForm(form: any, id: string): Observable<any> {
    return this.http.put(`${this.apiService.get("saveForm")}/${id}`, form);
  }

  public editImageOverlayForm(form: any, id: string): Observable<any> {
    return this.http.put(`${this.apiService.get("imageOverlayForm")}/${id}`, form);
  }

  public editSimpleFormTemplate(form: any, id: string): Observable<any> {
    return this.http.put(`${this.apiService.get("editSimpleFormTemplate")}/${id}`, form);
  }

  public editImageOverlayFormTemplate(form: any, id: string): Observable<any> {
    return this.http.put(`${this.apiService.get("editImageOverlayFormTemplate")}/${id}`, form);
  }

  public getLookup(): Observable<any> {
    return this.http.get(this.apiService.get("lookup"));
  }

  public getCabinets() {
    return this.http.get(this.apiService.get("getCabinets"));
  }

  public getCabinetsWithPermissions() {
    return this.http.get(this.apiService.get("getCabinetsWithPermissions"));
  }

  public getCabinetWithPermissions(id: string) {
    let url = this.apiService.get("getCabinetWithPermissions");
    url = url.replace('{cabinetId}', id);
    return this.http.get(url);
  }

  public getPagedCabinets(queryParams?: any) {
    let params = new HttpParams()
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo);
    return this.http.get(this.apiService.get("getPagedCabinets"), params);
  }

  public deleteCabinetById(id: string): Observable<any> {
    return this.http.delete(`${this.apiService.get("deleteCabinetById")}/${id}`);
  }

  public mapFormData(response: any): any {
    // create form object to show for user
    const formForFrontEnd = {
      title: response.Title,
      description: response.Description,
      IsReCaptchaEnabled: response.IsReCaptchaEnabled,
      ReCaptchaToken: response.ReCaptchaToken,
      rows: [],
    };

    // loop over all form rows
    response.Rows.forEach((row: any) => {
      // create row object
      const newRow = {
        id: this.getRandomId(),
        columns: [],
      };

      // loop over all columns in a row
      row.Columns.forEach((column: any) => {
        // create column object
        const newColumn: any = {
          id: this.getRandomId(),
          width: this.getColumnWidth(column.ColumnType),
          control: null,
          type: column.ColumnType,
        };

        // check if control is button
        const isBtnControl = (column.Controls as any[]).some(
          (control) => control.ButtonType != null
        );

        // check if control is input box or text area
        const isInputControl = (column.Controls as any[]).some(
          (control) => [0, 1, 2, 3, 4, 13, 14, 16].indexOf(control.ControlType) != -1
        );

        // check if control is input box or text area
        const IsAttachmentControl = (column.Controls as any[]).some(
          (control) => [15].indexOf(control.ControlType) != -1
        );

        if (isBtnControl) {
          // get/map alignment value
          const controlAlignment = this.lookup.ControlAlignment.find(
            (ct: any) => ct.Value == column.Alignment
          );

          // get/map layout value
          const controlLayout = this.lookup.ControlLayout.find(
            (ct: any) => ct.Value == column.Layout
          );

          // create new control object
          const newControl: any = {
            id: this.getRandomId(),
            type: "buttons",
            layout: controlLayout.Name.toLowerCase(),
            align: controlAlignment.Name.toLowerCase(),
            controlPlaceholder: this.translateService.instant('BUILDER.BUTTONS.CONTROL_PLACEHOLDER'),
            options: [],
            Setting: column.Controls[0].Setting
          };

          // loop over all controls in a column
          column.Controls.forEach((control: any) => {
            // map and get value for control type
            let buttonType = this.lookup.ButtonType.find(
              (ct: any) => ct.Value === control.ButtonType
            );

            // create new option object
            const newOption: any = {
              id: control.Id,
              type: buttonType.Name.toLowerCase(),
              label: control.DisplayText,
              color: control.Setting.BackgroundColor,
              order: control.Order
            };

            // if button is custom add link property
            if (newOption.type === "custom") {
              newOption.link = control.Setting.Url;
            }

            // add created option in column options array
            newControl.options.push(newOption);
          });

          // set created control in/to column
          newColumn.control = newControl;
        }
        else if (IsAttachmentControl) {
          // get/map alignment value
          const controlAlignment = this.lookup.ControlAlignment.find(
            (ct: any) => ct.Value == column.Alignment
          );

          // get/map layout value
          const controlLayout = this.lookup.ControlLayout.find(
            (ct: any) => ct.Value == column.Layout
          );

          // create new control object
          const newControl: any = {
            id: this.getRandomId(),
            type: "attachment",
            layout: controlLayout.Name.toLowerCase(),
            align: controlAlignment.Name.toLowerCase(),
            controlPlaceholder: this.translateService.instant('BUILDER.ATTACHMENT.CONTROL_PLACEHOLDER'),
            options: [],
            Setting: column.Controls[0].Setting
          };

          // loop over all controls in a column
          column.Controls.forEach((control: any) => {

            // create new option object
            const newOption: any = {
              id: control.Id,
              DisplayText: control.DisplayText,
              Types: control.Setting.SupportedFileTypes ? control.Setting.SupportedFileTypes.split(',') : [],
              MaxFiles: control.Setting.MaxFiles,
              MaxSize: control.Setting.MaxDataSize
            };

            // add created option in column options array
            newControl.options.push(newOption);
          });

          // set created control in/to column
          newColumn.control = newControl;
        }
        else if (isInputControl) {
          // map and get value for control type
          let controlType = this.lookup.ControlType.find(
            (ct: any) => ct.Value === column.Controls[0].ControlType
          );

          // create new control object
          const newControl: any = {
            id: this.getRandomId(),
            type: "input_text",
            input_type: controlType.Name.toLowerCase(),
            controlPlaceholder: this.translateService.instant('BUILDER.INPUT.CONTROL_PLACEHOLDER'),
            options: [],
            Setting: column.Controls[0].Setting
          };

          // loop over all controls in a column
          column.Controls.forEach((control: any) => {
            const newOption: any = {
              id: control.Id,
              label: control.DisplayText,
              required: control.IsRequired,
              value: "",
              shortName: control.ShortName,
              order: control.Order
            };

            // add created option in column options array
            newControl.options.push(newOption);
          });

          // set created control in/to column
          newColumn.control = newControl;
        }
        else {
          // loop over all controls in a column
          column.Controls.forEach((control: any) => {
            // map and get value for control type
            let controlType = this.lookup.ControlType.find(
              (ct: any) => ct.Value === control.ControlType
            );

            // create new control object
            const newControl: any = {
              id: control.Id,
              type: controlType.Name.toLowerCase(),
            };

            // if control is radio or checkbox
            if (newControl.type === "radio" || newControl.type === "checkbox") {
              // set control specific properties
              newControl.label = control.DisplayText;
              newControl.required = control.IsRequired;
              newControl.value = "";
              newControl.controlPlaceholder = this.translateService.instant('BUILDER.RADIO.CONTROL_PLACEHOLDER');
              newControl.Setting = control.Setting;
              newControl.shortName = control.ShortName;
              newControl.order = control.Order;

              newControl.options = [];

              // loop over options
              control.Options.forEach((op: any) => {
                const newOption: any = {
                  id: op.Id,
                  label: op.DisplayText,
                  value: op.DisplayText,
                  checked: false,
                };

                // add created option in control options
                newControl.options.push(newOption);
              });
            }
            // if control type is media
            if (
              newControl.type === "image" ||
              newControl.type === "audio" ||
              newControl.type === "video"
            ) {
              // set control specific properties
              newControl.FileId = control.Setting.FileId;
              newControl.url = control.Setting.Url;
              newControl.controlPlaceholder = this.translateService.instant('BUILDER.MEDIA.CONTROL_PLACEHOLDER');
              newControl.Setting = control.Setting;

              newControl.size = {
                width: parseInt(control.Setting.Width),
                height: parseInt(control.Setting.Height),
              };

              // get/map alignment value
              const controlAlignment = this.lookup.ControlAlignment.find(
                (ct: any) => ct.Value == column.Alignment
              );

              // set alig of control
              newControl.align = controlAlignment.Name.toLowerCase();
            }
            // if control type is multiple choice
            if (newControl.type === "multiple choice") {
              // set control specific properties
              newControl.label = control.DisplayText;
              newControl.required = control.IsRequired;
              newControl.multipleSelection = control.IsMultiSelect;
              newControl.controlPlaceholder = this.translateService.instant('BUILDER.MULTIPLE_SELECTION.CONTROL_PLACEHOLDER');
              newControl.Setting = control.Setting;
              newControl.shortName = control.ShortName;
              newControl.order = control.Order;

              // set control value based on multi selection
              if (newControl.multipleSelection) {
                newControl.value = [];
              }
              else {
                newControl.value = "";
              }

              // map and get value for display type
              let displayType = this.lookup.MultipleChoiceDisplayType.find(
                (ct: any) => ct.Value === control.DisplayType
              );

              // set type of control
              newControl.type = displayType.Name.toLowerCase();

              newControl.options = [];

              // loop over all options of control
              control.Options.forEach((op: any) => {
                const newOption: any = {
                  id: op.Id,
                  label: op.DisplayText,
                  value: op.DisplayText,
                  checked: false,
                };

                // add created option in control options
                newControl.options.push(newOption);
              });
            }
            // if control type is signature
            if (newControl.type === "signature") {
              // set control specific mapping
              newControl.sub_type = "hand";
              newControl.value = "";
              newControl.FileId = control.Setting.FileId;
              newControl.url = control.Setting.Url;
              newControl.controlPlaceholder = this.translateService.instant('BUILDER.SIGNATURE.CONTROL_PLACEHOLDER');
              newControl.Setting = control.Setting;

              newControl.size = {
                width: parseInt(control.Setting.Width),
                height: parseInt(control.Setting.Height),
              };

              // get/map alignment value
              const controlAlignment = this.lookup.ControlAlignment.find(
                (ct: any) => ct.Value == column.Alignment
              );

              // set control alignment
              newControl.align = controlAlignment.Name.toLowerCase();
            }

            // set control in/to column
            newColumn.control = newControl;
          });
        }

        // add created column in row
        newRow.columns.push(newColumn);
      });

      // add created row in form
      formForFrontEnd.rows.push(newRow);
    });

    // set component form property to mapped form structure
    return formForFrontEnd;
  }

  public mapImageOverlayFormData(response: any): any {
    // create form object to show for user
    const formForFrontEnd = {
      title: response.Title,
      description: response.Description,
      IsReCaptchaEnabled: response.IsReCaptchaEnabled,
      ReCaptchaToken: response.ReCaptchaToken,
      imageUrl: response.ImageUrl,
      placeholders: [],
    };

    // loop over all form rows
    response.Placeholders.forEach((placeholder: any) => {

      // create row object
      const newPlaceholder: any = {
        id: placeholder.PlaceholderId,
        Height: placeholder.Height,
        Width: placeholder.Width,
        XCoordinate: placeholder.XCoordinate,
        YCoordinate: placeholder.YCoordinate,
      };

      // check if control is button
      const isBtnControl = (placeholder.Controls as any[]).some(
        (control) => control.ButtonType != null
      );

      // check if control is input box or text area
      const isInputControl = (placeholder.Controls as any[]).some(
        (control) => [0, 1, 2, 3, 4, 13, 14].indexOf(control.ControlType) != -1
      );

      // check if control is input box or text area
      const IsAttachmentControl = (placeholder.Controls as any[]).some(
        (control) => [15].indexOf(control.ControlType) != -1
      );

      if (isBtnControl) {
        // get/map alignment value
        const controlAlignment = this.lookup.ControlAlignment.find(
          (ct: any) => ct.Value == placeholder.Alignment
        );

        // get/map layout value
        const controlLayout = this.lookup.ControlLayout.find(
          (ct: any) => ct.Value == placeholder.Layout
        );

        // create new control object
        const newControl: any = {
          id: this.getRandomId(),
          type: "buttons",
          layout: controlLayout.Name.toLowerCase(),
          align: controlAlignment.Name.toLowerCase(),
          options: [],
          Setting: placeholder.Controls[0].Setting
        };

        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {
          // map and get value for control type
          let buttonType = this.lookup.ButtonType.find(
            (ct: any) => ct.Value === control.ButtonType
          );

          // create new option object
          const newOption: any = {
            id: control.Id,
            type: buttonType.Name.toLowerCase(),
            label: control.DisplayText,
            color: control.Setting.BackgroundColor,
          };

          // if button is custom add link property
          if (newOption.type === "custom") {
            newOption.link = control.Setting.Url;
          }

          // add created option in column options array
          newControl.options.push(newOption);
        });

        // set created control in/to column
        newPlaceholder.control = newControl;
      }
      else if (IsAttachmentControl) {
        // get/map alignment value
        const controlAlignment = this.lookup.ControlAlignment.find(
          (ct: any) => ct.Value == placeholder.Alignment
        );

        // get/map layout value
        const controlLayout = this.lookup.ControlLayout.find(
          (ct: any) => ct.Value == placeholder.Layout
        );

        // create new control object
        const newControl: any = {
          id: this.getRandomId(),
          type: "attachment",
          layout: controlLayout.Name.toLowerCase(),
          align: controlAlignment.Name.toLowerCase(),
          options: [],
          Setting: placeholder.Controls[0].Setting
        };

        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {

          // create new option object
          const newOption: any = {
            id: control.Id,
            DisplayText: control.DisplayText,
            Types: control.Setting.SupportedFileTypes ? control.Setting.SupportedFileTypes.split(',') : [],
            MaxFiles: control.Setting.MaxFiles,
            MaxSize: control.Setting.MaxDataSize
          };

          // add created option in column options array
          newControl.options.push(newOption);
        });

        // set created control in/to column
        newPlaceholder.control = newControl;
      }
      else if (isInputControl) {
        // map and get value for control type
        let controlType = this.lookup.ControlType.find(
          (ct: any) => ct.Value === placeholder.Controls[0].ControlType
        );

        // create new control object
        const newControl: any = {
          id: this.getRandomId(),
          type: "input_text",
          input_type: controlType.Name.toLowerCase(),
          options: [],
          shortName : "",
          Setting: placeholder.Controls[0].Setting
        };

        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {
          const newOption: any = {
            id: control.Id,
            label: control.DisplayText,
            required: control.IsRequired,
            type: this.lookup.ControlType.find(
              (ct: any) => ct.Value === control.ControlType
            ).Name.toLowerCase(),
            value: "",
            XCoordinate: control.XCoordinate,
            YCoordinate: control.YCoordinate,
            Height: control.Height,
            Width: control.Width,
            shortName: control.ShortName
          };

          // add created option in column options array
          newControl.options.push(newOption);
        });

        // set created control in/to column
        newPlaceholder.control = newControl;
      }
      else {
        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {
          // map and get value for control type
          let controlType = this.lookup.ControlType.find(
            (ct: any) => ct.Value === control.ControlType
          );

          // create new control object
          const newControl: any = {
            id: control.Id,
            type: controlType.Name.toLowerCase(),
          };

          // if control is radio or checkbox
          if (newControl.type === "radio" || newControl.type === "checkbox") {
            // set control specific properties
            newControl.label = control.DisplayText;
            newControl.required = control.IsRequired;
            newControl.value = "";
            newControl.Setting = control.Setting;
            newControl.ShortName = control.ShortName;

            newControl.options = [];

            // loop over options
            control.Options.forEach((op: any) => {
              const newOption: any = {
                id: op.Id,
                label: op.DisplayText,
                value: op.DisplayText,
                checked: false,
                XCoordinate: op.XCoordinate,
                YCoordinate: op.YCoordinate,
                Height: op.Height,
                Width: op.Width
              };

              // add created option in control options
              newControl.options.push(newOption);
            });
          }
          // if control type is multiple choice
          if (newControl.type === "multiple choice") {
            // set control specific properties
            newControl.label = control.DisplayText;
            newControl.required = control.IsRequired;
            newControl.multipleSelection = control.IsMultiSelect;
            newControl.Setting = control.Setting;
            newControl.ShortName = control.ShortName;


            // set control value based on multi selection
            if (newControl.multipleSelection) {
              newControl.value = [];
            }
            else {
              newControl.value = "";
            }

            // map and get value for display type
            let displayType = this.lookup.MultipleChoiceDisplayType.find(
              (ct: any) => ct.Value === control.DisplayType
            );

            // set type of control
            newControl.type = displayType.Name.toLowerCase();

            newControl.options = [];

            // loop over all options of control
            control.Options.forEach((op: any) => {
              const newOption: any = {
                id: op.Id,
                label: op.DisplayText,
                value: op.DisplayText,
                checked: false,
                XCoordinate: op.XCoordinate,
                YCoordinate: op.YCoordinate,
                Height: op.Height,
                Width: op.Width
              };

              // add created option in control options
              newControl.options.push(newOption);
            });
          }
          // if control type is signature
          if (newControl.type === "signature") {
            // set control specific mapping
            newControl.sub_type = "hand";
            newControl.value = "";
            newControl.FileId = control.Setting.FileId;
            newControl.url = control.Setting.Url;
            newControl.Setting = control.Setting;

            newControl.size = {
              width: parseInt(control.Setting.Width),
              height: parseInt(control.Setting.Height),
            };

            // get/map alignment value
            const controlAlignment = this.lookup.ControlAlignment.find(
              (ct: any) => ct.Value == placeholder.Alignment
            );

            // set control alignment
            newControl.align = controlAlignment.Name.toLowerCase();
          }

          // set control in/to column
          newPlaceholder.control = newControl;
        });
      }

      // add created row in form
      formForFrontEnd.placeholders.push(newPlaceholder);
    });

    // set component form property to mapped form structure
    return formForFrontEnd;
  }

  public formEditRestricted(form: any): boolean {
    // return true if form is not published but completed to restrict updation of ecm export status
    if(form.Completed > 0 && !form.PublishedToken) {
      return false;
    }
    // return false if form is completed and published to update ecm export status
    if(form.Completed > 0 && form.PublishedToken) {
      return true;
    }
    // return true if form is published
    if(form.Completed === 0 && form.PublishedToken) {
      return true;
    }
  }

  public validEmail(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return false;
  }

  public getButtonControlAlignment(control: any): string {
    switch (control.align) {
      case "left":
        return "flex-start";
      case "center":
        return "center";
      case "right":
        return "flex-end";
    }
  }
}
