import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FormBuilderService } from './form-builder.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CompletedFormsService {

  constructor(
    private http: HttpService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private formsService: FormBuilderService,
    private apiService: ApiService) { }

  public getAllByFormId(id: string, searchQuery: string): Observable<any> {
    let params = new HttpParams()
      .set("pageSize", "100000")
      .set("pageNo", "1")
      .set("isAscending", "true");

    if (searchQuery) {
      params = params.set('searchString', searchQuery);
    }

    let url = this.apiService.get('getAllCompletedFormsByFormId');
    url = url.replace('{formId}', id);
    return this.http.get(url, params);
  }

  public getAllImageOverlayByFormId(id: string, searchQuery: string): Observable<any> {
    let params = new HttpParams()
      .set("pageSize", "100000")
      .set("pageNo", "1")
      .set("isAscending", "true");

    if (searchQuery) {
      params = params.set('searchString', searchQuery);
    }

    let url = this.apiService.get('getAllImageOverlayCompletedFormsByFormId');
    url = url.replace('{formId}', id);
    return this.http.get(url, params);
  }

  public getCompletedFormById(id: string): Observable<any> {
    let url = this.apiService.get('getCompletedFormById');
    url = url.replace('{formId}', id);
    return this.http.get(url);
  }

  public getCompletedSimpleFormsCount(id: string): Observable<any> {
    let url = this.apiService.get('getSimpleCompletedFormsCount');
    url = url.replace('{formId}', id);
    return this.http.get(url);
  }

  public getCompletedImageOverlayFormsCount(id: string): Observable<any> {
    let url = this.apiService.get('getImageOverlayCompletedFormsCount');
    url = url.replace('{formId}', id);
    return this.http.get(url);
  }

  public getImageOverlayCompletedFormById(id: string): Observable<any> {
    let url = this.apiService.get('getImageOverlayCompletedFormById');
    url = url.replace('{formId}', id);
    return this.http.get(url);
  }

  public exportToCSV(formId: string, completedFormIds: string[]): Observable<any> {
    let url = this.apiService.get('exportCompletedFormsToCSV');
    url = url.replace('{formId}', formId);
    return this.http.postWithOptions(url, { Ids: completedFormIds }, { responseType: 'text', observe: 'response' });
  }

  public exportImageOverlayToCSV(formId: string, completedFormIds: string[]): Observable<any> {
    let url = this.apiService.get('exportImageOverlayCompletedFormsToCSV');
    url = url.replace('{formId}', formId);
    return this.http.postWithOptions(url, { Ids: completedFormIds }, { responseType: 'text', observe: 'response' });
  }

  public downloadAttachments(completedFormId: string, controlId: string): Observable<any> {
    let url = this.apiService.get('downloadAttachmentsByControlId');
    url = url.replace('{completedFormId}', completedFormId);
    url = url.replace('{controlId}', controlId);
    return this.http.getWithOptions(url, { responseType: 'arraybuffer', observe: 'response' });
  }

  public downloadImageOverlayAttachments(completedFormId: string, controlId: string): Observable<any> {
    let url = this.apiService.get('downloadImageOverlayAttachmentsByControlId');
    url = url.replace('{completedFormId}', completedFormId);
    url = url.replace('{controlId}', controlId);
    return this.http.getWithOptions(url, { responseType: 'arraybuffer', observe: 'response' });
  }

  public downloadAllCompletedForms(body: any): Observable<any> {
    let url = this.apiService.get('exportAsZip');
    return this.http.postWithOptions(url, body, { responseType: 'arraybuffer', observe: 'response' });
  }

  public mapFormData(response: any): any {

    // create form object to show for user
    const formForFrontEnd = {
      title: response.Title,
      description: response.Description,
      rows: [],
    };

    // loop over all form rows
    response.Rows.forEach((row: any) => {

      // create row object
      const newRow = { columns: [] };

      // loop over all columns in a row
      row.Columns.forEach((column: any) => {

        // check if control is input box or text area
        const isInputControl = (column.Controls as any[]).some(
          (control) => [0, 1, 2, 3, 4, 13, 14, 16].indexOf(control.ControlType) != -1
        );

        // check if control is input box or text area
        const isMediaControl = (column.Controls as any[]).some(
          (control) => [6, 7, 8].indexOf(control.ControlType) != -1
        );

        // check if control is input box or text area
        const isAttachmentControl = (column.Controls as any[]).some(
          (control) => [15].indexOf(control.ControlType) != -1
        );

        // create column object
        const newColumn: any = {
          width: this.formsService.getColumnWidth(column.ColumnType),
          control: null,
        };

        // do not move forward if control type is media
        // if (isMediaControl) return;

        if (isInputControl) {

          // map and get value for control type
          let controlType = this.formsService.lookup.ControlType.find(
            (ct: any) => ct.Value === column.Controls[0].ControlType
          );

          // create new control object
          const newControl: any = {
            id: this.formsService.getRandomId(),
            type: "input_text",
            input_type: controlType.Name.toLowerCase(),
            options: [],
          };

          // loop over all controls in a column
          column.Controls.forEach((control: any) => {
            const newOption: any = {
              id: control.Id,
              label: control.DisplayText,
              value: control.Value,
            };

            // add created option in column options array
            newControl.options.push(newOption);
          });

          // set created control in/to column
          newColumn.control = newControl;
        }
        else if (isAttachmentControl) {
          // get/map alignment value
          const controlAlignment = this.formsService.lookup.ControlAlignment.find(
            (ct: any) => ct.Value == column.Alignment
          );

          // get/map layout value
          const controlLayout = this.formsService.lookup.ControlLayout.find(
            (ct: any) => ct.Value == column.Layout
          );

          // create new control object
          const newControl: any = {
            id: this.formsService.getRandomId(),
            type: 'attachment',
            layout: controlLayout.Name.toLowerCase(),
            align: controlAlignment.Name.toLowerCase(),
            options: []
          };

          // loop over all controls in a column
          column.Controls.forEach((control: any) => {
            newControl.options.push(control);
          });

          // set created control in/to column
          newColumn.control = newControl;
        }
        else {
          // loop over all controls in a column
          column.Controls.forEach((control: any) => {

            // map and get value for control type
            let controlType = this.formsService.lookup.ControlType.find(
              (ct: any) => ct.Value === control.ControlType
            );

            // do not move forward if control type is button
            if (controlType.Name.toLowerCase() === 'button' || controlType.Name.toLowerCase() === 'video' || controlType.Name.toLowerCase() === 'audio') return;

            // create new control object
            const newControl: any = {
              id: control.Id,
              type: controlType.Name.toLowerCase(),
            };

            // if control is radio or checkbox
            if (newControl.type === "radio" || newControl.type === "checkbox") {

              // set control specific properties
              newControl.label = control.DisplayText;
              newControl.value = control.Value;

              newControl.options = [];

              // loop over options
              control.Options.forEach((op: any) => {
                const newOption: any = {
                  id: op.Id,
                  label: op.DisplayText,
                  value: op.Id.toString(),
                };

                // add created option in control options
                newControl.options.push(newOption);
              });
            }
            // if control type is multiple choice
            if (newControl.type === "multiple choice") {

              // set control specific properties
              newControl.label = control.DisplayText;
              newControl.multipleSelection = control.IsMultiSelect;

              // set control value based on multi selection
              if (newControl.multipleSelection) {
                newControl.value = control.Value.split(',');
              }
              else {
                newControl.value = control.Value;
              }

              // map and get value for display type
              let displayType = this.formsService.lookup.MultipleChoiceDisplayType.find(
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
                  value: op.Id.toString(),
                  checked: false,
                };

                // add created option in control options
                newControl.options.push(newOption);
              });
            }
            // if control type is signature
            if (newControl.type === "signature") {

              // set control specific mapping
              newControl.sub_type = "image";

              // if control value is array and has at least 1 value
              if (control.Value[0]) {

                // get Url form first value of array
                newControl.url = control.Value[0].Url;
              }

              newControl.size = {
                width: parseInt(control.Setting.Width),
                height: parseInt(control.Setting.Height),
              };

              // get/map alignment value
              const controlAlignment = this.formsService.lookup.ControlAlignment.find(
                (ct: any) => ct.Value == column.Alignment
              );

              // set control alignment
              newControl.align = controlAlignment.Name.toLowerCase();
            }
            // if control type is media
            if (newControl.type === "image") {

              // set control specific properties
              newControl.url = control.Setting.Url;
              newControl.Setting = control.Setting;

              newControl.size = {
                width: parseInt(control.Setting.Width),
                height: parseInt(control.Setting.Height),
              };

              // get/map alignment value
              const controlAlignment = this.formsService.lookup.ControlAlignment.find(
                (ct: any) => ct.Value == column.Alignment
              );

              // set alig of control
              newControl.align = controlAlignment.Name.toLowerCase();
            }

            // set control in/to column
            newColumn.control = newControl;
          });
        }

        newRow.columns.push(newColumn);
      });

      // add created row in form if row contains at least 1 column
      if (newRow && newRow.columns.length > 0) {
        formForFrontEnd.rows.push(newRow);
      }
    });

    // remove any row that contains no column having a control
    formForFrontEnd.rows = formForFrontEnd.rows.filter((row: any) => {
      return (row.columns as any[]).some((col: any) => col.control);
    });

    // set component form property to mapped form structure
    return formForFrontEnd;
  }

  public mapImageOverlayFormData(response: any): any {

    // create form object to show for user
    const formForFrontEnd = {
      title: response.Title,
      description: response.Description,
      imageUrl: response.ImageUrl,
      placeholders: [],
    };

    // loop over all form rows
    response.Placeholders.forEach((placeholder: any) => {

      // create placeholder object
      const newPlaceholder: any = {
        id: placeholder.PlaceholderId,
        Height: placeholder.Height + 10,
        Width: placeholder.Width,
        XCoordinate: placeholder.XCoordinate,
        YCoordinate: placeholder.YCoordinate,
      };

      // check if control is input box or text area
      const isInputControl = (placeholder.Controls as any[]).some(
        (control) => [0, 1, 2, 3, 4, 13, 14].indexOf(control.ControlType) != -1
      );

      // check if control is input box or text area
      const isAttachmentControl = (placeholder.Controls as any[]).some(
        (control) => [15].indexOf(control.ControlType) != -1
      );

      if (isInputControl) {
        // map and get value for control type
        let controlType = this.formsService.lookup.ControlType.find(
          (ct: any) => ct.Value === placeholder.Controls[0].ControlType
        );

        // create new control object
        const newControl: any = {
          id: this.formsService.getRandomId(),
          type: "input_text",
          input_type: controlType.Name.toLowerCase(),
          options: [],
        };

        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {
          const newOption: any = {
            id: control.Id,
            label: control.DisplayText,
            value: control.Value,
            Height: control.Height,
            Width: control.Width,
            XCoordinate: control.XCoordinate,
            YCoordinate: control.YCoordinate,
          };

          // add created option in column options array
          newControl.options.push(newOption);
        });

        // set created control in/to column
        newPlaceholder.control = newControl;
      }
      else if (isAttachmentControl) {
        // get/map alignment value
        const controlAlignment = this.formsService.lookup.ControlAlignment.find(
          (ct: any) => ct.Value == placeholder.Alignment
        );

        // get/map layout value
        const controlLayout = this.formsService.lookup.ControlLayout.find(
          (ct: any) => ct.Value == placeholder.Layout
        );

        // create new control object
        const newControl: any = {
          id: this.formsService.getRandomId(),
          type: 'attachment',
          layout: controlLayout.Name.toLowerCase(),
          align: controlAlignment.Name.toLowerCase(),
          options: []
        };

        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {
          newControl.options.push(control);
        });

        // set created control in/to column
        newPlaceholder.control = newControl;
      }
      else {
        // loop over all controls in a column
        placeholder.Controls.forEach((control: any) => {

          // map and get value for control type
          let controlType = this.formsService.lookup.ControlType.find(
            (ct: any) => ct.Value === control.ControlType
          );

          // do not move forward if control type is button
          if (controlType.Name.toLowerCase() === 'button') return;

          // create new control object
          const newControl: any = {
            id: control.Id,
            type: controlType.Name.toLowerCase(),
          };

          // if control is radio or checkbox
          if (newControl.type === "radio" || newControl.type === "checkbox") {

            // set control specific properties
            newControl.label = control.DisplayText;
            newControl.value = control.Value;

            newControl.options = [];

            // loop over options
            control.Options.forEach((op: any) => {
              const newOption: any = {
                id: op.Id,
                label: op.DisplayText,
                value: op.Id.toString(),
                Height: op.Height,
                Width: op.Width,
                XCoordinate: op.XCoordinate,
                YCoordinate: op.YCoordinate,
              };

              // add created option in control options
              newControl.options.push(newOption);
            });
          }
          // if control type is multiple choice
          if (newControl.type === "multiple choice") {

            // set control specific properties
            newControl.label = control.DisplayText;
            newControl.multipleSelection = control.IsMultiSelect;

            // set control value based on multi selection
            if (newControl.multipleSelection) {
              newControl.value = control.Value.split(',');
            }
            else {
              newControl.value = control.Value;
            }

            // map and get value for display type
            let displayType = this.formsService.lookup.MultipleChoiceDisplayType.find(
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
                value: op.Id.toString(),
                checked: false,
                Height: op.Height,
                Width: op.Width,
                XCoordinate: op.XCoordinate,
                YCoordinate: op.YCoordinate,
              };

              // add created option in control options
              newControl.options.push(newOption);
            });
          }
          // if control type is signature
          if (newControl.type === "signature") {

            // set control specific mapping
            newControl.sub_type = "image";

            // if control value is array and has at least 1 value
            if (control.Value[0]) {

              // get Url form first value of array
              newControl.url = control.Value[0].Url;
            }

            newControl.size = {
              width: parseInt(control.Setting.Width),
              height: parseInt(control.Setting.Height),
            };

            // get/map alignment value
            const controlAlignment = this.formsService.lookup.ControlAlignment.find(
              (ct: any) => ct.Value == placeholder.Alignment
            );

            // set control alignment
            newControl.align = controlAlignment.Name.toLowerCase();
          }

          // set control in/to column
          newPlaceholder.control = newControl;
        });
      }

      // add created row in form if row contains at least 1 column
      if (newPlaceholder && newPlaceholder.control) {
        formForFrontEnd.placeholders.push(newPlaceholder);
      }
    });

    // set component form property to mapped form structure
    return formForFrontEnd;
  }


  public getFileNameFromHeader(headers: HttpHeaders): string {
    let filename: string;

    // if header contains content disposition
    if (headers.get('content-disposition')) {

      // get filename content disposition header and split it in pars using ';'
      const contentDisposition: string = headers.get('content-disposition').split(';')[1];

      // if filename content disposition string available
      if (contentDisposition) {

        // split header string using '=' and get 2nd part
        filename = contentDisposition.trim().split('=')[1];

        // if file name available
        if (filename) {

          // replace quotes with empty string
          filename = filename.replace(/"/g, '');
        }
      }
    }

    // return created file name
    return filename;
  }

  public downloadAttachment(attachment: any): void {
    // show loading spinner
    this.spinner.show();

    // fetch resource blob from URL
    fetch(attachment.Url)
      .then(response => response.blob())
      .then((myBlob) => {
        // create anchor tag
        const anchor: HTMLAnchorElement = document.createElement("a");

        // create URL for downloading
        const url = URL.createObjectURL(myBlob);

        // set link hyper reference / url
        anchor.href = url;

        // set name of file to provided name or default
        anchor.download = `${attachment.FileName}${attachment.Extension}`;

        // trigger link click
        anchor.click();

        // remove created object URL
        URL.revokeObjectURL(url);

        // hide loading spinner
        this.spinner.hide();
      });
  }

  public downloadAllAttachments(formType: string, completedFormId: string, control: any): void {
    // show loading spinner
    this.spinner.show();

    let apiCall: Observable<any>;

    if (formType === 'simpleForms') {
      apiCall = this.downloadAttachments(completedFormId, control.Id);
    }
    else {
      apiCall = this.downloadImageOverlayAttachments(completedFormId, control.Id);
    }

    // send API call to get all attachments
    apiCall.subscribe((response) => {

      // get response headers
      const headers: HttpHeaders = response.headers;

      // create anchor tag
      const anchor: HTMLAnchorElement = document.createElement("a");

      // get file name from content-disposition response headers
      let filename: string = this.getFileNameFromHeader(headers);

      // set name of file to provided name or default
      anchor.download = filename || "data.zip";

      // create blob from response body
      const blob: Blob = new Blob([response.body], { type: headers.get('content-type') });

      // create URL for downloading
      const url: string = window.URL.createObjectURL(blob);

      // set link hyper reference / url
      anchor.href = url;

      // trigger link click
      anchor.click();

      // remove created object URL
      URL.revokeObjectURL(url);

      // hide loading spinner
      this.spinner.hide();
    }, (err) => {
      try {
        // parse error message to json
        const error = JSON.parse(err.error);

        // show alert if message is available
        if (error.Message) {
          this.snackBar.open(error.Message, this.translateService.instant('NOTIFICATIONS.INFORMATION'));
        }
      } catch (error) { }
    });
  }

  public downloadAllRespondedForms(data : any): void {
    // show loading spinner
    this.spinner.show();

    let apiCall: Observable<any>;

    apiCall = this.downloadAllCompletedForms(data);

    // send API call to get all attachments
    apiCall.subscribe((response) => {
      // get response headers
      const headers: HttpHeaders = response.headers;

      // create anchor tag
      const anchor: HTMLAnchorElement = document.createElement("a");

      // get file name from content-disposition response headers
      let filename: string = this.getFileNameFromHeader(headers);

      // set name of file to provided name or default
      anchor.download = filename || "data.zip";

      // create blob from response body
      const blob: Blob = new Blob([response.body], { type: headers.get('content-type') });

      // create URL for downloading
      const url: string = window.URL.createObjectURL(blob);

      // set link hyper reference / url
      anchor.href = url;

      // trigger link click
      anchor.click();

      // remove created object URL
      URL.revokeObjectURL(url);

      // hide loading spinner
      this.spinner.hide();
    }, (err) => {
      try {

        debugger
        // parse error message to json
        const error = JSON.parse(err.error);

        // show alert if message is available
        if (error.Message) {
          this.snackBar.open(error.Message, this.translateService.instant('NOTIFICATIONS.INFORMATION'));
        }
      } catch (error) { }
    });
  }

  public viewAttachment(attachment: any): void {
    // create anchor tag
    const anchor: HTMLAnchorElement = document.createElement("a");

    // set link hyper reference / url
    anchor.href = attachment.Url;

    // open file in new browser tab
    anchor.target = '_blank';

    // trigger link click
    anchor.click();
  }

  public canViewAttachement(attachment: any): boolean {
    return ['.WAV', '.MOV', '.AVI', '.DXF', '.DWA', '.ZIP', '.CSV', '.RAR', '.TIF', '.TIFF', '.DOCX', '.XLSX', '.PPTX']
      .indexOf(attachment.Extension.toUpperCase()) === -1;
  }

  public canPrintAttachement(attachment: any): boolean {
    return !(['.PDF', '.PNG', '.JPG', '.JPEG', '.TXT', '.HTML']
      .indexOf(attachment.Extension.toUpperCase()) === -1);
  }

  public getAttachmentIcon(attachment: any): string {
    let extension: string = (<string>attachment.Extension).substr(1, attachment.Extension.length).toLowerCase();
    if (extension === 'jpeg') extension = 'jpg';
    if (extension === 'tiff') extension = 'tif';
    if (extension === 'rar') extension = 'zip';

    return `./assets/icons/files/${extension}.png`;
  }
}
