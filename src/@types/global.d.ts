interface MyFile extends File {
  path: string;
}

interface Item {
  src: string;
  name: string;
  path: string;
  error?: boolean;
}

interface Items extends Array<Item> {}
