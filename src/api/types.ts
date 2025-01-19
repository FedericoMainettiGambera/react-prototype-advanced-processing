export interface Subjectslog {
  id: string
  id2: string
  name1: string
  name2: string
  gender: string
  birthdate: string
  loginpayload: Loginpayload
  birthpayload: Birthpayload
  referencepayload: Referencepayload[]
  residencepayload: Residencepayload[]
  companypayload: Companypayload[]
  deleted: any
  updatedate: string
  updateoperatorslogid: string
  menupayload: any
  dashboardpayload: any
  administrativepayload: Administrativepayload
  rolespayload: number[]
  rulespayload: Rulespayload
  biopayload: Biopayload
  visible: boolean
  enabled: boolean
  notes1: any
  notes2: any
  ontologiesid: number
  parentid: any
  fullName: string
  age: number
  nickname: any
}

export interface Loginpayload {
  Email: string
  Password: string
  SmsToken: any
  PhoneValidationDate: string
  EmailToken: any
  EmailValidationDate: string
  AutologinToken: string
}

export interface Birthpayload {
  BirthCountriesCode: number
  BirthLocalitaCode: string
}

export interface Referencepayload {
  OntologiesId: number
  Value?: string
  Notes1: any
}

export interface Residencepayload {
  CountriesCode: number
  LocalitaCap: string
  LocalitaCode: string
  Address: string
  Notes1: any
}

export interface Companypayload {
  CompaniesLogId: number
}

export interface Administrativepayload {
  ReferenceCompany: any
}

export interface Rulespayload {
  Promotions: any[]
}

export interface Biopayload {
  Doctor: string
  Class: string
  StepWalk: number
  StepRun: number
  StepSwim: number
  Height: number
  Weight: number
  Location: Location
}

export interface Location {
  Latitude: number
  Longitude: number
}

export interface AppConfig {
  measures: Measure[]
  services: Service[]
  actionBar: ActionBar[]
  contractId: number
  startDate: string
  endDate: any
  contractName: string
  contractCompaniesLogID: number
  privacy: string
  signature: string
  appname: string
  applogo: string
  shopurl: string
  newsurl: string
  weburl: string
  shopweburl: string
  devices: Device[]
}

export interface Measure {
  Id: string
}

export interface Service {
  Id: string
  Name1: string
  Config: Config
  Algorithm: Algorithm
}

export interface Config {
  Icon?: string
  Action?: string
  Color?: string
  Object?: string
  FaIcon?: string
}

export interface Algorithm {
  version: string
  date: string
}

export interface ActionBar {
  Id: string
  Name1: string
  Config: Config2
  Algorithm: Algorithm2
}

export interface Config2 {
  Icon: string
  Action: string
  Color: string
  Object: string
}

export interface Algorithm2 {
  version: string
  date: string
}

export interface Device {
  lastFirmware: string
  BLEName: string
  firmwareType: string
  generate: string[]
  id: number
  name: string
}

export interface Headers {
  "content-length": string
  "content-type": string
}

export interface Config3 {
  transitional: Transitional
  adapter: string[]
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env
  headers: Headers2
  baseURL: string
  method: string
  url: string
}

export interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

export interface Env {}

export interface Headers2 {
  Accept: string
  "Content-Type": string
}

export interface Request {}
