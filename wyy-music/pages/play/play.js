// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
musicId:"",
action:{
"method":"play",
},
music_name:"",
music_image:"",
lrclist:[],
index:-1,//当前播放歌词下标
top:0,//滚动条位置
mode:"single",//播放模式
idlist:[],//id列表
playtime:"00:00",
duration:"",//总时长
max:0,//进度条最大值
value:0,//进度条当前值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
// console.log(options)
var mid=options.id
var idliststr=options.idlist
var idlist=idliststr.split(',')
// console.log(idlist)
this.setData({
  musicId:mid,
  idlist:idlist
})
this.showMusic()
this.lyricShow()
  },
  //歌曲详情
  showMusic:function(){
    var mid=this.data.musicId
    var that=this
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id=1359595520&amp;ids=['+mid+']',
      success: (res) => {
        // console.log(res.data.songs[0].name)
        //歌曲名称
        var name=res.data.songs[0].name
        //歌曲图片
        // console.log(res.data.songs[0].album.blurPicUrl)
        var imgurl=res.data.songs[0].album.blurPicUrl
        that.setData({
          music_name:name,
          music_image:imgurl
        })
      },
    })
  },
//更改播放状态
isPlay:function(){
  var data=this.data.action.method
  if(data=="play")
  this.setData({
    action:{
      "method":"pause"
    }
  })
  else
  this.setData({
    action:{
      "method":"play"
    }
  })
  console.log(this.data.action.method)
},
 //歌词显示
 lyricShow:function(){
  var mid=this.data.musicId
  // console.log(mid)
  var lyrurl='http://music.163.com/api/song/lyric?os=pc&id='+mid+'&lv=-1&tv=-1'
  wx.request({
    url:lyrurl,
    success:(res)=>{
    // console.log(res.data.lrc.lyric)
    var lyric=res.data.lrc.lyric
    //拆分歌词；时间和文本对应
    var lyricList=lyric.split("\n")
    // console.log(lyricList)
    var lyric_time_list=[]
    var t=/\[\d{2}:\d{2}\.\d{2,3}\]/
    for(var i=0;i<lyricList.length-1;i++){
      //  console.log(lyricList[i])
       var data_time=lyricList[i].match(t)
      //  console.log(data_time)
      if(data_time){
        var lrc=lyricList[i].replace(t,"")
        // console.log(lrc)
       if(data_time[0])
        {
        var timestr=data_time[0].slice(1,-1)
        var splitlist=timestr.split(":")
        var min=splitlist[0]
        var sec=splitlist[1]
        var time=parseFloat(min)*60+parseFloat(sec)
        lyric_time_list.push([time,lrc])
        // console.log(lyric_time_list[i])
        }
      }
    }
  this.setData({
lrclist:lyric_time_list
  })

    }
   
  })
  
 },
 timechange:function(e){
//当前播放时间
var playtime=e.detail.currentTime
//歌词时间
var lrclist=this.data.lrclist
var l=lrclist.length-1
for(var i=0;i<lrclist.length;i++){
  if(playtime>lrclist[l][0])
  this.setData({
    index:lrclist.length-1
  })
  if(lrclist[i+1]&&lrclist[i][0]<playtime&&playtime<lrclist[i+1][0])
  // if(playtime>lrclist[i][0])
  {
// console.log(lrclist[i][1])
this.setData({
  index:i
})
  }
}

if(this.data.index>5){
this.setData({
  top:(this.data.index-5)*25
})
}
//进度条
// console.log(e)

//总时长
var duration=e.detail.duration
var m=Math.floor(duration/60)
var s=Math.floor(duration%60)
// console.log((m<10?'0'+m:m)+':'+(s<10?'0'+s:s))
this.setData({
  duration:(m<10?'0'+m:m)+':'+(s<10?'0'+s:s),
  max:duration
})
//播放时间
var m=Math.floor(playtime/60)
var s=Math.floor(playtime%60)
this.setData({
  playtime:(m<10?'0'+m:m)+':'+(s<10?'0'+s:s),
  value:playtime
})
 }
 ,
 //切换播放模式（循环/单曲）
 changemode:function(){
  if(this.data.mode=='single')
    this.setData({
      mode:'order'
    })
  else
    this.setData({
      mode:'single'
    })
 },
 //歌曲播放完毕
 changeMusic:function(){
  console.log('播放完毕')
  var mode=this.data.mode
  if(mode=='single'){//单曲循环
  this.setData({
      musicId:this.data.musicId,
  })
  this.setData({
    action:{
      "method":"play"
    }
  })
}
  else{
      this.nextMusic()
    
  }
 
 
 },
//播放下一首
 nextMusic:function(){
var id=this.data.musicId
var idlist=this.data.idlist
var index=-1
for(var i=0;i<idlist.length;i++){
  if(id==idlist[i])
  {
    index=i
    break
  }
}
 if(index==idlist.length-1)
   id=idlist[0]
 else
   id=idlist[index+1]

  this.setData({
    musicId:id,
  })
  this.setData({
    action:{
      "method":"play"
    }
  })

  this.showMusic()
  this.lyricShow()
 },
 //播放上一首
 preMusic:function(){
  var id=this.data.musicId
  var idlist=this.data.idlist
  var index=-1
  for(var i=0;i<idlist.length;i++){
    if(id==idlist[i])
    {
      index=i
      break
    }
  }
   if(index==0)
     id=idlist[idlist.length-1]
   else
     id=idlist[index-1]
  
    this.setData({
      musicId:id,
    })
    this.setData({
      action:{
        "method":"play"
      }
    })
    this.showMusic()
    this.lyricShow()
   },
//拖动进度条
proBarChange:function(e){
  // console.log(e)
  var v=e.detail.value

  //修改播放时间
  this.setData({
    action:{
      method:"setCurrentTime",
      data:v
    }
  })
  this.setData({
    action:{
      method:"play",
      data:v
    }
  })
}
})