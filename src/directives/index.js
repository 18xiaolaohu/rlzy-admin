export const imgerror = {
  update (el, binding) {
    el.onerror = function () {
      this.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
    }
  }
}

// 拿到token的一瞬间，把时间记录下来 Date.now()  -大于2小时
