// import uni from "@dcloudio/vite-plugin-uni";
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
function transformTime (timestamp) {
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



export { goToGoodsPage, transformTime }
