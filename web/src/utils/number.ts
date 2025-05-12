import daysjs from 'dayjs';

export const byte2KB = (bytes: number) => {
  return (bytes / 1024).toFixed(2);
}

export const byte2MB = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2)
} 

export const friendlyMemorySize  = (bytes:number) => {
  if(parseFloat(byte2MB(bytes)) < 1) {
    return byte2KB(bytes) + 'KB';
  }
  return byte2MB(bytes) + 'MB';
}

export const friendlyTime = (timeStamp:number|string, model:string = 'YYYY-MM-DD HH:mm:ss') => {
  if(!timeStamp) return '--';
  return daysjs(timeStamp).format(model);
}