// #ifdef H5
import {useRoute} from 'vue-router';
// #endif

import { nextTick, onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app';


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


// 图片懒加载,传入的dom必须是图片列表的包裹，不能嵌套,不能是子组件

function lazyLodImg(dom, delay = 0, data = ref(0)) {
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

      const imgLength = imagesDom.length
      const imgDom = imagesDom[imgIndex]
      if ((imgIndex < imgLength) &&
          ((event.target.scrollTop + event.target.offsetHeight) >= imgDom.offsetTop)) {
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
    setTimeout(() => {
      instance(scrollEvent, imagesWrapper.value.children)
    }, delay)
    watch(() => scrollEvent.target.scrollTop, () => {
      instance(scrollEvent, imagesWrapper.value.children)
    })
  })

  onUpdated(() => {
    // console.log('onUpdated');
    setTimeout(() => {
      scrollEvent && instance(scrollEvent, imagesWrapper.value.children)
    }, delay)
    updateInstance()
  })

  const route = useRoute()
  // 检测传入数据的变化，更新实例,但只有滚动才会触发加载图片
  watch([data, () => route.params], () => {
    updateInstance()
  })
}

// 处理请求错误
const handleRequests = function (
    Promise, params,
    error=ref(),
    data=ref([])
) {
  Promise(params).then((r,e) => {
    if (r.data && r.data.error_response && r.data.error_response.code === 15) {
      error.value = true
      return
    }
    data.value = data.value.concat(r.data.tbk_dg_material_optional_response.result_list.map_data)
    // console.log(data.value);
  })
}

const handleDataCache = function(data=ref(), prevId, callback, pageObj={}, pageObjId= 'page', defaultPage = 1) {
  const dataset = {}
  return function (id) {
    // 保存数据到dataset
    if (!dataset[prevId]) {
      dataset[prevId] = {}
    }
    dataset[prevId].data = data.value
    dataset[prevId].page = pageObj[pageObjId]
    prevId = id
    // 重置data数据
    data.value = []
    // 加setTimeout 是为了切换数据的时候，自动回到顶部
    setTimeout(() => {
      // 读取数据
      if (dataset[id]) {
        data.value = dataset[id].data
        pageObj[pageObjId] = dataset[id].page
        return
      }
      // 更改params参数
      pageObj[pageObjId] = defaultPage
      callback()
    })

}}

// 下拉刷新
const scrollToLowerLoad = function (selector, callback, distance) {
  let windowHeight = 0
  let toTopDistance = 0
  let nodeInfo = null
  let throttleInstance = throttle(callback, 1000)

  uni.getSystemInfo({
    success: function (result) {
      windowHeight = result.windowHeight
    }
  })
  const query = uni.createSelectorQuery().select(selector)

  onMounted(() => {
    query.boundingClientRect((data) => {
      nodeInfo = data
    }).exec()
    setTimeout(() => {
      toTopDistance = nodeInfo.top
    }, 100)
  })

  onUpdated(() => {
    // (async function () {
    //   await nextTick()
    // 不理解只要执行下面代码nodeInfo就会更新数据
      query.boundingClientRect((data) => {
      }).exec()
    // })()
  })

  const getPageHeight = function () {
    query.boundingClientRect((data) => {
      // pageHeight = data.height
      // console.log(pageHeight)
    }).exec()
  }

  let getPageHeightThrottleInstance = throttle(getPageHeight, 1000)
  onPageScroll((e) => {
    getPageHeightThrottleInstance()
    if (e.scrollTop > 0 && (e.scrollTop + windowHeight - toTopDistance + distance) > nodeInfo.height) {
      throttleInstance()
    }
  })
}

export { goToGoodsPage, transformTime, debounce, throttle, lazyLodImg, handleRequests, scrollToLowerLoad, handleDataCache }
