interface MyFile extends File {
  path?: string;
}

interface Item {
  src: string;
  name: string;
  path: string;
}

interface Items extends Array<Item> {}
