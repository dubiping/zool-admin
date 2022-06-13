import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const cssModule: AppRouteModule = {
  path: '/table',
  name: 'Table',
  component: LAYOUT,
  redirect: '/table/menuTable',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.table.table'),
  },
  children: [
    {
      path: 'menuTable',
      name: 'MenuTable',
      component: () => import('/@/views/table/menuTable/index.vue'),
      meta: {
        title: t('routes.table.menuTable'),
      },
    },
  ],
};

export default cssModule;
