import { ref, onMounted } from "vue";
import { getPullDown } from "../../network/requests";

console.log(getPullDown);

// 搜索框逻辑
export function setSearchBox(addHistorySearch) {
    let searchValue = ref()

    const search = function () {
        if (!searchValue.value) return;
        uni.navigateTo({ url: "detail/index?key=" + searchValue.value })
        addHistorySearch(searchValue.value)
    }

    return { search, searchValue }
}

// 下拉搜索逻辑
export function setPullDown() {
    const pullDownData = ref(false)
    const throttle = function (callback) {
        let id
        return function (value) {
            clearTimeout(id)
            id = setTimeout(() => {
                callback(value)
            }, 300)
        }
    }
    const input = throttle((value) => {
        if (value.value) {
            value = value.value
        }
        if (value.length === 0) {
            pullDownData.value = false
            return null
        }
        getPullDown(value).then((r, e) => {
            if (r.data.result.length !== 0) {
                pullDownData.value = r.data.result
            } else {
                pullDownData.value = false
            }
        })
    })
    const clearPullDownData = function () {
        // 搜索候选词，要能正常跳转需要使赋值操作异步，否则在点击navigtion时已经把下拉组件隐藏了，使点击无效，不会跳转
        setTimeout(() => {
            pullDownData.value = false
        })
    }
    return {
        pullDownData, input, clearPullDownData
    }
}

// 历史记录逻辑
export function setHistorySearch() {
    const searchHistoryData = ref([])
    onMounted(() => {
        uni.getStorage({
            key: "historySearchData",
            success: function (result) {
                searchHistoryData.value = result.data
            }
        })
    })
    const addHistorySearch = (value) => {
        if (!value) return;
        if (searchHistoryData.value.indexOf(value) !== -1) {
            searchHistoryData.value.splice(searchHistoryData.value.indexOf(value),1)
        }
        searchHistoryData.value.unshift(value)
        uni.setStorageSync('historySearchData', searchHistoryData.value)
    }
    const clearHistorySearch = function () {
        uni.removeStorage({
            key: "historySearchData",
            success: function (result) {
                searchHistoryData.value = []
            }
        })
    }
    return {
        searchHistoryData,
        addHistorySearch,
        clearHistorySearch
    }
}
