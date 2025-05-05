import apm from 'elastic-apm-node';
//@ts-expect-error
import { NoopApmClient } from 'elastic-apm-node/lib/apm-client/noop-apm-client';
import { accessTokenReplacer } from './logger';

const environment = process.env.NODE_ENV || 'production-cli';

apm
  .start({
    serviceName: 'backport',
    secretToken: 'GZui3tX4jFYjszDweu',
    serverUrl:
      'https://f27ab01db9584e008c443b7137d16425.apm.europe-west2.gcp.elastic-cloud.com:443',
    logLevel: 'off',
    captureBody: 'all',
    errorOnAbortedRequests: false,
    environment,
  })
  // remove access token
  .addFilter((payload) => {
    return JSON.parse(JSON.stringify(payload, accessTokenReplacer));
  });

export function disableApm() {
  // hack to disable APM telemetry after loaded config
  //@ts-expect-error
  apm._apmClient.destroy();
  //@ts-expect-error
  apm._apmClient = new NoopApmClient();
}
