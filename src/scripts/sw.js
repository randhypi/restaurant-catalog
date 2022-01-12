import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import CONFIG from '../scripts/globals/config';
import 'regenerator-runtime';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {setCacheNameDetails, skipWaiting, clientsClaim} from 'workbox-core';

clientsClaim();
skipWaiting;

setCacheNameDetails(CONFIG.CACHE_NAME);

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


