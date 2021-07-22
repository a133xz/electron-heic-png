interface MyFile extends File {
  path?: string;
}

interface Item {
  src: string;
  name: string;
  path: string;
  error?: boolean;
  format: string;
}

interface Items extends Array<Item> {}
