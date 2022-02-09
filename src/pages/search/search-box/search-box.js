import { ref } from "vue";
import { getPullDown } from "../../../network/requests";

// 搜索框逻辑
export function setSearchBox() {
    let searchValue = ref()

    const search = function () {
        if (!searchValue.value) return;
        uni.navigateTo({ url: "detail?q=" + searchValue.value })
    }

    // 奇怪的逻辑，因为search框的blur事件在微信小程序，点击navigator下拉下拉菜单时会触发，所以在最外层view写了一个click事件用来替代blur事件的作用
    const focusInput = (input) => {
        setTimeout(() => {
            input(searchValue)
        })
    }

    return { search, searchValue, focusInput }
}

// 下拉推荐逻辑
export function setPullDown() {
    const pullDownData = ref(false)
    let oldData
    let oldVal = false
    const throttle = function (callback) {
        let id
        return function (value) {
            if (typeof value === 'object') {
                value = value.value
            }
            if (!value) {
                return
            }
            if (oldVal === value) {
                pullDownData.value = oldData
                return
            }
            if (value.length === 0) {
                clearPullDownData()
                return null
            }

            clearTimeout(id)
            id = setTimeout(() => {
                oldVal = value
                callback(value)
            }, 400)
        }
    }
    const input = throttle((value) => {
        getPullDown(value).then((r, e) => {
            if (r.data.result.length !== 0) {
                pullDownData.value = r.data.result
            } else {
                pullDownData.value = false
            }
        })
    })
    const clearPullDownData = function () {
        console.log('清除搜索词');
        if (pullDownData.value) {
            oldData = pullDownData.value
        }
        // 搜索候选词，要能正常跳转需要使赋值操作异步，否则在点击navigtion时已经把下拉组件隐藏了，使点击无效，不会跳转
        // setTimeout(() => {
        pullDownData.value = false
        // },0)
    }
    return {
        pullDownData, input, clearPullDownData
    }
}
