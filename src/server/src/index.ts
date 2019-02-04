import {SrcApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {SrcApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new SrcApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`List blocks with ${url}/blocks`);

  return app;
}
