var enterFrame = function(time) {
  c.fillStyle = '#0000' + (((time / 10000 % 1) * 255)|0).toString(16);
  c.fillRect(0,0,a.width,a.height);
  requestAnimationFrame(enterFrame);
}
requestAnimationFrame(enterFrame);
