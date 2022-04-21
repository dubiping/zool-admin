import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/wechat',
  name: 'Wechat',
  component: LAYOUT,
  redirect: '/wechat/chat',
  meta: {
    orderNo: 10,
    icon: 'ion:logo-wechat',
    title: t('routes.wechat.chat'),
  },
  children: [
    {
      path: 'chat',
      name: 'Chat',
      component: () => import('/@/views/wechat/Chat/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.wechat.chat'),
      },
    },
  ],
};

export default dashboard;
