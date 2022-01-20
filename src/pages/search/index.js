import {ref} from "vue";
import {getPullDown} from "../../network/requests";


// 搜索框逻辑

export function setSearchBox(searchHistoryData) {
    let searchValue = ref()

    const search = function () {
        uni.navigateTo({ url: "detail/index?key=" + searchValue.value })
        searchHistoryData.value.push(searchValue.value)
        uni.setStorageSync('historySearchData', searchHistoryData.value)
    }

    const clearHistorySearch = function () {
        uni.removeStorage({
            key: "historySearchData",
            success: function (result) {
                console.log(result);
                searchHistoryData.value = []
            }
        })
    }

    return { search, clearHistorySearch, searchValue }
}


// 下拉搜索框逻辑

export function setPullDown() {
    const pullDownData = ref(false)
    const input = (value) => {
        getPullDown(value).then((r, e) => {
            if (r.data.result.length !== 0) {
                pullDownData.value = r.data.result
            } else {
                pullDownData.value = false
            }
        })
    }
    const blur = function () {
        pullDownData.value = false
    }
    return {
        pullDownData, input, blur
    }
}
