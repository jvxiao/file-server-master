
export const isMobile = () => {
  console.log(navigator.userAgent);
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}