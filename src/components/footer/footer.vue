<template>
  <div class="foot2017">
    <ul class="footer clearfix">
      <li
        class="fl"
        :class="{isSelected:index == parseInt(isClass)}"
        v-for="(item,index) in tabbar.font"
        :key="item.id"
        @click="tab(index)"
      >
        <div class="icon">
          <img :src="tabbar.Icon[index]" />
        </div>
        <div class="icon active">
          <img :src="tabbar.isIcon[index]" />
        </div>
        <div class="font">{{item}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "page-footer",
  data() {
    return {
      isClass: sessionStorage.getItem("router_index"),
      tabbar: {
        isIcon: [
          require("@/assets/images/footer_home_active.png"),
          require("@/assets/images/footer_navi_active.png"),
          require("@/assets/images/footer_faxian_active.png"),
          require("@/assets/images/footer_person_active.png")
        ],
        Icon: [
          require("@/assets/images/footer_home.png"),
          require("@/assets/images/footer_navi.png"),
          require("@/assets/images/footer_faxian.png"),
          require("@/assets/images/footer_person.png")
        ],
        font: ["好食源", "导航", "发现", "我的"]
      }
    };
  },
  methods: {
    tab: function(index) {
      switch (index) {
        case 0:
          this.$router.push({
            path: "/home"
          });
          break;
        case 1:
          this.$router.push({
            path: "/baiduMap"
          });
          break;
        case 2:
          this.$router.push({
            name: "Cart"
          });
          break;
        case 3:
          this.$router.push({
            path: "/person"
          });
          break;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.isClass = sessionStorage.getItem("router_index");
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.foot2017 {
  width: 100%;
  height: 1rem;
  .footer {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;

    z-index: 2;
    background: #fff;
    box-shadow: border-box;
    z-index: 99999999;
    li {
      width: 25%;
      text-align: center;

      .font {
        font-size: 0.2rem;
        color: #333;
        padding-bottom: 5/100rem;
        display: inline-block;
      }
      .icon {
        height: 0.55rem;
        position: relative;
        display: block;
        border-top: 3px solid #313133;
        img {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
      .icon.active {
        display: none;
        border-top: 3px solid #00C65D;
      }
    }
    li.isSelected {
      .font {
        color: #00C65D;
      }
      .icon.active {
        display: block;
      }

      .icon {
        display: none;
      }
    }
    li:nth-child(1) {
      img {
        width: 0.39rem;
        height: 0.37rem;
      }
    }
    li:nth-child(2) {
      img {
        width: 0.43rem;
        /*height: 0.32rem;*/
      }
    }
    li:nth-child(3) {
      img {
        width: 0.45rem;
        /*height: 0.41rem;*/
      }
    }
    li:nth-child(4) {
      img {
        width: 0.35rem;
        height: 0.4rem;
      }
    }
  }
}
</style>
