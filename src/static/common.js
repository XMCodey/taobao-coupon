// #ifdef H5
  import {onMounted, onUpdated, reactive, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
// #endif

// console.log(uni);
// 遇到的一个兼容问题如果不传uni进去的话在微信里面会是uni undefined,或者使用箭头函数，或者在函数外使用下uni
// 好像又可以了不需要箭头函数了
const goToGoodsPage = function (item) {
  uni.navigateTo({
    url: '/pages/goods/goods?id=' + item.item_id +
        '&coupon_amount=' + item.coupon_amount +
        '&end_time=' + item.coupon_end_time +
        '&start_time=' + item.coupon_start_time +
        '&coupon_like=' + item.coupon_share_url
  })
}

// const goToGoodsPage =  (item) => {
//     console.log(this);
//     console.log(uni);
//     uni.navigateTo({
//         url: '/pages/goods/goods?id=' + item.item_id +
//             '&coupon_amount=' + item.coupon_amount +
//             '&end_time=' + item.coupon_end_time +
//             '&start_time=' + item.coupon_start_time
//     })
// }

// 转换时间
function transformTime(timestamp) {
  if (timestamp) {
    const time = new Date(timestamp)
    const y = time.getFullYear() // getFullYear方法以四位数字返回年份
    const M = time.getMonth() + 1 // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
    const d = time.getDate() // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
    const h = time.getHours() // getHours方法返回 Date 对象的小时 (0 ~ 23)
    const m = time.getMinutes() // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
    const s = time.getSeconds() // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
  } else {
    return ''
  }
}


function debounce(callback, time) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback()
    }, time)
  }
}

function throttle(callback, delay) {
  let previous = 0
  return function () {
    const now = new Date()
    if ((now - previous) > delay) {
      callback()
      previous = now
    }
  }
}


// 图片懒加载

function lazyLodImg(dom, data = ref(0)) {
  // 获取图片容器dom节点 里面是图片或者图片列表
  const imagesWrapper = dom
  let scrollEvent = reactive({target: {}})
  window.onscroll = function (event) {
    if (document.body.scrollTop > 0) {
      scrollEvent.target.scrollTop = document.body.scrollTop
      scrollEvent.target.offsetHeight = document.body.offsetHeight
    } else if (document.documentElement.scrollTop > 0) {
      scrollEvent.target.scrollTop = document.documentElement.scrollTop
      scrollEvent.target.offsetHeight = document.documentElement.offsetHeight
    }
  }

  // 定义懒加载图片函数
  const imgLoadLazy = function (imgIndex = 0) {
    // 查找图片元素，并更改src属性
    const getTagNameIsImg = function (Dom) {
      if (Dom.tagName === 'IMG') {
        if (Dom.dataset.src) {
          Dom.src = Dom.dataset.src
        }
      } else {
        const childrenDom = Dom.children
        for (let i = 0; i < childrenDom.length; i++) {
          getTagNameIsImg(childrenDom[i])
        }
      }
    }
    // 判断滚动的位置及元素的位置，执行加载函数
    const loadImg = function (event, imagesDom) {
      console.log(event)
      console.log(imagesDom)
      const imgLength = imagesDom.length
      const imgDom = imagesDom[imgIndex]

      if ((imgIndex < imgLength) &&
          ((event.target.scrollTop + event.target.offsetHeight) >= imgDom.offsetTop)) {
        console.log(3232)
        getTagNameIsImg(imgDom)
        imgIndex += 1
        return true
      } else {
        return false
      }
    }
    return function (event, imagesDom) {
      // 加载首屏图片逻辑
      if (imgIndex !== 0) {
        loadImg(event, imagesDom)
      } else {
        let load = true
        while (load) {
          if (event.target.scrollTop) {
            load = loadImg(event, imagesDom)
          } else {
            let height = null
            if (!height) {
              uni.getSystemInfo({ success: function (res) {
                  height = res.windowHeight
                }})
            }
            load = loadImg({ target: {
                scrollTop: 1,
                offsetHeight: height
              } }, imagesDom)
          }
        }
      }
    }
  }

  const updateInstance = debounce(() => {
    instance = imgLoadLazy()
  }, 10)

  let instance = imgLoadLazy()

  onMounted(() => {
    instance(scrollEvent, imagesWrapper.value.children)
    watch(() => scrollEvent.target.scrollTop, () => {
      instance(scrollEvent, imagesWrapper.value.children)
    })
  })

  onUpdated(() => {
    scrollEvent && instance(scrollEvent, imagesWrapper.value.children)
    updateInstance()
  })

  const route = useRoute()
  console.log(route)
  // 检测传入数据的变化，更新实例
  watch([() => data, () => route.params], () => {
    updateInstance()
  })
}

export { goToGoodsPage, transformTime, debounce, throttle, lazyLodImg }
