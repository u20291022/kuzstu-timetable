export interface ServerOptions {
  httpPort: number;
  httpsPort: number;
  ssl: {
    certificate: Buffer;
    key: Buffer;
  };
}
