import daysjs from 'dayjs';

export const byte2KB = (bytes: Number) => {
  return (bytes / 1024).toFixed(2);
}

export const byte2MB = (bytes: Number) => {
  return (bytes / (1024 * 1024)).toFixed(2)
} 

export const friendlyMemorySize  = (bytes:Number) => {
  if(byte2MB(bytes) < 1) {
    return byte2KB(bytes) + 'KB';
  }
  return byte2MB(bytes) + 'MB';
}

export const friendlyTime = (timeStamp:Number|String, model:String = 'YYYY-MM-DD HH:mm:ss') => {
  if(!timeStamp) return '--'
  return daysjs(timeStamp).format(model);
}