const defaultHashTableSize = 20;

export class HashTable {
  buckets: { [hash: string]: [{ key: string; value: any }] };
  keys: { [key: number]: string };
  size: number;

  constructor({ size = defaultHashTableSize }) {
    this.buckets = {};
    this.keys = {};
    this.size = size;
  }

  hash(key: string) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.size;
  }

  set(key: string, value: any) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketArray = this.buckets[keyHash];

    if (bucketArray) {
      const node = bucketArray.find((nodeValue) => nodeValue.key === key);

      if (!node) {
        bucketArray.push({ key, value });
      } else {
        node.value = value;
      }
    } else {
      this.buckets[keyHash] = [{ key, value }];
    }
  }

  delete(key: string) {
    const keyHash = this.hash(key);
    delete this.keys[key];

    const bucketArray = this.buckets[keyHash];
    const indexOfNode = bucketArray.findIndex(
      (nodeValue) => nodeValue.key === key
    );

    if (indexOfNode !== -1) {
      return bucketArray.splice(indexOfNode, 1);
    }

    return null;
  }

  get(key: string) {
    const bucketArray = this.buckets[this.hash(key)];

    const node = bucketArray.find((nodeValue) => nodeValue.key === key);

    return node ? node.value : undefined;
  }

  has(key: string) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return Object.values(this.buckets).reduce(
      (prev: any[], entry: [{ key: string; value: any }]) => {
        const bucketValues = entry.map((node) => node.value);
        return prev.concat(bucketValues);
      },
      []
    );
  }
}

export function workWithHashTable() {
  const user = new HashTable({ size: 20 });
  user.set("email", "user@gmail.com");
  user.set("emlia", "badEmail@gmail.com");
  user.set("firstName", "John");
  user.set("lastName", "Doe");
  user.set("company", "company1");

  console.log(user.get("email"));
  console.log(user.get("firstName"));
  console.log(user.get("lastName"));
  console.log(user.get("company"));

  console.log(user.buckets);

  console.log("delete lastName");
  user.delete("lastName");

  console.log(user.buckets);

  console.log("delete emlia");
  user.delete("emlia");

  console.log(user.buckets);
}
