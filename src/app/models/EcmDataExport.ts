export class EcmLogin {
  public Guid: string;
  public Username: string;
  public Password: string;
  public FormId: string;
  public CabinetFolderId: string;
  public EcmConnectionUrl: string;
  public ConnectionFileName: string;
  public IsValidEcmConnection: boolean;
}

export class XmlConnectionFile {
  public DATABASENAME: string;
  public PASSWORD: string;
  public SERVERNAME: string;
  public SQLSERVERNAME: string;
  public UID: string;
  public URL: string;
}

export class EcmCabinets {
  public Id: string;
  public Name: string;
}

export class EcmConnectionStatus {
  public formId: string;
  public isConnected: boolean = false;
  public isSigningIn: boolean = false;
}

export class FormDataValue {
  public FormControlId: number;
  public ShortName: string;
  public EcmIndexGuid?: string;
}

export class ExportIndexInfo {
  public Label: string;
  public IndexValue: any;
  public FieldGuid: string;
  public Description: string;
  public IsDefault: boolean;
  public IsRequired: boolean;
  public IsRestricted: boolean;
  public IsForcedMatch: boolean;
  public SortOrder: number;
  public ValueType: number;
  public SelectListValues: any[];
  public DataValue : string;
}

export class EcmMappingDetail {
  public EcmIndexGuid: string;
  public FormControlId: number;
}

export class EcmMapping {
  public FormGuid: string;
  public EcmCabinetGuid: string;
  public IncludeAttachments: boolean;
  public EcmMappingDetails: EcmMappingDetail[];
}
