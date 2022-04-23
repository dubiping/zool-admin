// Interface data format used to return a unified format

export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}

/**
 * 格式化时间
 * @param {*} timestamp
 * @param {*} fmt
 * @returns
 */
export function formatDate(timestamp: string | number, fmt?: string) {
  if (!timestamp) return '';
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss';
  }
  const realDate = new Date(timestamp);
  const o = {
    'y+': realDate.getFullYear(),
    'M+': realDate.getMonth() + 1, // 月份
    'd+': realDate.getDate(), // 日
    'h+': realDate.getHours(), // 小时
    'm+': realDate.getMinutes(), // 分
    's+': realDate.getSeconds(), // 秒
    S: realDate.getMilliseconds(), // 毫秒
    'q+': Math.floor((realDate.getMonth() + 3) / 3), // 季度
    // "H+": (() => {
    //   const hour = realDate.getHours() % 12;
    //   return hour == 0 ? 12 : hour;
    // })(),
    'E+': (() => {
      const week = {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday',
      };
      return week[realDate.getDay() + ''];
    })(),
    /*
    "e+": (()=>{
      const week = {"0":"Sun","1":"Mon","2":"Tue","3":"Wed","4":"Thu","5":"Fri","6":"Sat"};
      return week[realDate.getDay()+""];
    })(),
    */
    'w+': (() => {
      const week = {
        '0': '周日',
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六',
      };
      return week[realDate.getDay() + ''];
    })(),
    'a+': (() => {
      const hour = ['凌晨', '上午', '下午', '晚上'];
      const h = realDate.getHours();
      if (h === 12) return '中午';
      return hour[parseInt(h / 6)];
    })(),
  };

  for (const k in o) {
    if (new RegExp('(' + k + ')', 'g').test(fmt)) {
      const len = RegExp.$1.length;
      fmt = fmt.replace(RegExp.$1, len === 1 ? o[k] : ('00' + o[k]).slice(-len));
    }
  }
  return fmt;
}
