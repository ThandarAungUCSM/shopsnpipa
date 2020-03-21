<template>
    <div>
        <!-- center="菏泽�???"  -->
        <baidu-map class="map" :center="{lng: 115.4767, lat: 35.2337}" :zoom="10" :scroll-wheel-zoom="true" :showAddressBar="true" :autoLocation="true" @touchstart="touchstartClickEvent">
            <bm-control :offset="{width: '10px', height: '10px'}">
                <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
                    <input class="map-search" type="text" placeholder="菏泽�???">
                </bm-auto-complete>
            </bm-control>
            <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
            <div v-if='selectedItems'>
                <bm-marker
                    v-for="(item, i) in selectedItems" :key="'item' + i"
                    :position="{lat: item.lat, lng: item.lon}"
                    :dragging="true" 
                    @click="showWindowOpen(item, i)"
                    animation="BMAP_ANIMATION_BOUNCE"
                    :icon="respectiveSlickSelected !== item ? {url: URL + item.logo, size: {width: 20, height: 20}} : {url: require('@/assets/pin.png'), size: {width: 25, height: 25}}"
                >
                </bm-marker>
            </div>
            <div>
                <slick ref="slick" :options="slickOptions" 
                    @afterChange="handleAfterChange"
                    v-if="slickShow" class="slickCss slider">
                    <div v-for="(address, addIndex) in totalSelectedItems" :key="addIndex" class="slickWidth">
                        <div class="slickImg">
                            <p class="slickItemHideData">{{ address }}</p>
                            <p class="slickItem">{{ address.shop_name }}</p>
                            <a @click="enterShop(address)"><img :src="URL + address.pic_url" class="img-size"></a>
                        </div>
                    </div>
                </slick>
            </div>
        </baidu-map>

        <i @click="drawer = true" class="el-icon-s-operation map-icon"></i>

        <el-drawer :with-header="false" :visible.sync="drawer" size="65%;overflow-y: auto">
            <div>
                <el-row class="drawer">
                    <el-col :span="12">
                        <div :class="[active_tab == 'liveStream' ? 'activeBtn' : '']" @click="active_tab = 'liveStream'">
                            <i class="drawer-icon el-icon-video-camera"></i>
                            <p>在线状�?</p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div :class="[active_tab == 'allShop' ? 'activeBtn' : '']" @click="active_tab = 'allShop'">
                            <i class="drawer-icon el-icon-s-shop"></i>
                            <p>经营类型</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <el-divider></el-divider>
            <el-menu class="nav-menu" v-if="active_tab == 'allShop'">
                <el-submenu index="-1">
                    <template slot="title">
                        <span class="title-font">全�?</span>
                        <el-checkbox :value="checkedAll" class="right" @change="changeAll($event)"></el-checkbox>
                    </template>
                </el-submenu>

                <li v-for="shop in shops" :key="'parent' + shop.id" >
                    <el-menu-item class="el-menu-item" v-for="t in shop.store" :key="'child' + t.id">
                        <i class="el-icon-burger menu-icon">
                            <span>{{t.shop_name}}</span>
                        </i>
                        <el-checkbox
                            class="right"
                            @change="childItemChange(shop, t)"
                            :value="t.status"
                        ></el-checkbox>
                    </el-menu-item>
                </li>
            </el-menu>
        </el-drawer>
    </div>
</template>

<script src="https://code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script>
<script src="../../../node_modules/slick-carousel/slick/slick.js" type="text/javascript" charset="utf-8"></script>
<script>
    import header from './children/header'
    import park from '../../assets/park.jpg'
    import Slick from 'vue-slick'
    import '../../../node_modules/slick-carousel/slick/slick.css';
    import '../../../node_modules/slick-carousel/slick/slick-theme.css';
    // import 'https://code.jquery.com/jquery-2.2.0.min.js'
  
    export default {
        data () {
            return {
                children: 0,
                active_tab: 'allShop',
                slickSelected: null,
                result: '',
                currentSlideData: '',
                slickShow: false,
                slickOptions: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    // accessibility: true,
                    // adaptiveHeight: false,
                    // draggable: true,
                    // edgeFriction: 0.30,
                    // swipe: true
                },
                data: {},
                selectedItems: [],
                totalSelectedItems: [],
                checkedAll: false,
                shopId: null,
                checkAll: false,
                checkedById: null,
                classId : null,
                isIndeterminate: true,
                drawer_show: true,
                checked: false,
                o_checked: false,
                drawer: false,
                innerDrawer: false,
                show: false,
                keyword: '',
                center: {
                    lat: 35.2337,
                    lng: 115.4807
                },
                start: {
                    lat: 35.2337,
                    lng: 115.4767
                },
                end: {
                    lat: 35.2262,
                    lng: 115.4807
                },
                shops: [],
                home:[],
                zoom: 15,
                map: '<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=%E4%B8%8A%E6%B5%B7%E5%B8%82&c=65519&searchFlag=bigBox&version=5&exptype=dep&src_from=webapp_all_bigbox&wd2=%E4%B8%8A%E6%B5%B7%E5%B8%82&sug_forward=8eb697c2bdf8bae8b6f42fe7&src=1&nb_x=10701414.71&nb_y=1885331.91&center_rank=1/vt="></iframe>',
            }
        },
        mounted(){
            this.getStoreDetail();
        },
        computed: {
            respectiveSlickSelected () {
                if(this.slickSelected != null) {
                    return this.slickSelected
                }
            },
        },
        
        methods: {
            // BMap is Baidu map API namespace, all classes in it
            
            touchstartClickEvent(){
                this.slickSelected = null;
                this.slickShow = false;
            },
            enterShop(storeData) {
                this.$router.push({
                    name: "shopDetails",
                    params: {
                        id: storeData.id,
                        index: 0
                    }
                });
            },
            next() {
                this.$refs.slick.next();
            },
            prev() {
                this.$refs.slick.prev();
            },
            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
            
            handleAfterChange(event, slick, currentSlide) {
                // console.log('handleAfterChange', event, slick, currentSlide);
                // console.log('TotalItem Target ' + event.target.innerText)

                // console.log((slick.$slides[currentSlide].innerText))
                // console.log(slick.$slides.get(currentSlide))

                this.currentSlideData = slick.$slides[currentSlide].innerText
                let goodLuck=''
                var startPoint
                var endPoint
                for(var i = 0; i < this.currentSlideData.length; i++) {
                    if(this.currentSlideData[i] == '{') {
                        startPoint = i
                    }
                    else if(this.currentSlideData[i] == '}'){
                        endPoint = i
                    }
                }
                for(var i = startPoint; i <= endPoint; i++) {
                    goodLuck += this.currentSlideData[i]
                }
                var myobj = JSON.parse(goodLuck)
                for(var i = 0; i < this.selectedItems.length; i++) {
                    if(myobj.class_id == this.selectedItems[i].class_id &&
                    myobj.shop_name == this.selectedItems[i].shop_name ) {
                        this.slickSelected = this.selectedItems[i]
                    }
                }
            },
            
            childItemChange(parentData, childData) {
                if(parentData && childData) {
                    if(childData.status == 0){
                        childData.status = true
                    } else if(childData.status == 1){
                        childData.status = false
                    } else {
                        childData.status = !(childData.status)
                    }

                    for(var i = 0; i < this.shops.length; i++) {
                        if(this.shops[i].id == parentData.id ) {
                            for(var j = 0; j < this.shops[i].store.length; j++) {
                                if(this.shops[i].store[j].id == childData.id) {
                                    this.shops[i].store[j].status = childData.status
                                }
                            }
                        }
                    }

                    if(childData.status && childData.status == true) {
                        this.selectedItems = [...this.selectedItems, childData]
                    } else {
                        for(var i = this.selectedItems.length - 1; i >= 0; i--) {
                            if(this.selectedItems[i].id == childData.id) {
                                this.selectedItems.splice(i, 1)
                            }
                        }
                    }

                    if(this.selectedItems.length == this.children) {
                        this.checkedAll = true
                    } else {
                        this.checkedAll = false
                    }
                } 
                
                if(this.selectedItems) {
                    this.totalSelectedItems = []
                    this.slickShow = false
                    this.slickSelected = null
                    for(var i = 0; i < this.selectedItems.length; i++) {
                        this.totalSelectedItems = [...this.totalSelectedItems, this.selectedItems[i]]
                    }
                }
                
            },

            changeAll(e) {
                if(this.shops) {
                    this.checkedAll = !this.checkedAll
                    for(var i = 0; i < this.shops.length; i++){
                        this.shops[i].status = (this.checkedAll)
                        for(var j = 0; j < this.shops[i].store.length; j++) {
                            this.shops[i].store[j].status = (this.checkedAll)
                            if(this.checkedAll == true) {
                                this.selectedItems = [...this.selectedItems, this.shops[i].store[j]]
                            } else {
                                this.selectedItems = []
                            }
                        }
                    }
                }
                
                if(this.selectedItems) {
                    this.totalSelectedItems = []
                    this.slickShow = false
                    this.slickSelected = null
                    for(var i = 0; i < this.selectedItems.length; i++) {
                        this.totalSelectedItems = [...this.totalSelectedItems, this.selectedItems[i]]
                    }
                }
            },
            
            getStoreDetail(){
                this.axios.get(this.$httpConfig.getStore)
                    .then(res => {
                        this.shops = res.data.data;
                        for (var i = 0; i < this.shops.length; i++)
                        {
                            this.home = this.shops[i].store;
                            for(var j = 0; j < this.home.length; j++) {
                                this.children++
                            }
                        }
                    })
                    .catch(e=> {console.log(e)})
            },
            WindowClose () {
                this.show = false
            },
            WindowOpen () {
                this.show = true
            },
            showWindowOpen(marker, parentId) {
                setTimeout(() => {
                    this.data = marker;
                    console.assert(
                    { lng: marker.lon, lat: marker.lat },
                    marker
                    );
                    this.WindowOpen();
                }, 500);

                let selectedIndex
                for(var i = 0; i < this.totalSelectedItems.length; i++) {
                    if(marker.id == this.totalSelectedItems[i].id 
                    && marker.shop_name == this.totalSelectedItems[i].shop_name
                    && marker.logo == this.totalSelectedItems[i].logo) {
                        selectedIndex = i;
                        break;
                    }
                }
                this.totalSelectedItems.unshift(this.totalSelectedItems.splice(selectedIndex,1)[0]);
                
                this.slickSelected = this.selectedItems[parentId]
                this.slickShow = true;
                // http://center.ihaosy.com/Uploads/goods/2019-08-16/5d5654bf3ff08.jpg
                // http://center.ihaosy.com/Uploads/goods/2019-08-17/5d57a4bbe33ba.jpg

            },
            
            btnGo(){
                this.$router.go(-1);
            }
            
        },
        components: {
            // BaiduMap,
            Slick
        }

    }
</script>
 

  
<style scoped lang="less">
    .activeBtn {
        border: 1px solid orange;
    }
    .center .slick-center&.active, .slick-current {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
    }
    .slick-center&.active&.slick-active {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
    }
    .slickImg {
        width: 98%;
        text-align: center;
        /*padding: 0px 20px;*/
        position: relative;
        .slickItemHideData {
            font-size: 0px; 
            bottom: 0px; 
            position: absolute;
        }
        .slickItem {
            font-size: 10px; 
            bottom: 10px; 
            position: absolute;
            padding-left: 10px;
        }
        .img-size{
            width: 100%;
            height: 82%;
        }
    }
    .slickWidth {
        width: 80%;
    }
    .slider {
        width: 50%;
        margin: 100px auto;
    }

    .slick-slide {
        margin: 0px 20px;
    }

    .slick-slide img {
        width: 100%;
    }

    .slick-prev:before,
    .slick-next:before {
        color: black;
    }


    .slick-slide {
        transition: all ease-in-out .3s;
        opacity: .2;
    }

    .slick-active {
        opacity: .5;
    }

    .slick-current {
        opacity: 1;
    }


    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .map-icon{
        font-size: 0.8rem;
        color: #888;
        position: absolute;
        top: 1.2rem;
        right: .3rem;
        background: #fff;
        width: .8rem;
    }

    .drawer-div{
        padding: .2rem;
        label{
            font-size: .3rem;
        }
        .drawer-checkbox{
            width: .4rem;
            height: .4rem;
            border: 1px solid #ccc;
            border-radius: .1rem;
            margin-right: .2rem;
            float: right;
        }
    }

    .tangram-suggestion-main {
        z-index: 1;
    }

    .map {
        width: 100%;
        height: 90%;
        /*div * {
            height: 100%;
            width: 100%;
        }*/

        .map-info{
            height: 1.5rem !important;
            background: #00C65D;
            .map-title{
                height: .2rem !important;
                font-size: .15rem;
                position: absolute;
                color: #fff;
            }
            .map-content{
                height: .2rem !important;
                font-size: .15rem;
                position: absolute;
                color: #fff;
                bottom: .4rem;
                padding: .1rem;
            }

            .map-img{
                height: 1.5rem !important;
            }
        }

        .map-search{
            height: .78rem !important;
            width: 7rem !important;
            border: none;
            margin: .2rem;
            padding: .15rem;
        }
    }

    .drawer{
        padding: .2rem;
        text-align: center;
        .drawer-icon{
            font-size: 1rem;
            color: #fff;
            background: lightblue;
            padding: .3rem;
            margin-bottom: .2rem;
        }
        p{
            font-size: .35rem;
        }
    }

    .header {
        height: .6rem;
        display: flex;
        padding: .17rem .1rem;
        background: #00C65D;
        margin-bottom: .2rem;
        position: fixed;
        z-index: 1;
        width: 100%;
        .btnGo {
            position: absolute;
            margin: .1rem;
            width: .30rem;
            height: .46rem;
            background: url(../../assets/backfind.png) no-repeat;
            background-size: 100% 100%;
        }

        .header-text {
            color: #fff;
            font-size: .45rem;
            padding: 0 1rem 0 3rem;
        }
    }

    .nav-menu {
        .title-font {
            font-size: 1.2em;
            color: #838383;
        }

        .right{
            float: right;
            top: 40%;
        }

        .circle *{
            border-radius: 100% !important;
        }

        .el-menu-item {
            padding-left: .6rem !important;
            padding-right: .4rem !important;
        }
        .menu-icon {
            font-size: 25px;
            span {
                font-size: 0.7em;
                padding-left: 5px;
                color: #111;
            }
        }
    }
    .baidu-map-img {
        width: 4rem;
        height: 3rem;
    }

    .slickCss {
        display: block;
        // margin: 0px;
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: .3rem;
        height: 30%;
        z-index: 1;
        width: 100%;
        bottom: 0;
        position: absolute;

        border: 1px solid #f4f4f4;
    }
</style>
