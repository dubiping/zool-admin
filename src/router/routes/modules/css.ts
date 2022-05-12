import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const cssModule: AppRouteModule = {
  path: '/css',
  name: 'Css',
  component: LAYOUT,
  redirect: '/css/backCity',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.css.css'),
  },
  children: [
    {
      path: 'backCity',
      name: 'BackCity',
      redirect: '/css/backCity/diaochan',
      component: getParentLayout('BackCity'),
      meta: {
        // icon: 'mdi:form-select',
        title: t('routes.css.backCity'),
      },
      children: [
        {
          path: 'diaochan',
          name: 'Diaochan',
          component: () => import('/@/views/css/backCity/diaochan/index.vue'),
          meta: {
            title: t('routes.css.diaochan'),
          },
        },
      ],
    }
  ],
};

export default cssModule;
