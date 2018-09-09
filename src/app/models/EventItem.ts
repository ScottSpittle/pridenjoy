export class EventItem {
  private _title: string;
  private _table_data: Array<{ icon: string, text: string }>;

  constructor(private data: { title: string, table_data: Array<{ icon: string, text: string }> }) {
    this._title = data.title;
    this._table_data = data.table_data;

    delete this.data;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get table_data(): Array<{ icon: string; text: string }> {
    return this._table_data;
  }

  set table_data(value: Array<{ icon: string; text: string }>) {
    this._table_data = value;
  }
}
