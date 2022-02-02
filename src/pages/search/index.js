import { ref, onMounted } from "vue";

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
        console.log('增加历史搜索关键词----' + value);
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
