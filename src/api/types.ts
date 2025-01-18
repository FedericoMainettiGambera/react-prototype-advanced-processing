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
