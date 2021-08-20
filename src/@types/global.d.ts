/* eslint-disable no-unused-vars */
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

type Items = Array<Item>;
