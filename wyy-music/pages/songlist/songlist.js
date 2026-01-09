// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/77406000336/526f/4417/dbc8/7aa7ca3f8afbb009e5bb4c78f04a8149.jpg', 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/77405953694/e069/d607/a928/84c42fd912ae4dc4acde6abc34825b06.jpg', 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/77409002696/74c9/b040/52b7/60c562b3849664e5270fd02d00600725.jpg'],
    musiclist:[],
    //搜索框中值
    search_key:"",
    //封面图片url
    imgUrl_list:[],
    idlist:[],//歌曲id列表
     musicSum:10//歌曲数量
  },
play:function(e){
  // console.log("页面跳转");
  // console.log(e.currentTarget.dataset.id)
// console.log(this.data.idlist)
  var mid=e.currentTarget.dataset.id
  var idlist=this.data.idlist
  wx.navigateTo({
    url: '/pages/play/play?id='+mid+'&idlist='+idlist,
  })
},
//搜索框中值改变
search_keychange:function(e){
// console.log(e.detail.value)
var key=e.detail.value
this.setData({
  search_key:key
})
// console.log(this.data.search_key)
},
//搜索
search:function(){
var key=this.data.search_key
var sum=this.data.musicSum
var url="http://music.163.com/api/search/get?s="+key+"&type=1&limit="+sum;
// console.log(url)
var idlist=[]
wx.request({
  url:url,
  success:(e)=>{
    // console.log(e.data.result.songs)
    var songs=(e.data.result.songs)
    this.setData({
      musiclist:songs
    })
    // console.log(this.data.musiclist)
    for(var i=0;i<songs.length;i++)
    {
      idlist.push(songs[i].id)
    }
    this.setData({
      idlist:idlist,
      imgUrl_list:[]
    })
    this.getImage(idlist,0,idlist.length)
    // console.log(this.data.imgUrl_list)
  }
})
},
//获取封面图片
getImage:function(idlist,i,length){
  var imgUrl_list=this.data.imgUrl_list
  var url="https://music.163.com/api/song/detail/?id=1359595520&amp;ids=["+idlist[i]+"]"
  wx.request({
    url:url,
    success:(e)=>{
      console.log(e)
      var img=e.data.songs[0].album.blurPicUrl
      imgUrl_list.push(img)
      this.setData({
        imgUrl_list:imgUrl_list
      })
      //跳出递归条件
      if(++i<length)
    {
      this.getImage(idlist,i,length)
    }
}
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
//加载等多歌曲
var key=this.data.search_key
   if(!key==""){
    var sum=this.data.musicSum
    sum+=6
    this.setData({
      musicSum:sum
    })
    var url="http://music.163.com/api/search/get?s="+key+"&type=1&limit="+sum;
    var idlist=[]
    //加载效果
    wx.showLoading({
      title: '歌曲加载中',
    })
    wx.request({
      url:url,
      success:(e)=>{
        var songs=(e.data.result.songs)
        this.setData({
          musiclist:songs
        })
        for(var i=0;i<songs.length;i++)
        {
          idlist.push(songs[i].id)
        }
        this.setData({
          idlist:idlist,
          imgUrl_list:[]
        })
        this.getImage(idlist,0,idlist.length)
      }
    })
    // setTimeout(function(){
    // },2000)
    wx.hideLoading()
   }
   else{
    console.log("搜索框为空")
   }

  }
})