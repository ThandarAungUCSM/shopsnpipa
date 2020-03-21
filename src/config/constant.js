import axios from 'axios';
import config from '../httpConfig';
const constant = {
    mainTitle: '好食源系统',
    mainName: '好食源',
    licence_remark: '注：以上营业执照信息，根据国家工商总局《网络交易管理办法》要求对入驻商家营业执照信息进行公示，除企业名称通过认证之外， 其余信息由卖家自行申报填写。 如需要进一步核实， 请联系当地工商行政管理部门。 ',
    serviceConfig: ''
}
// axios({
//     method: 'post',
//     url: config.serviceConfig,
// }).then((res) => {
//     var script = document.createElement('script');
//     script.src = res.data.data.url;
//     document.body.appendChild(script);
//     constant.serviceConfig = res.data.data.config_id;
// }).catch((err) => {
//     console.log(err);
// })
export default constant;
