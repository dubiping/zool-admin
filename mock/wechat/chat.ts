import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, formatDate } from '../_util';
import { Random } from 'mockjs';

const emojiList = ['[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]'];

const msgTypeList = [
  {
    mediaCode: '2001',
    mediaName: 'text',
  },
  {
    mediaCode: '2002',
    mediaName: 'pic',
  },
  {
    mediaCode: '2004',
    mediaName: 'video',
  },
  {
    mediaCode: '2003',
    mediaName: 'voice',
  },
  {
    mediaCode: '2005',
    mediaName: 'link',
  },
  {
    mediaCode: '2010',
    mediaName: 'file',
  },
  {
    mediaCode: '2013',
    mediaName: 'miniApp',
  },
  {
    mediaCode: '2020',
    mediaName: 'wxGzh',
  },
  {
    mediaCode: '2021',
    mediaName: 'businessCard',
  },
];

const videoList = [
  {
    baseUrl: '/resource/img/video1.mp4',
    width: 864,
    height: 486,
    durationTime: 20,
  },
  {
    baseUrl: '/resource/img/video2.mp4',
    width: 852,
    height: 480,
    durationTime: 16,
  },
];

const voiceList = [
  {
    baseUrl: '/resource/img/audio1.mp3',
    durationTime: 4 * 60 + 9,
  },
  {
    baseUrl: '/resource/img/audio2.mp3',
    durationTime: 4 * 60 + 37,
  },
  {
    baseUrl: '/resource/img/audio3.mp3',
    durationTime: 3 * 60 + 20,
  },
];

const getTextContent = () => {
  const count = Random.natural(1, 4);
  let str = '';
  for (let i = 0; i < count; i++) {
    const type = Random.natural(0, 10);
    if (type > 5) {
      str += emojiList[Random.natural(0, 7)];
    } else {
      str += Random.csentence();
    }
  }
  return str;
};
const timeMul = [24 * 60 * 60, 60 * 60, 60, 1];
const demoList = (count = 10) => {
  const len = msgTypeList.length;
  const result: any[] = [];
  const selfAvatar = Random.image('400x400', Random.color(), Random.color(), Random.first());
  const otherAvatar = Random.image('400x400', Random.color(), Random.color(), Random.first());
  const selfName = Random.cname();
  const otherName = Random.cname();
  const nowTime = Date.now();
  for (let index = 0; index < count; index++) {
    const index = Random.natural(0, len - 1);
    const typeItem = msgTypeList[index];
    let item: any = {
      content: '',
      imageUrl: '',
      baseUrl: '',
      width: 0,
      height: 0,
      durationTime: 0,
      title: '',
      fileSize: 0,
    };

    if (typeItem.mediaName == 'text') {
      item.content = getTextContent();
    } else if (typeItem.mediaName == 'pic') {
      item.imageUrl = '/resource/img/scenery' + Random.natural(1, 7) + '.webp';
    } else if (typeItem.mediaName == 'video') {
      item = { ...item, ...videoList[Random.natural(0, 1)] };
    } else if (typeItem.mediaName == 'voice') {
      item = { ...item, ...voiceList[Random.natural(0, 2)] };
    } else if (typeItem.mediaName == 'link') {
      item.title = Random.ctitle();
      item.content = Random.csentence();
      item.baseUrl = Random.url();
      item.imageUrl = Random.image('400x400', Random.color(), Random.color(), Random.first());
    } else if (typeItem.mediaName == 'file') {
      const fileType = [
        'mp3',
        'txt',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'rar',
        'zip',
      ];
      item.title = Random.ctitle() + '.' + fileType[Random.natural(0, 11)];
      item.fileSize = Random.natural(10, 60370594);
    } else if (typeItem.mediaName == 'miniApp') {
      item.title = Random.ctitle();
      item.content = Random.csentence();
      item.baseUrl = Random.image('400x800', Random.color(), Random.color(), Random.first());
      item.imageUrl = Random.image('400x400', Random.color(), Random.color(), Random.first());
    } else if (typeItem.mediaName == 'wxGzh') {
      item.title = Random.ctitle();
      item.imageUrl = Random.image('400x400', Random.color(), Random.color(), Random.first());
    } else if (typeItem.mediaName == 'businessCard') {
      item.title = Random.ctitle();
      item.imageUrl = Random.image('400x400', Random.color(), Random.color(), Random.first());
    }
    const position = Random.natural(1, 2);
    const timeIndex = Random.natural(0, 3);
    const random = Random.natural(0, 10);
    result.push({
      id: '@id',
      position: '' + position,
      avatar: position == 1 ? selfAvatar : otherAvatar,
      nickName: position == 1 ? selfName : otherName,
      time: formatDate(nowTime - timeMul[timeIndex] * random),
      ...item,
      ...typeItem,
    });
  }
  return result;
};
export default [
  {
    url: '/basic-api/wechat/chat/getPageInfo',
    timeout: 100,
    method: 'post',
    response: () => {
      const list = demoList();
      list.sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
      return resultSuccess(list);
    },
  },
] as MockMethod[];
