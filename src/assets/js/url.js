var url = '';
var host = window.location.href;

if (host.indexOf('localhost') != -1 || host.indexOf('192.168') != -1) {
  url = '/api';
}
// module.exports=url;
export default url;
