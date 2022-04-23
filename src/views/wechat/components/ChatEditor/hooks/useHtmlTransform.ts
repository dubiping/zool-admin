/**
 * 解码后的字符串转html
 * @param {*} str
 * @returns
 */
function escape2Html(str) {
  const t = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    amp: '&',
    quot: '"',
  };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (e, n) => {
    return t[n];
  });
}
/**
 * 处理at内容
 * @param {*} str
 * @returns
 */
function dealAtHtml(str) {
  if (!str) return { list: [], str: '' };
  const list: string[] = [];
  const reg = /data-id="([^"]*)"/g;
  str = str.replace(/<span class="at-member"[^>]*>(.*?)<\/span>/gi, function (e, n) {
    e.replace(reg, function (e, t) {
      list.push(t);
    });
    return n;
  });
  return {
    str,
    list,
  };
}

/**
 * 处理文件内容
 * @param {*} str
 * @returns
 */
function dealFileHtml(str) {
  if (!str) return '';
  const elem = document.createElement('div');
  elem.innerHTML = str;
  const nodes = elem.getElementsByClassName('file-upload');
  Array.from(nodes).forEach((node) => {
    node.innerHTML = node.getAttribute('data-id') || '';
  });
  return elem.innerHTML;
}

/**
 * 处理表情
 * @param {*} str
 * @returns
 */
function dealEmojiHtml(str) {
  if (!str) return '';
  const reg = /data-name="([^"]*)"/g;
  return str.replace(/<img class="weui-icon_emoji [^>]*>/gi, function (e) {
    let r = '';
    e.replace(reg, function (e, t) {
      r = t;
      return t;
    });
    return r;
  });
}

/**
 * 处理图片
 * @param {*} str
 * @returns
 */
function dealImgHtml(str) {
  if (!str) return '';
  const reg = /data-id="([^"]*)"/g;
  return str.replace(/<img class="img-upload-chat" [^>]*>/gi, function (e) {
    let r = '';
    e.replace(reg, function (e, t) {
      r = t;
      return t;
    });
    return r;
  });
}

function returnId(str) {
  if (!str) return [];
  const list: string[] = [];
  str.replace(/data-id="([^"]*)"/g, function (e, n) {
    list.push(n);
    return n;
  });
  return list;
}

/**
 * 获取文本内容
 * @param {*} str
 * @returns
 */
function getInnerText(str) {
  if (!str) return '';
  const elem = document.createElement('div');
  elem.innerHTML = str.replace(/\u200B/g, '').replace(/\u200E/g, '');
  return elem.innerText;
}

export interface detailItem {
  type: string;
  text?: string;
  id?: string;
}
/**
 * 处理编辑框html
 * 1. 先处理at， 获取at的id, 替换成 @xxx
 * 2. 得到所有图片和文件的id，赋值fileIds
 * 3. 处理表情，替换成表情文字, eg: [微笑]
 * 4. 处理图片，替换成图片id
 * 5. 处理文件， 替换成文件id
 * 6. 根据fileIds分割字符，确保编辑框里的顺序和发送后的顺序一致
 * @param {*} html
 * @returns
 */
export function useHtmlTransform() {
  function htmlTransformObj(html: string) {
    html = escape2Html(html);
    // 处理at
    const obj = dealAtHtml(html);
    let str = obj.str;
    const robotIds = obj.list;
    // 得到所有文件id
    const fileIds = returnId(str);
    // 处理表情
    str = dealEmojiHtml(str);
    // 处理图片
    str = dealImgHtml(str);
    // 删除文件
    str = dealFileHtml(str);

    str = getInnerText(str).trim();
    const details: detailItem[] = [];
    fileIds.forEach((item) => {
      const index = str.indexOf(item);
      const text = str.substring(0, index).trim();
      text &&
        details.push({
          type: 'text',
          text,
        });
      details.push({
        type: 'file',
        id: item,
      });
      str = str.substring(index + item.length);
    });
    str = str.trim();
    str &&
      details.push({
        type: 'text',
        text: str,
      });
    return {
      robotIds,
      details,
    };
  }
  function htmlTranformStr(html: string) {
    let str = escape2Html(html);
    // 处理表情
    str = dealEmojiHtml(str);

    str = getInnerText(str).trim();
    return str;
  }
  return {
    htmlTransformObj,
    htmlTranformStr,
  };
}
