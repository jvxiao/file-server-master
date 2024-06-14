export const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  TEXT: 'text',
  APPLICATION: 'application',
  UNKNOWN: 'unknown'
}

export const FILE_ICONS = {
  image: '#icon-file_type_image',
  video: '#icon-file_type_video',
  text: '#icon-wenjianleixing-wenben',
  doc: '#icon-wenjianleixing-wendang',
  pdf: '#icon-file_type_pdf',
  unknown: '#icon-weizhiwenjian'
}

export const APPLICATION_TYPES = {
  doc: ['vnd.openxmlformats-officedocument.wordprocessingml.document'],
  pdf: ['pdf'],
}

export const getApplicationType= (subcate) => {
  let result = 'unknown';
  Object.keys(APPLICATION_TYPES).forEach(o => {
    if(APPLICATION_TYPES[o].includes(subcate)) {
      result = o;
    }
  })
  return result;
} 