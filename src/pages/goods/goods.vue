<template>
  <view class="topMenuContainer" :class="{ 'topMenuColor': changeTopMenuCss }" style="position: fixed">
    <navigator hover-class="none" open-type="navigateBack" class="menu__back icon_bgc">
      <uni-icons class="menu__back__icon" type="back" size="20"></uni-icons>
    </navigator>
    <view class="menu__text">
      <view class="menu__text__item" :class="{ active: menuTopActive }" @click="handleGoodsMenuClick">商品</view>
      <view class="menu__text__item" :class="{ active: !menuTopActive }" @click="handleRecommendMenuClick">推荐</view>
    </view>
    <view class="menu__childMenu  icon_bgc">
      <uni-icons class="menu__childMenu__icon" @click="changeShowChildMenu" type="more-filled" size="20"></uni-icons>
      <view v-show="showChildMenu" class="menu__popups">
        <navigator class="menu__popups__item"
                   v-for="i in [['首页', 'home'], ['搜索', 'search'], ['客服', 'chatbubble']]"
                   :key="i" hover-class="none">
          <uni-icons :type="i[1]" class="menu__popups__item__icon"></uni-icons>
          <text class="menu__popups__item__text">{{ i[0] }}</text>
        </navigator>
      </view>
    </view>
  </view>

  <swiper class="swiper" indicator-dots="true">
    <swiper-item v-for="img in goodsData.small_images.string" class="swiper__item" :key='img'>
      <image mode="widthFix" lazy-load="true" class="swiper__image" :src="img"></image>
    </swiper-item>
  </swiper>
  <view class="container">
    <view class="price">
      <view class="price__left">
        <view class="price__left__red">
          <view>¥</view>
          <view>{{ (goodsData.zk_final_price - goodsData.coupon_amount).toFixed(2) }}</view>
        </view>
        <view class="price__left__underlined">
          原价 ¥{{ goodsData.zk_final_price }}
        </view>
      </view>
      <view class="price__right">
        已售
        <text>{{ goodsData.volume }}</text>
        件
      </view>
    </view>
    <view class="title">
      <image mode="widthFix" src="data:image/png;base64,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" lazy-load="true" class="title__icon"></image>
      {{ goodsData.title }}
    </view>
    <view class="couponInfoContainer">
      <view class="couponInfoContainer__price">
        ¥<text>{{ goodsData.coupon_amount }}</text>
      </view>
      <view class="couponInfoContainer__des">
        <view>优惠券使用期限</view>
        {{ handelCouponTimeLimit }}
      </view>
      <uni-link :href="couponLike"
                showUnderLine="false"
                color="#ff313e"
                font-size="28"
                copyTips="已自动复制网址，请在手机浏览器里粘贴该网址	"
                class="couponInfoContainer__get">
        立即领券
      </uni-link>
    </view>
  </view>
  <view class="recommendContainer">
    <view class="recommendContainer__title">
      <uni-icons type="contact-filled" size="30" color="#ff7777"></uni-icons>
      达人推荐
    </view>
    <view class="recommendContainer__des">
      给你今日份的温暖+光芒，精美礼品盒更贴心更体面，送礼就送有感觉的，款式多多，可爱温暖，ins风满满，还不费电，满足你所有要求，怕黑的小姑凉更需要一盏小上夜灯哦，萌宠系3D氛围小夜灯，照明装饰统统搞定。
    </view>
  </view>
  <view class="shopContainer">
    <image lazy-load="true" class="shopImage" src="https://img.alicdn.com/bao/uploaded//e1/a9/TB1wXHZczMZ7e4jSZFOSut7epXa.jpg_310x310.jpg"></image>
    <view class="shopTitle">
      <text>{{ goodsData.nick }}</text>
      <view class="shopScore">
        <text>描述：4.9</text>
        <text>描述：4.9</text>
        <text>描述：4.9</text>
      </view>
    </view>
  </view>
  <view class="recommend-goods-title">
    <image style="width: 32rpx; height: 30rpx;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAAXNSR0IArs4c6QAABFlJREFUSEutVk1oXFUU/r77RtqJprOxS3dCUdQqWUi1i2IV7A/5IU4MJFCSRVujKVpcFIR0UiMRQqSVSOwsmmIbiDNgWxu6aBSCXbkQqaVFFFHESnChGEtkknn3yHnv3clM5udNW2eVl3vvOd/5vu+ce4noJ5mMwfHjQlLkypVNsPYJGPMogK0ACvD9JXjeLe7d+5Mecfvd+eDcpUut8LynQT4C4GGQd2DtbZDXuW/fkogQo6NkJmNL54JgugAgCDI/n0axOATgGRiT0kVdgIhu/A3AVwDeZ2fnDcnlPPb0+AHgtbXXAfQBeBzAZg2rISFSBPkzrL0MYybZ0fG7gncg6D7k/PktSCZPQ6Q3OgxY64MBNkVnAJjg29oCjHmH3d2TksttAzkLsq3OOS+qVsEsATjAdPqqAx9El5mZzUgmL0PkRYj4wQFjDJQZTajVh1QpdRZkAqAFJAtjnoe1TwbnSGVLE4aMlfSNYoZr/8L3e9jfPx+ACOKeO/cBRN4CUASQiJKtBwgZKP+WSBplZf3v8qSV+10RWoCyuATf38GBgV8oZ848C5EvADxU0q0ydb0vLdGVqUCa/YVFkqc5OHiYks1OwNq3ASj1Tq/qYLUrajZp+T7HghrzBcrU1HWIPBXop9qt6xbSrrSW+6DUPxWSVAMpP1cN3hXbQTl5chkirRWmqdb8Xiqtf0ZbU2VIJA5TJibuAHiwCsD/m3JjNJ0NCRgzRBkfvwVrH6tpwEYSxAFsfDaUQKSTcuLERxDRydfYhHEJy1uwsYShCYHbMGY3ZWRkN6xdKIsf4644JLHrbtZ8yrGx3nAQHTv2GUS6Kli4H/odA9UdFHYaqdP0OY6Pfx0COHp0O4BrAForvBDXho1brRYVbgid4uTkm8E9JOm0x3zelyNHhiHy4X17ob4CzmPfoFh8idPTf0UTJrzb9XqUoaGPYe2hewLR2ITOeH+A1OTfuZyhBG7WDQ9vwspKDkB7xcVUy9XNuD6UyEJEXf8PPO8VZrNXHetB2NLkdSwcPJhCoTAHkZdBFiGiF8f6lXx3o9iHiAdyBWQfz569KJlMgpmMeiH4bbhjo1R9fVsAfAKRjiomYrustMFp/jfIfs7OzpdXXhNAIIdjIp1OgpyCtYORJxRss9dumJz8FZ7Xz7m5a7JrV4KLi6XK6wJwIAJ61JhdXaMQGYkeINrHcSBC2YBvYUwvL1z4oVblDQE4YyKTCV6w0t5+AL5/CkAqYqPyuRZet+FLVw1Hfo6WlgHm8382Sl7lgY3yqoeRTptgTuzfvwNrazOwdlvkC6U4fPuRajZNrEjGkEq9y3x+tfz1W886Tc390rDas2crVlen4fvdwQPGWoEx+ibUm017/BAXFy/qfuTzVnsnzrNNAQiYdROzre0BtLS8AZH3IKJG1eUvkUy+xoWFH+8meawEDSXZuXM7CoVXkUh8j+XlOd68uRqndy02mmagNLDUF5E5G/0vjnq3/h/gPz3gXRJEVAAAAABJRU5ErkJggg=="></image>
    &nbsp;为你推荐
  </view>
  <view class="recommend-goods">

    // #ifdef H5
    <div ref="imgContainerDom">
    // #endif
    <view class="recommend-goods-item" v-for="recommendGoods in recommendData" :key="recommendGoods.item_id" @click="goToGoodsPage(recommendGoods)">
      // #ifdef H5
      <img src="http://cmsstatic.ffquan.cn//web/images/rolling.gif" :data-src="recommendGoods.pict_url" alt="" class="recommend-goods-item__img">
      // #endif
      // #ifndef H5
      <image mode="widthFix" :src="recommendGoods.pict_url" data-src="3232" lazy-load="true" class="recommend-goods-item__img"></image>
      // #endif
      <view class="recommend-goods-item__title">
        <image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAABL1JREFUSEu1ln1o1WUUxz/nd+9e3FS2lKaVNhSvllpphAiKUr6kJpLiS0UmYtImakRKTdGRKagr0AoNrZwh4oRKEdFWLnsBsyTLHG5oTcu31InOvdzd3d+J83vu2ubmX96efy7395znOef7Pd9zziMAmte/v6JrRBivqpn27W6XiNSqclCQAtlUUSG6YEBE/fh+oC/gA97dOkmcb77rjHihieLnRUpApwNNQDhJTpqvSdwpu0XzI7eSRdedgjQaxc/rp+0MRNp+0lYmttf8P7BrZavGVsfLHNluK2uBeBNoHMQDPw6p6e50PA5+E6RnQNyHphio2Sp4YQingjm3M7eFehsiizYOnbrAhHzI6gEHN0PVbzBvI2T3hAOb4MhnkJkN2TmQkQVeCOpvwrXzLshOnVtQJxy2dWQH6m7AhAXI9GXO5JcD6O7VyNtlQdR6vBSunEUiwyAtA1LSEyh89PoFOLwDju6FcEobTG0dGVWxehgwAjEEXbuhO1dAz37I6BddtLYaatHy7+DUD3ChEhpuQf/hyORXITMLLVkFpVsgNQMSebvNUSI/xnOPvhAKQ6+ByEtroa4GvX4JuT+CniiD1ZMdZWZjvzXXYP77yNN56JVz8NYEaIq6PJsIWlRnelCXyHkbgqgpXgKLtiODR6Ob82HETGTQKLTyKJQfdrSFUiC1E/xdHqCRaW9CYwO6fDTc+Mfto60cGQpTUVYOLNiK9B6I/v4N7FwJaZkwZFxAjf76FdJnCHTphlo+K350uTpzDGJRZOpSiMfQ1VOc85S0QBjt68ikmt4ZJi1ExsxFy7bDR4th5Zdw6QzseQdZ+DE8ONhRuHUxpKRCTTU8NReZsTxgRdfPhNM/udLo0JERagk0zl/fhXTvjb77PPLKZhe55SQn19EWrYXLVRAKwemf0eqLyLNLgvNa9BxUHnG0qt8BIqtdO2gRLilBvBC6ZSGMmQv1tXDjMvLMIrg3F/3zOBwqhsfGwolDARMyqzAoal03A/445gLqEJFFfKsaRs1G5qxDi5e6C2auQK0+PsxHCvZC36Hokc9hTxGy5nu0bBucK0fmrA/UpqsmOaqtW7RzZFKsvQ5DJwaCINYAS4fB2HlOCFfOwo7lyLQC6PUQevE0ROuQ3Efg6l/oyW+RUS8EotCCkY5+a03tVBeLwuMTkdlrgzakpVthxzKIDIfXPkXSu7T0MaM0Wgf7NkBOHzBnN68iD49EDYnVmak40aDbqs5qaOobyLiXg96lRbPg3EmXs9xHYdCTEPKgoQ7OVwStiO69nEC6PYCMmw/ZPdAvimDfRiee9p3BCtYPqOCJKa4z7H/P1YEtQ9vY4IraLo41BuhZXIzYXkoaWl8DX3/iGq+hsQATI6X9mDCo5swq2gybJ4jlr/Wcsgvsf0ZXuOc+59i6d221E4C1pZY5ph0PPs9zRq0HXkfzzPaN7mD+CITDCRQGvO08TcIol5axeYfAglEez4/sEtUZiceJcZXMZVDDKlLS/Nw6COT+T8+tKvFC44O3gr3t/Lhf6HmMVdWMZEASkTrfp9QLeYXywanK/x4lpiHm5KaR2picB2Rjqs+2qqi9QoLBFyAqxKMQbf6YDETBvXZ/ISKF+P8C090U4g30714AAAAASUVORK5CYII="></image>
        {{ recommendGoods.title }}
      </view>
      <view class="recommend-goods-item__price">
        券后&nbsp;
        <view class="recommend-goods-item__price__red">
          ¥
          <text>{{ (recommendGoods.zk_final_price - recommendGoods.coupon_amount).toFixed(2) }}</text>
        </view>
      </view>
      <view class="recommend-goods-item__coupon">
        <text>券</text>
        {{ recommendGoods.coupon_amount }} 元
      </view>
      <view class="recommend-goods-item__volume">
        已售{{ recommendGoods.volume }}
      </view>
    </view>
      // #ifdef H5
    </div>
    // #endif
  </view>

  <scroll-top />
  <view class="bottomMenu">
    <view class="bottomMenu__share">
      <uni-icons type="redo" size="20" color="rgb(136, 136, 136)"></uni-icons>
      分享
    </view>
    <view class="bottomMenu__getCoupon">
      <view class="bottomMenu__getCoupon__first">口令购买</view>
      <view class="bottomMenu__price"  style="position: relative;">
                <uni-link  :href="couponLike"
                           color="tranpanet" font-size="24"
                           showUnderLine="false"
                           copyTips="已自动复制网址，请在手机浏览器里粘贴该网址	"
                           style="position: absolute;left: 0;right: 0;bottom: 0;top: 0; color: transparent;overflow: hidden">

                                                   ::
                                                  :;J7, :,                        ::;7:
                                                  ,ivYi, ,                       ;LLLFS:
                                                  :iv7Yi                       :7ri;j5PL
                                                 ,:ivYLvr                    ,ivrrirrY2X,
                                                 :;r@Wwz.7r:                :ivu@kexianli.
                                                :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
                                               ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
                                            ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
                                          :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
                                             ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
                                         ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
                                       :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
                                      ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
                                    ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
                                    :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
                                   ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
                                  ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
                                 ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
                                :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
                                ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
                                i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
                                :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
                                i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
                                :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
                                :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
                                 :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
                                      , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
                                          :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
                                       ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
                                       ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
                                    , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
                                     :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::


                                      为了微信能点击这个区域都能跳转加了这些字，并设置了透明颜色

                                  </uni-link>
                          <view >
                            <view style="font-size: 30rpx;display: inline-block;margin-right: 1.5px;">¥ {{ (goodsData.zk_final_price - goodsData.coupon_amount).toFixed(2) }}</view>
                            <view class="bottomMenu__price__through">¥ {{ goodsData.zk_final_price }}</view>
                          </view>
                            领券购买
                        </view>
                      </view>
                    </view>
</template>

<script>
  import { getCurrentInstance,  ref } from "vue";
  import ScrollTop from "../basic/scrollTop";
  import { getShopInfo, getGoodsData, getGoodsList } from "../../network/requests";
  import { goToGoodsPage, transformTime, lazyLodImg } from "../../static/common";
  import UniLink from "../../uni_modules/uni-like/components/uni-link/uni-link";
  export default {
    name: "goods",
    components: { UniLink, ScrollTop },
    data() {
      return {
        changeTopMenuCss: false,
        menuTopActive: true,
        windowWidth: 0,
        recommendButtonHeight: 0,
        goodsData: {
          small_images: {
            string: [''],
            coupon_start_time: '',
            coupon_end_time: ''
          }
        },
        recommendData: [],
        couponLike: ''
      }
    },
    onLoad(option) {
      console.log(option);
      this.couponLike = option.coupon_like
      getGoodsData(option.id).then((r,e) => {
        this.goodsData = r.data.tbk_item_info_get_response.results.n_tbk_item[0]
        if (!this.goodsData.coupon_amount) {
          this.goodsData.coupon_amount = option.coupon_amount
        }
        this.goodsData.coupon_start_time = option.start_time
        this.goodsData.coupon_end_time = option.end_time
      })
      getShopInfo("好味屋旗舰店").then((e,r) => {
        console.log(e);
        console.log(r);
      })
      getGoodsList({ material_id: 13256, item_id: option.id }).then((r,e) => {
        this.recommendData = r.data.tbk_dg_optimus_material_response.result_list.map_data
        console.log(r);
      })
      // getGoodsList({ material_id: 13256, content_id: option.id }).then((r,e) => {
      //   // this.recommendData = r.data.tbk_dg_optimus_material_response.result_list.map_data
      //   console.log(r);
      // })
    },
    mounted() {
      uni.getSystemInfo({
        success:  (res) => {
          this.windowWidth = res.screenWidth
          this.recommendButtonHeight = (res.windowWidth / 750) * 1514
        }
      })
    },
    onPageScroll(object) {
      this.changeTopMenuCss = object.scrollTop > 100;
      // 220是375px宽度下到元素高度
      this.menuTopActive = object.scrollTop <= (this.windowWidth / 750) * 220 * 2;
    },
    // onReachBottom() {
    //   console.log(32);
    // },
    methods: {
      handleGoodsMenuClick() {
        this.menuTopActive = true
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      },
      handleRecommendMenuClick() {
        this.menuTopActive = false
        uni.pageScrollTo({
          scrollTop: this.recommendButtonHeight,
          duration: 300
        })
      },
      goToGoodsPage,
      handleTime (time) {
        if (time && (time.indexOf('-') === -1)) {
          return transformTime(parseInt(time))
        } else {
          return time
        }
      },
    },
    computed: {
      handelCouponTimeLimit() {
        if (this.goodsData.coupon_start_time && this.goodsData.coupon_end_time) {
          return (this.handleTime(this.goodsData.coupon_start_time).substring(0,10)
              + '到' + this.handleTime(this.goodsData.coupon_end_time).substring(0,10))
        }
      }
    },
    setup(props, context) {
      // const internalInstance = getCurrentInstance()
      // console.log(internalInstance);
      const showChildMenu = ref(false)
      const changeShowChildMenu = function () {
        showChildMenu.value = !showChildMenu.value
      }
      const imgContainerDom = ref(null)
      // #ifdef H5
        lazyLodImg(imgContainerDom)
      // #endif

      return {
        changeShowChildMenu,
        showChildMenu,
        imgContainerDom
      }
    }
}
</script>

<style lang="scss" scoped>
  @mixin padding20rpx {
    padding: 20rpx;
    border-radius: 12px;
  }
  .scrollContainer {
    background-color: #f4f4f4;
  }
  .topMenuContainer {
    z-index: 999;
    background-color: transparent;
    .icon_bgc {
      width: 60rpx;
      height: 60rpx;
      background: rgba(0,0,0,.3);
      border-radius: 50%;
      text-align: center;
      line-height: 60rpx;
    }
    height: 90rpx;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    box-sizing: border-box;
    .menu__back {
      &__icon {
        line-height: 60rpx;
        color: #ffffff !important;
      }
    }
    .menu__text {
      font-size: 28rpx;
      display: none;
      &__item {
        margin: 0 59.5rpx;
        height: 90rpx;
        line-height: 90rpx;
        display: inline-block;
        position: relative;
      }
      .active:after {
        content: '';
        display: inline-block;
        width: 100%;
        height: 2px;
        background-color: #fd4546;
        position: absolute;
        bottom: 12rpx;
        left: 0;
      }
    }
    .menu__childMenu {
      position: relative;
      &__icon {
        color: #ffffff !important;
      }
      .menu__popups {
        color: #ffffff;
        &:before {
          content: '';
          position: absolute;
          border-bottom: 14rpx #414347 solid;
          border-left: 14rpx transparent solid;
          border-right: 14rpx transparent solid;
          border-top: none;
          top: -14rpx;
          right: 20rpx;
          transform: translateX(5rpx);
        }
        width: 240rpx;
        background-color: rgba(51,51,51,.9);
        border-radius: 10rpx;
        position: absolute;
        right: 0;
        top: 75rpx;
        box-sizing: border-box;
        //border: 1px solid #ffeeee;
        &__item {
          height: 90rpx;
          width: 220rpx;
          line-height: 90rpx;
          border-bottom: 1rpx solid #ffeeee;
          margin: 0 auto;
          &__icon {
            margin-right: 20rpx;
            color: #ffffff !important;
          }
          &__text {
            color: #ffffff;
            font-size: 28rpx;
          }
        }
      }
    }
  }
  .topMenuColor {
    .menu__text , &{
      background-color: #ffffff;
      color: transparent;
    }
    .menu__text {
      display: inline-block;
    }
    .icon_bgc {
      background-color: transparent;
      .menu__back__icon, .menu__childMenu__icon {
        color: #333 !important;
      }
    }
    .menu__text__item {
      color: #333;
    }
    .menu__childMenu .menu__popups {
      background-color: #ffffff;
      color: #333333;
      .menu__popups__item {
        border-bottom-color: #333333;
      }
      .menu__popups__item__icon {
        color: #333333 !important;
      }
      .menu__popups__item__text {
        color: #333333;
      }
      &:before {
        border-bottom-color: #333333;
      }
    }
  }
  .swiper {
    height: 750rpx;
    width: 750rpx;
    &__item {
    }
    &__image {
      width: 100%;
    }
  }
  .container {
    @include padding20rpx;
    background-color: #ffffff;
    .price {
      padding-top: 12rpx;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      &__left {
        &__red {
          color: rgb(249, 20, 21);
          display: inline-block;
          :last-child {
            font-size: 54rpx;
            display: inline-block;
          }
          :first-child {
            font-size: 32rpx;
            display: inline-block;
          }
        }
        &__underlined {
          display: inline-block;
          color: #888;
          font-size: 24rpx;
          text-decoration: line-through;
          margin-left: 20rpx;
        }
      }
      &__right {
        font-size: 24rpx;
        color: #888;
        :last-child {
          color: rgb(249, 20, 21);
        }
      }
    }
    .title {
      font-size: 30rpx;
      color: #000000;
      font-weight: bold;
      margin-top: 10rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      :first-child {
        width: 50rpx;
        margin-right: 10rpx;
      }
    }
    .couponInfoContainer {
      background: linear-gradient(to right, #ffe3e8, #fff0ef);
      border-radius: 10px;
      margin: 24rpx 0;
      height: 130rpx;
      display: flex;
      align-items: center;
      text-align: center;
      color: rgb(255, 49, 62);
      justify-content: space-between;
      &__price {
        width:  150rpx;
        font-size: 30rpx;
        font-weight: bold;
        :last-child {
          font-size: 48rpx;
        }
      }
      &__des {
        :last-child {
          font-weight: bold;
        }
        text-align: start;
        font-size: 24rpx;
        flex:1;
      }
      &__get {
        width: 240rpx;
        color: rgb(255, 49, 62);
        font-size: 28rpx;
        font-weight: bold;
        position: relative;
        display: block;
        height: 130rpx;
        line-height: 130rpx;
        &:after, &:before {
          content: '';
          position: absolute;
          left: 0;
          border: 10rpx solid #ffff;
          border-radius: 50%;
        }
        &:after {
          top: 0;
          transform: translate(-50%, -50%);
        }
        &:before {
          bottom: 0;
          transform: translate(-50%, 50%);
        }
        border-left: 1px dashed #ffffff;
      }
    }
  }
  .recommendContainer {
    @include padding20rpx;
    padding: 24rpx;
    margin-top: 20rpx;
    background-color: #ffffff;
    &__title {
      font-size: 26rpx;
      color: rgb(254, 55, 56);
      font-weight: bold;
      vertical-align: center;
      display: flex;
      align-items: center;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 12%;
        bottom: -20rpx;
        border-left: 20rpx solid #f4f4f4;
        border-top: 10rpx solid transparent;
        border-bottom: 10rpx solid #f4f4f4;
        border-right: 20rpx solid transparent;
      }
    }
    &__des {
      color: #555;
      font-size: 24rpx;
      width: 614rpx;
      padding: 14rpx 36rpx;
      margin-top: 20rpx;
      background-color: #f4f4f4;
      border-radius: 10px;
    }
  }
  .shopContainer {
    @include padding20rpx;
    padding: 24rpx;
    background-color: #ffffff;
    margin-top: 20rpx;
    display: flex;
    .shopImage {
      width: 104rpx;
      height: 104rpx;
    }
    .shopTitle {
      font-size: 24rpx;
      font-weight: bold;
      padding: 0 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }
    .shopScore {
      font-weight: normal;
      color: rgb(136, 136, 136);
      display: flex;
      justify-content: space-between;
      width: 80%;
    }
  }
  .recommend-goods-title {
    font-size: 28rpx;
    font-weight: bold;
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .recommend-goods {
    @include padding20rpx;
    padding-top: 0;
    padding-bottom: 108rpx;
    background-color: #f4f4f4;
    .recommend-goods-item {
      width: calc(50% - 20rpx);
      //box-sizing: border-box;
      margin: 0 10rpx 20rpx 10rpx;
      display: inline-block;
      background-color: #ffffff;
      &__img {
        width: 100%;
      }
      &__title {
        :last-child {
          width: 26rpx;
          height: 26rpx;
        }
        padding: 10rpx 20rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &__price {
        padding-left: 20rpx;
        color: rgb(102, 102, 102);
        font-size: 24rpx;
        display: flex;
        align-items: baseline;
        &__red {
          color: #ff2b22;
          font-size: 24rpx;
          font-weight: bold;
          :last-child {
            font-size: 38rpx;
          }
        }
      }
      &__coupon {
        background-image: linear-gradient(90deg,#ff8873,#ff4f4f);
        font-size: 24rpx;
        margin-left: 20rpx;
        display: inline-block;
        border-radius: 2px;
        padding: 2rpx 6rpx 2rpx 2rpx;
        color: #ffffff;
        :first-child {
          background-color: #ffffff;
          color: #fe3a33;
          padding: 0 2rpx;
        }
      }
      &__volume {
        font-size: 24rpx;
        color: #888;
        padding: 10rpx 20rpx 20rpx 20rpx;
      }
    }
  }
  .bottomMenu {
    padding: 14rpx 20rpx 14rpx 40rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 110;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    &__share {
      color: rgb(136, 136, 136);
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
    }
    &__getCoupon {
      display: flex;
      font-size: 28rpx;
      color: rgb(253, 69, 70);
      //flex: 1;
      height: 100%;
      align-items: center;
      width: 70%;
      &__first {
        background-color: #ffeee0;
        border-radius: 40px 0 0 40px;
        line-height: 80rpx;
        flex: 1;
        width: 50%;
        margin: 0 auto;
        text-align: center;
      }
    }
    &__price {
      display: flex;
      font-size: 24rpx;
      color: #ffffff;
      background-image: linear-gradient(270deg,#fe3c35,#ff1f4c);
      border-radius: 0 40px 40px 0;
      height: 100%;
      flex: 1;
      flex-direction: column;
      text-align: center;
      &__through {
        text-decoration: line-through;
        color: rgba(255, 255, 255, 0.6);
        display: inline-block;
      }
      //:last-child {
      //  font-size: 30rpx;
      //}
    }
  }
</style>
