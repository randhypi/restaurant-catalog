import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import CONFIG from '../scripts/globals/config';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {skipWaiting, clientsClaim} from 'workbox-core';

clientsClaim();

skipWaiting;


precacheAndRoute(self.__WB_MANIFEST, {
  ignoreUrlParametersMatching: [/.*/],
});


registerRoute(
    ({url}) => url.origin,
    new StaleWhileRevalidate({
      cacheName: CONFIG.CACHE_NAME,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
);


