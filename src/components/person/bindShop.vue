<template>
    <div>
        <div v-title data-title="我要开店">我要开店</div>
        <top-header :text="title"></top-header>

        <dl class="content-wrap">
            <!--<dt class="clearfix" @click="toRouter('personal')">
                <img class="fl" v-if="data.user_header" :src="URL+ data.user_header">
                <img class="fl" v-else src="../../assets/my_user_pic.png">
                <div class="user fl">
                    <h2 class="userId">{{data.nick_name}}</h2>
                    <p class="userName">用户名：{{data.user_name}}</p>
                </div>
                <div class="icon-btn"></div>
            </dt>-->

            <dd @click="bindShop = true">
                选择店铺
                <div class="icon-btn"></div>
            </dd>
            <dd @click="Success">
                查看绑定进度
                <div class="icon-btn"></div>
            </dd>
        </dl>

        <!--<div class="page-popup-wrapper">
            <p @click="bindShop = true">选择店铺</p><br><br>
            <p @click="Success">查看绑定进度</p>
        </div>-->

        <mt-popup v-model="bindShop" position="right" class="mint-popup-3" :modal="false">
            <img class="cross_img" src="../../assets/images/xpng.png" alt="" @click="bindShop = false">
            <con-header :text="text[0]"></con-header>
            <ul class="per-center">
                <li>
                    <span class="span"> 选择店铺</span>
                    <select name="store_name" id="store_name">
                        <option value="">请选择店铺名称</option>
                        <option v-for="b in bStore" v-model="store_name">{{b.shop_name}}</option>
                    </select>
                </li>

                <li>
                    <span class="span"> 姓名:</span>
                    <input type="text" placeholder="请输入姓名..." v-model="worker_name">
                </li>
                <li>
                    <span class="span"> 性别:</span>
                    <input type="text" placeholder="请输入性别..." v-model="gender">
                </li>
                <li>
                    <span class="span"> 年龄:</span>
                    <input type="text" placeholder="请输入年龄..." v-model="age">
                </li>
                <li>
                    <span class="span"> 身份证:</span>
                    <input type="text" placeholder="请输入真实身份证" v-model="id_card">
                </li>
                <li>
                    <span class="span"> 上传图片:</span>
                    <input type="file" name="image" @change="imgUpload($event)" ref="int">
                </li>
                <li>
                    <span class="span"> 岗位:</span>
                    <input type="text" placeholder="请输入岗位" v-model="worker_position">
                </li>
            </ul>
            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
                <div class="picker-toolbar">
                    <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
                </div>
                <div class="select">
                    <ul class="address-area-tit">
                        <li :class="showProvince?'active':''" @click="selectedArea('province')">
                            {{ province }}</li>
                        <li v-if="choiceCity" :class="showCity?'active':''" @click="selectedArea('city')">
                            {{ city }}</li>
                        <li v-if="choiceArea" @click="selectedArea('area')" :class="showArea?'active':''">
                            {{ area }}</li>
                        <li v-if="choiceStreet" :class="showStreet?'active':''">
                            {{ street }}</li>
                    </ul>
                    <ul class="address-city" v-if="showProvince">
                        <li v-for="(n, i) in addressPlace" :key="i" @click="getProvince(n.id, n.name, i)" :class="i==provinceIndex?'selected-li':''">
                            {{ n.name }}</li>
                    </ul>
                    <ul class="address-city" v-if="showCity">
                        <li v-for="(n, i) in cityArr" :key="i" @click="getCity(n.id, n.name, i)" :class="i==cityIndex?'selected-li':''">
                            {{ n.name }}</li>
                    </ul>
                    <ul class="address-city" v-if="showArea">
                        <li v-for="(n, i) in districtArr" :key="i" @click="setCityEnd(n.id, n.name, i)" :class="i==areaIndex?'selected-li':''">{{ n.name }}</li>
                    </ul>
                    <ul class="address-city" v-if="showStreet">
                        <li v-for="(n, i) in TownshipArr" :key="i" @click="setStreetEnd(n.id, n.name, i)" :class="i==streetIndex?'selected-li':''">{{ n.name }}</li>
                    </ul>
                </div>
            </mt-popup>
            <button @click="saveBindInfo()">提交以上信息，并填写下一页</button>
        </mt-popup>

    </div>
</template>
<script>
    import { Field, Popup, Radio, Toast } from 'mint-ui';
    import qs from 'qs';
    import topHeader from '@/components/page/children/header.vue';
    import conHeader from '@/com/conHeader'; // 内容头
    export default {
        data() {
            return {
                title: '填写入驻资料',
                text: ['店铺信息'],
                bindShop: false,
                store_name:'',
                company_name: "",
                company_mobile: "",
                registered_capital: "",
                worker_name: '',
                gender: '',
                age: '',
                id_card: '',
                image: '',
                image_url: '',
                img_type: "",
                worker_position: '',
                name: '',
                mobile: "",
                address: '',
                popupVisible: false,
                popup: false,
                prov: '',
                cityArr: '',
                Bcity: '',
                district: '',
                districtArr: '',
                Township: '',
                TownshipArr: '',
                addressPlace: '',
                data: {
                    name: '',
                    phone: '',
                    address1: '',
                    addressAll: '',
                    addAll: '',
                    Det: '',
                    addressa: '',
                    value: 0
                },
                choiceProvince: false, //省按钮的显示隐藏
                choiceCity: false, // 市按钮的显示隐藏
                choiceArea: false, // 区按钮的显示隐藏
                choiceStreet: false,
                province: '请选择', // 选中的省
                city: '请选择', // 选中的市
                area: '请选择', // 选中的区
                street: '请选择', //选中的街道
                showProvince: true, // 省选择的显示隐藏
                showCity: false, // 市选择的显示隐藏
                showArea: false, // 区选择的显示隐藏
                showStreet: false, //街道的显示隐藏
                provinceId: '', // 选中的省id
                cityId: '', // 选中的市id
                areaId: '', // 选中的区id
                selected: false, // 选中的那个项
                provinceIndex: -1, // 选中态索引
                cityIndex: -1,
                areaIndex: -1,
                streetIndex: -1,
                choiceAreaCon: '请选择地区',
                shopInfo:{},
                bStore: []
            }
        },
        components: {
            topHeader,
            conHeader
        },
        created(){
            this.proAjax(0, 0);
            if(sessionStorage.getItem('admissionInfo')){
                this.shopInfo =  JSON.parse(sessionStorage.getItem('admissionInfo'));
                this.store_name = this.shopInfo.store_name;
                this.company_name = this.shopInfo.company_name;
                this.data.addressAll = sessionStorage.getItem('kd_address');
                this.provinceId = this.shopInfo.prov_id;
                this.cityId	= this.shopInfo.city;
                this.areaId	= this.shopInfo.dist;
                this.address = this.shopInfo.address;
                this.company_mobile = this.shopInfo.company_mobile;
                this.registered_capital = this.shopInfo.registered_capital;
                this.name = this.shopInfo.name;
                this.mobile = this.shopInfo.mobile;
            }
        },
        mounted(){
            this.bindStore();
        },
        methods: {
            bindStore(){
                this.axios.post(this.$httpConfig.bindStore)
                    .then(res => {
                        this.bStore = res.data.data;
                    })
                    .catch(e => {console.log(e)})
            },
            imgUpload(e) {
                let file = e.target.files[0];
                const reader = new FileReader();
                this.img_type = "data:" + file.type + ";base64,";
                reader.readAsDataURL(file);
                let param = new FormData(); // 创建form对象
                console.log(file, file.name);
                param.append("image", file.name); // 通过append向form对象添加数据
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                this.axios.post(this.$httpConfig.uploadPhysical, param, config)
                    .then(res => {
                        if (res.data.status == 10001) {
                            this.$router.push("/LogIn");
                        }
                        else
                            {
                            if (res.data.status === 1) {
                                this.image_url = res.data.data.image_url;
                            }
                            else {
                                Toast(res.data.message);
                            }
                        }
                    });
            },
            saveBindInfo(){
                this.axios.post(this.$httpConfig.saveBindInfo, qs.stringify({
                    bind_store_id : this.store_name,
                    worker_name: this.worker_name,
                    sex: this.gender,
                    age: this.age,
                    id_number: this.id_card,
                    safety_url: this.image,
                    worker_position: this.worker_position
                }))
                    .then(res => {})
                    .catch(e => {console.log(e)})
            },
            Success(){
                this.axios.post(this.$httpConfig.checkAudit)
                    .then(res => {
                        if (res.data.data.status === 1){
                            Toast({
                                message: '成功',
                                duration: 1000
                            });
                        }
                    })
            },
            nextinfor: function() {
                if(!this.store_name){
                    Toast({
                        message: '请填写公司名称',
                        duration: 1000
                    });
                    return;
                }
                if(!this.company_name){
                    Toast({
                        message: '请填写公司名称',
                        duration: 1000
                    });
                    return;
                }
                if(!this.address){
                    Toast({
                        message: '请填写详细地址',
                        duration: 1000
                    });
                    return;
                }
                if(!(/^((0\d{2,3}-?)?\d{7,8}|(1[3584]\d{9}))$/.test(this.company_mobile))){
                    Toast({
                        message: '请填写正确的电话',
                        duration: 1000
                    });
                    return;
                }
                if(!this.registered_capital){
                    Toast({
                        message: '请填写正确注册资金',
                        duration: 1000
                    });
                    return;
                }
                if(!this.name){
                    Toast({
                        message: '请填写联系人名称',
                        duration: 1000
                    });
                    return;
                }
                if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.mobile))){
                    Toast({
                        message: '请填写正确的手机号',
                        duration: 1000
                    });
                    return;
                }
                this.shopInfo.store_name = this.store_name;
                this.shopInfo.company_name = this.company_name;
                this.shopInfo.prov_id = this.provinceId;
                this.shopInfo.city = this.cityId;
                this.shopInfo.dist = this.areaId;
                this.shopInfo.address = this.address;
                this.shopInfo.company_mobile = this.company_mobile;
                this.shopInfo.registered_capital = this.registered_capital;
                this.shopInfo.name = this.name;
                this.shopInfo.mobile = this.mobile;
                sessionStorage.setItem('admissionInfo',JSON.stringify(this.shopInfo));
                sessionStorage.setItem('kd_address',this.data.addressAll);
                this.$router.push({
                    name: "companyPhotos"
                })
            },
            callingArea() {
                this.popupVisible = true;
            },
            cancleaddress() {
                this.popupVisible = false;
            },
            callingadd() {
                this.popup = true;
            },
            selectaddress() {
                this.popupVisible = false;
                if(this.province==""||this.province=="请选择") {
                    Toast({
                        message: '请选择地址',
                        duration: 1000
                    });
                } else if(this.city==""||this.city=="请选择"){
                    Toast({
                        message: '请选择地址',
                        duration: 1000
                    });
                }else if(this.area==""||this.area=="请选择" ){
                    Toast({
                        message: '请选择地址',
                        duration: 1000
                    });
                }else{
                    this.data.addressAll = this.province + '-' + this.city + '-' + this.area;
                    this.choiceCity=false;// 市按钮的显示隐藏
                    this.choiceArea=false; // 区按钮的显示隐藏
                    this.choiceStreet=false;
                    this.choiceProvince=true; // 省按钮的显示隐藏
                    this.showStreet = false;
                    this.showProvince=true;
                    this.province="请选择"
                }

            },
            proAjax(index, selId) {
                this.axios({
                    method: 'get',
                    url: this.$httpConfig.cityList,
                    params: {
                        parent_id: index,
                        id: ""
                    }
                })
                    .then((res) => {
                        let data = res.data.data;
                        if(selId == 0) {
                            this.addressPlace = data;
                        } else if(selId == 1) {
                            this.cityArr = data;
                        } else if(selId == 2) {
                            this.districtArr = data;
                        } else if(selId == 3) {
                            this.TownshipArr = data;
                        }
                    }).catch((err) => {
                    console.log(err);
                });
            },
            selectedArea(type) { // 按钮点击
                if(type == "province") {
                    this.cityIndex = -1;
                    this.areaIndex = -1;
                    this.streetIndex = -1

                    this.choiceCity = false;
                    this.choiceArea = false;
                    this.choiceStreet = false,

                        this.showProvince = true;
                    this.showCity = false;
                    this.showArea = false;
                    this.showStreet = false;

                } else if(type == "city") {
                    this.cityIndex = -1;
                    this.areaIndex = -1;
                    this.streetIndex = -1
                    this.choiceArea = false;
                    this.choiceStreet = false;

                    this.showProvince = false;
                    this.showCity = true;
                    this.showArea = false;
                    this.showStreet = false;
                }
            },

            getProvince(id, name, index) {
                this.Bcity = '请选择', // 选中的市
                    this.area = '请选择', // 选中的区
                    this.city = '请选择';
                this.choiceCity = true;
                this.province = name;
                this.provinceId = id;
                this.showProvince = false;
                this.showCity = true;
                this.showArea = false;
                this.showStreet = false;
                this.cityArr = this.proAjax(this.provinceId, 1);
            },
            getCity(id, name, index) { // 获取城市列表
                this.area = '请选择', // 选中的区
                    this.choiceArea = true;
                this.city = name;
                this.cityId = id;
                this.showProvince = false;
                this.showCity = false;
                this.showArea = true;
                this.showStreet = false;
                this.districtArr = this.proAjax(this.cityId, 2);
            },
            setCityEnd(id, name, index) { // 区点完以后
                this.area = name;
                this.areaId = id;
            },
        },
    }
</script>
<style lang="less" scoped>

    .mint-popup-right {
        height: 94% !important;
        top: 53% !important;
        background: #fff !important;
        position: absolute !important;
    }

    .per-center li select{
        width: 4.2rem !important;
    }

    .content-wrap{
        background:#fff;
        dt{
            padding:.2rem;
            height:1.14rem;
            position:relative;
            border-bottom:1px solid #e7e7e7;
            img{
                width:1.14rem;
                height:1.14rem;
                border-radius:100%;
                box-sizing:border-box;
            }
            .user{
                padding-left:.3rem;
                .userId{
                    font-size:.32rem;
                    color:#333;
                    padding-top:.1rem;
                }
                .userName{
                    padding-top:.2rem;
                    font-size:.26rem;
                    color:#999;
                }
            }
            .icon-btn{
                position:absolute;
                top:50%;
                right:.2rem;
                margin-top:-.12rem;
                width:.14rem;
                height:.24rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
            }
        }
        dd{
            height:.9rem;
            border-bottom:1px solid #e7e7e7;
            position:relative;
            font-size:.32rem;
            color:#3d4245;
            line-height:.9rem;
            padding:0 .2rem;
            .icon-btn{
                position:absolute;
                top:50%;
                right:.2rem;
                margin-top:-.12rem;
                width:.14rem;
                height:.24rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
            }

        }
        .toPass{
            height:15/100rem;
            background-color: #f1f1f1;
            border: 0;
        }
    }
    .footer{
        height:.9rem;
        position:fixed;
        left:0;
        bottom:0;
        text-align:center;
        line-height:.9rem;
        background: #00c65d;
        color:#fff;
        width:100%;
        font-size:.32rem;
    }
    .footer:active{
        box-shadow: 0 -5px 5px #ccc;
    }
    .mint-popup {
        font-size: 0.28rem;
        background: none;
    }
    .password-wrap {
        width: 7.5rem;
        text-align: center;
        li {
            height: 0.8rem;
            line-height: 0.8rem;
            border-top: 1px solid #ccc;
            box-sizing: border-box;
            color: #26a2ff;
            font-size: 0.3rem;
            background: #fff;
        }
        li:nth-child(3) {
            margin-top: 0.2rem;
        }
    }

    .page-popup-wrapper {
        width: 50%;
        height: 50%;
        margin: 2rem auto;
        p {
            width: 3rem;
            border: .02rem solid #00c65d;
            border-radius: 2rem;
            padding: .3rem;
            font-size: .3rem;
            text-align: center;
        }
    }

    img.cross_img{
        display: inline-block;
        float: right;
        width: .3rem;
        padding: .2rem;
    }

    .per-center {
        li {
            background-color: #fff;
            border-bottom: 1px solid #F1F1F1;
            height: 90/100rem;
            display: flex;
            align-items: center;
            font-size: 28/100rem;
            padding: 0 20/100rem;
            .span {
                width: 100px;
                font-size: 32/100rem;
                color: #BDBDBD
            }
            input {
                width: 520/100rem;
                height: 90/100rem;
                border: 0;
                background: #fff;
                font-size: 28/100rem;
                padding-left: 30/100rem;
                box-sizing: border-box
            }

            select{
                width: 5.2rem;
                height: 0.9rem;
                border: 0;
                background: #fff;
                font-size: 0.28rem;
                padding-left: 0.3rem;
                box-sizing: border-box;
            }

        }
        li:nth-of-type(2) input{padding-left: 35/100rem;}
        a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .rightImg {
            width: 24/100rem;
            height: 44/100rem;
        }
    }
    .mint-datetime-action{
        color: #ff8000;
    }
    button {
        margin: 75/100rem 20/100rem 0;
        height: 90/100rem;
        color: #fff;
        background-color: #00c65d;
        border-radius: 90/100rem;
        border: 0;
        width: 710/100rem;
        outline: none;
        font-size: 32/100rem
    }

    .mint-popup-bottom {
        width: 100%;
        padding: .2rem;
        height:7rem;
        box-sizing: border-box;
        .select {
            padding: .2rem 0;
            select {
                padding-left: 10/100rem;
                border: 1/100rem solid #d9d9d9;
                width: 24%;
                height: .5rem;
                background: #fff;
                outline: none;
                option {
                    color: #333;
                    text-align: center;
                }
            }
        }
    }

    #address-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        position: absolute;
        left: 0;
        top: 0;
    }

    #address-area {
        width: 100%;
        height: 320px;
        overflow: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        box-shadow: 0 -4px 7px rgba(255, 255, 255, .6);
    }

    .address-area-tit {
        border-bottom: 1px solid #ccc;
        line-height: 40px;
        box-shadow: 0px 1px 2px rgba(23, 43, 135, .2);
    }

    #address-mask ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .address-area-tit {
        padding: 0;
        box-shadow: none;
        margin-bottom:0.2rem;
        border-bottom: 0;
        height: 41px;
    }

    .address-area-tit li {
        cursor: pointer;
        position: relative;
        left: 0;
        top: 1px;
        height: 40px;
        padding: 0 .2rem;
        width: 24%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 12px;
        display: inline-block;
        border-bottom: 1px solid #ccc;
    }

    .address-area-tit li.active {
        border-bottom: 1px solid #ff8000;
        color: #ff8000;
    }

    .address-city {
        margin-top: 10px;
        height: 4.5rem;
        overflow: hidden;
        overflow-y: scroll;
        width: calc(100% + 30px);
    }

    .address-city li {
        padding: 0 35px;
        line-height: 30px;
        font-size: 12px;
        cursor: pointer;
    }

    .address-city li.selected-li {
        color: #ff8000;
    }
</style>
