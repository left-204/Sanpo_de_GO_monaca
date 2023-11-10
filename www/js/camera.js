const media = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false, // マイクから音声も取得する場合はtrue
});
document.getElementById('video').srcObject = media;
