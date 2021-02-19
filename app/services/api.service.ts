import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const URLS: any = {
  // authentication
  login: { path: "api/Login" },
  logout: { path: "api/Logout" },
  forgotPassword: { path: "api/ForgotPassword" },
  resetPassword: { path: "api/Account/ResetPassword" },
  changePassword: { path: "api/Account/ChangePassword" },
  updatePassword: { path: "api/Account/UpdatePassword" },
  getSystemLanguage: { path: 'api/Setup/Language' },
  getRefreshToken: { path: 'api/RefreshToken' },

  // role management
  getRolesByCabinetId: { path: "api/Cabinet/{cabinetId}/Role" },
  getRoleByIdWithPermissions: { path: "api/CabinetRole/{roleId}/Permissions" },
  deleteRoleByRoleId: { path: "api/CabinetRole" },
  getRoleUsersById: { path: 'api/CabinetRole/{roleId}/Users' },
  createRole: { path: "api/CabinetRole" },
  createRoleWithPermissions: { path: 'api/CabinetRole/Permissions' },
  editRole: { path: "api/CabinetRole" },
  updateRoleWithPermissions: { path: "api/CabinetRole/{roleId}/Permissions" },
  updateRoleUsers: { path: "api/CabinetRole/{roleId}/Users" },
  getAllPermissions: { path: 'api/CabinetRole/Permissions' },

  // configuration Settings management
  systemConfigurationSmtp: { path: "api/SystemConfiguration/Smtp" },
  systemConfigurationReCaptcha: { path: "api/SystemConfiguration/ReCaptcha" },
  systemConfigurationSessionCleanup: { path: "api/SystemConfiguration/PublishedFormSession" },
  getRecaptcha: { path: "api/SystemConfiguration/ReCaptcha" },

  // users
  users: { path: "api/Account" },
  getPagedUsers: { path: "api/Account/Paged" },
  getUserProfile: { path: "api/Account/Profile" },
  updateUserProfile: { path: "api/Account/Profile" },
  userAvatar: { path: "api/Account/Profile/Avatar" },
  getUserAvatar: { path: "api/Account/{id}/Profile/Avatar" },
  changeUserStatus: { path: "api/Account/Status" },
  isUserExit: {path: "api/Account/CheckUserExist"},
  addUser: {path: "api/Account/AddUser"},
  getUser: {path: "api/Account/Users"},


  //companies managers
  getCompaniesManagers: {path: "api/Company/GetAll"},
  addCompany: {path: "api/Company/Add"},

  

  // Simple forms
  simpleForm: { path: "api/SimpleForm" },
  getSimpleFormById: { path: "api/SimpleForm" },
  getSimpleFormTemplateById: { path: "api/SimpleForm/Template" },

  // Form Library
  deleteMultipleSimpleForms: { path: "api/Cabinet/{cabinetId}/SimpleForm/DeleteAll" },
  deleteMultipleSimpleFormTemplates: { path: "api/Cabinet/{cabinetId}/SimpleForm/Template/DeleteAll" },
  deleteMultipleImageOverlayForms: { path: "api/Cabinet/{cabinetId}/ImageOverlayForm/DeleteAll" },
  deleteMultipleImageOverlayFormTemplates: { path: "api/Cabinet/{cabinetId}/ImageOverlayForm/Template/DeleteAll" },
  getFormUrlAliasAvailable: { path: "api/Form/Published/Alias/Available" },
  saveFormUrlAlias: { path: "api/Form/{formId}/Published/Alias" },
  removeFormUrlAlias: { path: "api/Form/{formId}/Published/Alias/Remove" },
  moveSimpleForm: { path: 'api/SimpleForm/{formId}/Move' },
  moveSimpleFormTemplate: { path: 'api/SimpleForm/Template/{formId}/Move' },
  moveImageOverlayForm: { path: 'api/ImageOverlayForm/{formId}/Move' },
  moveImageOverlayFormTemplate: { path: 'api/ImageOverlayForm/Template/{formId}/Move' },
  saveAsSimpleFormTemplate: { path: 'api/SimpleForm/Template/{id}/Copy' },
  editSimpleFormTemplate: { path: 'api/SimpleForm/Template' },
  getSimpleFormFoldersByCabinet: { path: 'api/Cabinet/{cabinetId}/Folder/SimpleForm' },
  getFormActiveSessions: { path: 'api/Form/{formId}/Published/Session/Exists' },
  getFormTypeById : {path : 'api/Form/{formId}'},

  // Form builder
  uploadMedia: { path: "api/FileStore" },
  uploadSignature: { path: "api/Form/{slug}/{sessionId}/Signature/Upload" },
  uploadAttachments: { path: 'api/Form/{slug}/{sessionId}/{controlId}/Attachment/Upload' },
  deleteUploadedAttachment: { path: 'api/Form/{slug}/{sessionId}/Attachment/{fileId}/Delete' },
  saveForm: { path: "api/SimpleForm" },
  lookup: { path: "api/Lookup" },

  // Form for user
  form: { path: "api/Form" },

  // forms listing in cabinet
  cabinetForms: { path: "api/Cabinet" },
  saveCabinet: { path: "api/Cabinet" },

  // cabinet
  getCabinets: { path: "api/Cabinet" },
  getCabinetDetail: { path: "api/Cabinet/{cabinetId}/Details" },
  getCabinetsWithPermissions: { path: "api/Cabinet/UserPermissions" },
  getCabinetWithPermissions: { path: "api/Cabinet/{cabinetId}/UserPermissions" },
  getCabinetById: { path: "api/Cabinet" },
  getPagedCabinets: { path: "api/Cabinet/Paged" },
  deleteCabinetById: { path: "api/Cabinet" },

  createSimpleFormFolder: { path: "api/CabinetFolder/SimpleForm" },
  createImageOverlayFolder: { path: "api/CabinetFolder/ImageOverlayForm" },
  updateFolder: { path: 'api/CabinetFolder/{id}' },
  createFolder: { path: "api/CabinetFolder/SimpleForm" },
  deleteFolder: { path: "api/CabinetFolder/{id}" },
  getCabinetFolderById: { path: "api/CabinetFolder" },
  getCabinetFolderWithPermissionsById: { path: "api/CabinetFolder/{folderId}/UserPermissions" },

  // dashboard
  setWidgets: { path: 'api/Dashboard/Widgets' },
  getWidgets: { path: 'api/Dashboard/Widgets' },

  // recent forms widget
  getRecentForms: { path: 'api/Dashboard/Widget/RecentForms' },
  setRecentFormFilters: { path: 'api/Dashboard/Widget/RecentForms/Settings' },

  // form details widget
  getFormDetails: { path: 'api/Dashboard/Widget/RecentForm' },

  // analytics
  getFormToShare: { path: 'api/Analytics/Form/{formId}/Share' },
  getFormToken: { path: 'api/Analytics/{token}' },

  // forms sent widget
  getFormsSent: { path: 'api/Dashboard/Widget/FormsSent' },
  setFormsSentFilters: { path: 'api/Dashboard/Widget/FormsSent/Settings' },

  // forms completed widget
  getFormsCompleted: { path: 'api/Dashboard/Widget/FormsCompleted' },
  setFormsCompletedFilters: { path: 'api/Dashboard/Widget/FormsCompleted/Settings' },

  // forms opened widget
  getFormsOpened: { path: 'api/Dashboard/Widget/FormsOpened' },
  setFormsOpenedFilters: { path: 'api/Dashboard/Widget/FormsOpened/Settings' },

  // forms by month widget
  getFormsByMonth: { path: 'api/Dashboard/Widget/FormsByMonth' },
  setFormsByMonthFilters: { path: 'api/Dashboard/Widget/FormsByMonth/Settings' },

  // setup wizard
  getSetupWizardStatus: { path: 'api/Setup/Status' },
  getSetupWizardMailServers: { path: 'api/Lookup/Smtp/Providers' },
  getLanguages: { path: 'api/Lookup/Languages' },
  setLanguage: { path: 'api/Account/{userId}/Language' },
  updateSetupWizardLanguage: { path: 'api/Setup/Language' },
  updateSetupWizardLicense: { path: 'api/Setup/License' },
  updateSetupWizardSql: { path: 'api/Setup/SqlConnection' },
  updateSetupWizardRepository: { path: 'api/Setup/Repository' },
  updateSetupWizardRecaptcha: { path: 'api/Setup/ReCaptcha' },
  updateSetupWizardSmtp: { path: 'api/Setup/Smtp' },
  updateSetupWizardAccount: { path: 'api/Setup/Admin' },

  // completed forms
  getAllCompletedFormsByFormId: { path: 'api/SimpleForm/{formId}/Completed' },
  getCompletedFormById: { path: 'api/SimpleForm/Completed/{formId}' },
  exportCompletedFormsToCSV: { path: 'api/SimpleForm/Completed/{formId}/ExportToCsv' },
  downloadAttachmentsByControlId: { path: 'api/SimpleForm/Completed/{completedFormId}/Attachments/{controlId}' },
  exportAsZip: { path: 'api/SimpleForm/Completed/ExportAsZip'},
  getSimpleCompletedFormsCount: { path: 'api/SimpleForm/CompletedFormsCount/{formId}' },
  getImageOverlayCompletedFormsCount: { path: 'api/ImageOverlayForm/CompletedFormsCount/{formId}' },

  // Image Overlay Forms
  imageOverlayForm: { path: "api/ImageOverlayForm" },
  getSingleImageOverlayFormTemplate: { path: 'api/ImageOverlayForm/Template/{id}' }, 
  uploadImageOverlayFormImage: { path: 'api/ImageOverlayForm/{cabinetId}/Upload' },
  createImageOverlayForm: { path: 'api/ImageOverlayForm' },
  getImageOverlayFormFoldersByCabinet: { path: 'api/Cabinet/{cabinetId}/Folder/ImageOverlayForm' },
  getImageOverlayFormTemplateById: { path: "api/ImageOverlayForm/Template" },
  editImageOverlayFormTemplate: { path: 'api/ImageOverlayForm/Template' },
  getAllImageOverlayCompletedFormsByFormId: { path: 'api/ImageOverlayForm/{formId}/Completed' },
  getImageOverlayCompletedFormById: { path: 'api/ImageOverlayForm/Completed/{formId}' },
  exportImageOverlayCompletedFormsToCSV: { path: 'api/ImageOverlayForm/Completed/{formId}/ExportToCsv' },
  downloadImageOverlayAttachmentsByControlId: { path: 'api/ImageOverlayForm/Completed/{completedFormId}/Attachments/{controlId}' },

  //ECM Connector
  ecmWebConnect: { path: "api/Ecm/Web/Connect" },
  getEcmCabinets: { path: "api/Ecm/Cabinets" },
  getEcmCabinetIndexes: { path: "api/Ecm/Cabinet/{cabinetId}/Indexes" },
  getFormConnection: { path: "api/Ecm/Connection/{formId}" },
  saveMappedIndexes: { path: "api/Ecm/SaveMapping" },
  retransmitPagesToECM: { path: "api/Ecm/ReTransmit" },
  getMappedIndexes: { path: "api/Ecm/GetMapping/{formId}/{ecmCabinetId}" },
  saveEcmUser: { path: "api/Ecm/User" }
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string = "";

  constructor() {
    this.apiUrl = environment.api_url;
  }

  public get(name: string): string {
    return `${this.apiUrl}${URLS[name].path}`;
  }
}
