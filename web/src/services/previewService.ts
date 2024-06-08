
export const imgPreview = (src="https://images.pexels.com/photos/25184945/pexels-photo-25184945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") => {
  const imgPreviewer = document.createElement('div');
  imgPreviewer.id = 'img-previewer';
  imgPreviewer.classList.add('img-previewer');
  imgPreviewer.innerHTML = `
    <div class="img-box">
      <img src="${src}"/>
    </div>
    <div class="btns">
      <button id="btn-close">关闭</button>
      <button id="btn-download">下载</button>
    </div>
  `
  document.body.appendChild(imgPreviewer)

  const clostBtn = document.getElementById('btn-close');
  const downloadBtn = document.getElementById('btn-download');
  clostBtn?.addEventListener('click', closePreview);
  downloadBtn?.addEventListener('click', downloadImg)

  function closePreview() {
    if(!imgPreviewer) return;
    document.body.removeChild(imgPreviewer);
  }

  function downloadImg() {
    console.log('download')
    const link = document.createElement('a');
    link.href = src;
    link.download = `${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}