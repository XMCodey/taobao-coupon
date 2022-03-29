// import uni from "@dcloudio/vite-plugin-uni";
const goToGoodsPage = function (item) {
    console.log(item);
    uni.navigateTo({
        url: '/pages/goods/goods?id=' + item.item_id +
            '&coupon_amount=' + item.coupon_amount +
            '&end_time=' + item.coupon_end_time +
            '&start_time=' + item.coupon_start_time
    })
}
console.log(uni);
export { goToGoodsPage }
