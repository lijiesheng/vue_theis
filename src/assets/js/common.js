/**
 * @author : lijiesheng
 * @date : 2023/3/16 1:47 下午
 * @description :
 */

export default{
  install(Vue){
    //这里是示例方法 getTime是方法名 function()可以携带参数
    Vue.prototype.getTime = function(){
      var date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      alert(y + m + d)
    }
  }
}
