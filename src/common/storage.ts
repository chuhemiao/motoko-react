class Storage {
  store: Store;
  private _key: string;
  constructor() {
    this._key = 'cache-store';
    // @ts-ignore
    this.store = JSON.parse(globalThis.localStorage.getItem(this._key) || null) || Object.create(null);
  }
  set(key: keyof Store, value: any): void {
    Reflect.set(this.store, key, value);
  }
  get(key: keyof Store) {
    return Reflect.get(this.store, key);
  }
  remove(key: keyof Store): void {
    Reflect.deleteProperty(this.store, key);
  }
  cacheStore() {
    requestIdleCallback(
      () => {
        globalThis.localStorage.setItem(this._key, JSON.stringify(this.store));
      },
      { timeout: 5e2 }
    );
  }
}

export default new Storage();

// Type
type Store = {
  loginType: undefined | 'stoic' | 'plug';
};
