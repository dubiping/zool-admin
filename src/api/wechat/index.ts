import { defHttp } from '/@/utils/http/axios';
enum Api {
  OPTIONS_LIST = '/wechat/chat/getPageInfo',
}

/**
 * @description: Get sample options value
 */
export const getChatListApi = () => defHttp.post({ url: Api.OPTIONS_LIST });
