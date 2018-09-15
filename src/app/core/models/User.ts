export class User {
  private _first: string;
  private _last: string;
  private _id: number;
  private _email: string;
  private _created_at: string;
  private _updated_at: string;
  private _mobile: number;
  private _home: number;
  private _username: string;
  private _address: string;
  private _promotion_perm: string;
  private _holiday_perm: string;

  constructor(private data: any) {
    this._first = data.first;
    this._last = data.last;
    this._id = data.id;
    this._email = data.email;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
    this._mobile = data.mobile;
    this._home = data.home;
    this._username = data.username;
    this._address = data.address;
    this._promotion_perm = data.promotion_perm;
    this._holiday_perm = data.holiday_perm;

    delete this.data;
  }

  public getFullName(): string {
    return `${this.first} ${this.last}`
  }

  get holiday_perm(): string {
    return this._holiday_perm;
  }

  set holiday_perm(value: string) {
    this._holiday_perm = value;
  }

  get promotion_perm(): string {
    return this._promotion_perm;
  }

  set promotion_perm(value: string) {
    this._promotion_perm = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get username(): string {
    return this._username;
  }

  get home(): number {
    return this._home;
  }

  set home(value: number) {
    this._home = value;
  }

  get mobile(): number {
    return this._mobile;
  }

  set mobile(value: number) {
    this._mobile = value;
  }

  get updated_at(): string {
    return this._updated_at;
  }

  get created_at(): string {
    return this._created_at;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get id(): number {
    return this._id;
  }

  get last(): string {
    return this._last;
  }

  set last(value: string) {
    this._last = value;
  }

  get first(): string {
    return this._first;
  }

  set first(value: string) {
    this._first = value;
  }
}
