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
        {
          path: 'lubu',
          name: 'Lubu',
          component: () => import('/@/views/css/backCity/lubu/index.vue'),
          meta: {
            title: t('routes.css.lubu'),
          },
        },
      ],
    },
    {
      path: 'wordcloud',
      name: 'Wordcloud',
      redirect: '/css/wordcloud/ani1',
      component: getParentLayout('Wordcloud'),
      meta: {
        title: t('routes.css.wordcloud'),
      },
      children: [
        {
          path: 'ani1',
          name: 'Ani1',
          component: () => import('/@/views/css/wordcloud/ani1/index.vue'),
          meta: {
            title: t('routes.css.ani1'),
          },
        },
        {
          path: 'ani2',
          name: 'Ani2',
          component: () => import('/@/views/css/wordcloud/ani2/index.vue'),
          meta: {
            title: t('routes.css.ani2'),
          },
        },
        {
          path: 'ani3',
          name: 'Ani3',
          component: () => import('/@/views/css/wordcloud/ani3/index.vue'),
          meta: {
            title: t('routes.css.ani3'),
          },
        },
        {
          path: 'ani4',
          name: 'Ani4',
          component: () => import('/@/views/css/wordcloud/ani4/index.vue'),
          meta: {
            title: t('routes.css.ani4'),
          },
        },
        {
          path: 'ani5',
          name: 'Ani5',
          component: () => import('/@/views/css/wordcloud/ani5/index.vue'),
          meta: {
            title: t('routes.css.ani5'),
          },
        },
      ],
    },
  ],
};

export default cssModule;
