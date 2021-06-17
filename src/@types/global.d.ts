interface NodeFs {
  readdirSync: (
    path: PathLike,
    options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | null
  ) => string[];
  readdirSync: (
    path: PathLike,
    options?: (BaseEncodingOptions & { withFileTypes?: false }) | BufferEncoding | null
  ) => string[] | Buffer[];
  readdirSync: (path: PathLike, options: BaseEncodingOptions & { withFileTypes: true }) => Dirent[];
  readFileSync: (
    path: PathLike | number,
    options?: { encoding: BufferEncoding; flag?: string } | BufferEncoding
  ) => string;
  readFileSync: (
    path: PathLike | number,
    options?: { encoding?: null; flag?: string } | null
  ) => Buffer;
  readFileSync: (
    path: PathLike | number,
    options?: (BaseEncodingOptions & { flag?: string }) | BufferEncoding | null
  ) => string | Buffer;
}

interface Window {
  fs?: NodeFs;
}
