<template>
  <div class="exp_word_wrap">
    <!-- <div class="easy_player">
      <easy-player
        :video-url="videoPath"
        fluent
        :autoplay="false"
        :live="false"
        stretch

      ></easy-player>
    </div> -->
    <!-- <div class="easy_player">
      <LivePlayer :videoUrl="videoPath" :autoplay="false" fluent :live="false" stretch></LivePlayer>
    </div> -->
    <!-- <div>
      <videoPlayer
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      >
      </videoPlayer>
    </div> -->
    <div class="eww_main">
      <div class="eww_back" @click="$router.go(-1)">
        <img src="../../assets/images/word/back.png" alt="" />
        <span>返回上一页</span>
      </div>
      <div class="eww_video">
        <div class="eww_v_box" v-if="sandVideoPath != '' && usbVideoPath != ''">
          <div class="v_per_box">
            <video
              ref="videop"
              class="video_per"
              :controls="false"
              controlslist="nodownload"
            >
              <source :src="usbVideoPath" type="video/mp4" />
            </video>
          </div>
          <video
            ref="videos"
            class="video_sha"
            :controls="false"
            controlslist="nodownload"
          >
            <source :src="sandVideoPath" type="video/mp4" />
          </video>
          <div class="eww_btns">
            <!-- <div class="eww_btn_bg"></div> -->
            <div class="ev_pst_box">
              <el-button ref="isPlay" class="ev_btn stop">
                <img
                  v-if="isPlayFlag"
                  src="../../assets/images/word/play_z.png"
                  alt=""
                />
                <img v-else src="../../assets/images/word/play_s.png" alt="" />
              </el-button>
              <div class="ev_time">
                <div ref="current" style="color:#ffffff">00:00</div>
                <div style="margin:0 0.04rem">/</div>
                <div ref="duration" style="color:#777980">00:00</div>
              </div>
            </div>
            <div class="ev_ra_box">
              <div class="ev_rate">
                <div ref="rateBtns">
                  {{ rateTrueName == "" ? rateVal : rateTrueName }}
                </div>
                <ul ref="rateUlLists" v-show="rateShow">
                  <li
                    v-for="item in rateList"
                    @click="rateChange(item)"
                    :key="item.num"
                    :style="{
                      color: item.name == rateTrueName ? '#ffffff' : '#777980'
                    }"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <!-- <input type="range" vertical ref="ran" :value="ranVal" /> -->
              <!-- <p>
                1.0
                <select id="rate">
                  <option value="0.5">0.5</option>
                  <option value="1" selected>1.0</option>
                  <option value="1.25">1.25</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2.0</option>
                </select>
              </p> -->
              <el-slider
                class="audio_slider"
                ref="audioSlider"
                :show-tooltip="false"
                v-show="audioShowFlag"
                v-model="audioVal"
                @input="setVolume"
                show-input
                input-size="0.2rem"
                :show-input-controls="false"
                vertical
                height="1.4rem"
              >
              </el-slider>
              <el-button v-show="mutedFlag" ref="enableMute" class="ev_btn">
                <img
                  class="ev_audio"
                  src="../../assets/images/word/shengyin.png"
                  alt=""
                />
              </el-button>
              <el-button v-show="!mutedFlag" ref="disableMute" class="ev_btn">
                <img
                  class="ev_audio"
                  src="../../assets/images/word/jingyin.png"
                  alt=""
                />
              </el-button>
            </div>
            <!-- 当前进度 -->

            <!-- 下载进度 秒 -->
            <!-- <div ref="buffered"></div> -->
            <!-- 总时长 -->
            <!-- <el-button ref="fullScreen">全屏</el-button> -->
            <!-- 全屏按钮 -->

            <!-- 进度条 -->
            <div
              ref="progress"
              style="cursor: pointer; overflow:hidden;position: absolute;top: -0.06rem;width: 100%;height:0.06rem;background:rgb(119, 121, 128);"
            >
              <!-- 播放进度 -->
              <div
                ref="bar"
                style="border-radius:0.03rem;width:0; height:0.06rem;background:#fff;"
              ></div>
              <!-- 缓存进度 -->
              <!-- <div ref="buffer" style="height:40px;background:yellow;"></div> -->
            </div>
          </div>
        </div>
      </div>
      <div
        :class="{
          eww_shouqi: true,
          'slide-fade-enter-active': sqShow,
          'slide-fade-enter1': sqShow,
          'slide-fade-leave-active': !sqShow,
          'slide-fade-leave-to1': !sqShow
        }"
        @click="sqShow = !sqShow"
      >
        <img src="../../assets/images/word/shouqi.png" alt="" />
      </div>
      <transition name="slide-fade">
        <wordFile
          v-show="sqShow"
          class="eww_report"
          :wList="details"
        ></wordFile>
      </transition>
    </div>
  </div>
</template>

<script>
// import EasyPlayer from "@easydarwin/easyplayer";
// import LivePlayer from '@liveqing/liveplayer'
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// import { videoPlayer } from "vue-video-player";
// import "videojs-flash";
import wordFile from "../Details/WordFile.vue";
import Url from "@/assets/js/url.js";
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        techOrder: ["flash"],
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "rtmp/mp4", // 类型
            src: "rtmp://172.18.40.12/aimw/test.mp4" // url地址
            // "http://172.18.40.12/myapp/test.mp4"
            // https://vd2.bdstatic.com/mda-mhdcbdrd7qcv3whn/hd/cae_h264_nowatermark/1628930860648208521/mda-mhdcbdrd7qcv3whn.mp4?auth_key=1641549200-0-0-28699a11c9aff9eadedb4c845ec29a1f&bcevod_channel=searchbox_feed&pd=1&pt=3&logid=1400318813&vid=10480304520797782800&abtest=all
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      sandVideoPath: "",
      usbVideoPath: "",
      details: {},
      reportId: "",
      isEditFlag: false,
      wordList: [1, 2, 3],
      // bufferTimer: null,
      timer: null,
      video: null,
      enableMute: null,
      disableMute: null,
      audioSlider: null,
      rateBtns: null,
      rateUlList: null,
      // ran: null,
      // ranVal: 0,
      current: null,
      // buffered: null,
      duration: null,
      // fullScreen: null,
      progress: null,
      bar: null,
      // buffer: null,
      audioVal: 50,
      mutedFlag: true,
      audioShowFlag: false,
      rateVal: "倍速",
      rateTrueVal: 1.0,
      rateTrueName: "",
      rateShow: false,
      rateList: [
        {
          num: 3.0,
          name: "3.0X"
        },
        {
          num: 2.0,
          name: "2.0X"
        },
        {
          num: 1.5,
          name: "1.5X"
        },
        {
          num: 1.25,
          name: "1.25X"
        },
        {
          num: 1.0,
          name: "1.0X"
        },
        {
          num: 0.75,
          name: "0.75X"
        },
        {
          num: 0.5,
          name: "0.5X"
        }
      ],
      sqShow: true,
      isPlayFlag: false
    };
  },
  components: {
    wordFile
    // videoPlayer,
    // EasyPlayer,
    // LivePlayer
  },
  mounted() {
    this.reportId = this.$route.params.userID;
    this.getInfo();
    this.queryVideo();
  },
  methods: {
    queryVideo() {},
    getInfo() {
      let that = this;
      var param = {
        reportId: this.reportId
      };
      this.$http
        .get(Url + "/aimw/report/consultationInfo", {
          params: param
        })
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data.data) {
              console.log(data.data.consultationInfo);
              let consultationInfo = JSON.parse(data.data.consultationInfo)
              // let consultationInfo = {
              //   sand_record: {
              //     records_num: 3,
              //     records: [
              //       {
              //         time: "09:56:37",
              //         step: "摆放建筑物类沙具",
              //         action: "摆放1个凉亭、移动2次凉亭、旋转1次凉亭",
              //         note: ""
              //       },
              //       {
              //         time: "09:56:58",
              //         step: "开始地形操作",
              //         action: "挖了一条河流，堆了一个山脉",
              //         note: ""
              //       },
              //       {
              //         time: "09:59:05",
              //         step: "摆放建筑物类沙具",
              //         action: "摆放1个拱桥、移动5次拱桥、旋转3次拱桥",
              //         note: ""
              //       }
              //     ]
              //   },
              //   name: "test1",
              //   start_time: "2021-04-22 20:19:02",
              //   finish_time: "2021-04-22 21:03:25",
              //   discuss_process: "",
              //   visitor_feeling: "",
              //   sand_picture:
              //     "ftp://172.18.40.12/AIMW/gameResources/20211209143346_15608456496/BireView.png",
              //   during: 1250,
              //   type_stat: {
              //     动物类: 10,
              //     建筑物类: 6,
              //     交通工具类: 0,
              //     军事类: 0,
              //     人物类: 5,
              //     室内用品类: 0,
              //     植物类: 8,
              //     自然与社会类: 0
              //   },
              //   world_name: "大自然",
              //   theme: "治愈主题-能量；创伤主题-分裂",
              //   assessment: "",
              //   next_time: "",
              //   next_aim: ""
              // };
              // let typeStart = []
              // for (let i in consultationInfo.type_stat) {
              //   // if (consultationInfo.type_stat[i] != '' && consultationInfo.type_stat[i] != 0) {
              //   typeStart.push(i + '<i>' + consultationInfo.type_stat[i] + '</i>个')
              //   // }
              // }
              // consultationInfo.typeStat = typeStart.join('，')
              // consultationInfo.duringStr = this.getTime1(consultationInfo.during)
              // consultationInfo.sandList = consultationInfo.sand_record.records
              // data.data.consultationInfo = JSON.stringify(consultationInfo)
              // // data.data = {
              // //   usbVideoPath: 'test.mp4',
              // //   consultationInfo: JSON.stringify(consultationInfo),
              // //   sandVideoPath: 'test.mp4'
              // // }
              // console.log(data.data)
              // this.videoPath =
              //   "https://vd2.bdstatic.com/mda-mhdcbdrd7qcv3whn/hd/cae_h264_nowatermark/1628930860648208521/mda-mhdcbdrd7qcv3whn.mp4?auth_key=1641549200-0-0-28699a11c9aff9eadedb4c845ec29a1f&bcevod_channel=searchbox_feed&pd=1&pt=3&logid=1400318813&vid=10480304520797782800&abtest=all";
              // this.videoPath = "rtmp://172.18.40.12/aimw/test.mp4";
              // this.videoPath = "http://172.18.40.12/myapp/test.mp4";
              // this.sandVideoPath = "/video/" + data.data.sandVideoPath;
              // this.usbVideoPath = "/video/" + data.data.usbVideoPath;
              console.log(data.data.sandVideoPath)
              console.log(data.data.sandVideoPath)
              this.sandVideoPath = data.data.sandVideoPath.replace(/\\/g, "/");
              this.usbVideoPath = data.data.usbVideoPath.replace(/\\/g, "/");
              console.log(data.data)
              console.log(this.sandVideoPath)
              console.log(this.usbVideoPath)
              // this.details = JSON.parse(data.data.consultationInfo)
              setTimeout(() => {
                this.init();
              }, 1000);
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    addEvent(obj, type, callback, useCapture = false) {
      obj.addEventListener(type, callback, useCapture);
      this.addEventList(obj, type, callback, useCapture);
    },
    removeEvent(obj, type, callback, useCapture = false) {
      obj.removeEventListener(type, callback, useCapture);
      this.removeEventList(obj, type, callback, useCapture);
    },
    addEventList(obj, type, callback, useCapture = false) {
      if (obj.eventList) {
        if (obj.eventList[type]) {
          obj.eventList[type].push({
            callback: callback,
            useCapture: useCapture
          });
        } else {
          obj.eventList[type] = [
            { callback: callback, useCapture: useCapture }
          ];
        }
      } else {
        obj.eventList = {};
        obj.eventList[type] = [{ callback: callback, useCapture: useCapture }];
      }
    },
    removeEventList(obj, type, callback, useCapture = false) {
      let eventList = obj.eventList;
      if (eventList) {
        if (eventList[type]) {
          for (let i = 0; i < eventList[type].length; i++) {
            if (eventList[type][i].callback === callback) {
              eventList[type].splice(i, 1);
              if (eventList[type].length === 0) {
                delete eventList[type];
              }
              break;
            }
          }
        }
      }
    },
    hasEvent(obj, type, callback, useCapture = false) {
      let flag = false;
      if (obj && obj.eventList) {
        let eventList = obj.eventList;
        if (eventList[type]) {
          for (let i = 0; i < eventList[type].length; i++) {
            if (eventList[type][i].callback === callback) {
              flag = true;
            }
          }
        }
      }
      return flag;
    },
    hasClass(elem, classm) {
      return elem.className.indexOf(classm) > -1;
    },
    init() {
      this.videos = this.$refs.videos; // 获取video对象
      console.log(this.videos)
      this.videop = this.$refs.videop; // 获取video对象
      this.isPlay = this.$refs.isPlay.$el; // 获取播放/暂停按钮对象，element-ui库需要'.$el'获取
      this.enableMute = this.$refs.enableMute.$el; // 获取关闭声音按钮对象
      this.disableMute = this.$refs.disableMute.$el; // 获取开启声音按钮对象
      this.audioSlider = this.$refs.audioSlider.$el;
      this.rateBtns = this.$refs.rateBtns;
      this.rateUlList = this.$refs.rateUlLists;
      // this.ran = this.$refs.ran; // 获取滑块对象，方便调整音量大小
      // this.ranVal = this.videos.volume * 100;
      // this.ran.style.backgroundSize = this.ranVal + "% 100%";
      this.current = this.$refs.current; // 获取显示当前播放时间进度的对象
      // this.buffered = this.$refs.buffered; // 获取显示下载进度的对象，下载使用，暂时无用
      this.duration = this.$refs.duration; //
      console.log(this.duration);
      // this.fullScreen = this.$refs.fullScreen.$el;
      this.progress = this.$refs.progress;
      this.bar = this.$refs.bar;
      // this.buffer = this.$refs.buffer;
      this.addEvent(this.isPlay, "click", this.playPause);
      this.addEvent(this.videos, "timeupdate", this.timeupdate);
      this.addEvent(this.videop, "timeupdate", this.timeupdate);
      this.addEvent(this.progress, "click", this.changeProgress);
      // this.addEvent(this.fullScreen, "click", this.launchFullScreen);
      this.addEvent(this.enableMute, "click", this.closeVolume);
      this.addEvent(this.disableMute, "click", this.openVolume);
      this.addEvent(this.enableMute, "mouseenter", this.audioShow);
      this.addEvent(this.disableMute, "mouseenter", this.audioShow);
      this.addEvent(this.enableMute, "mouseleave", this.audioHide);
      this.addEvent(this.disableMute, "mouseleave", this.audioHide);
      this.addEvent(this.audioSlider, "mouseenter", this.audioShow);
      this.addEvent(this.audioSlider, "mouseleave", this.audioHide);

      this.addEvent(this.rateBtns, "mouseenter", this.rateShows);
      this.addEvent(this.rateBtns, "mouseleave", this.rateHides);
      this.addEvent(this.rateUlList, "mouseenter", this.rateShows);
      this.addEvent(this.rateUlList, "mouseleave", this.rateHides);
      console.log()
      var i = setInterval(() => {
        if (this.videos.readyState > 0) {
          this.current.innerHTML = this.getTime(this.videos.currentTime);
          this.duration.innerHTML = this.getTime(this.videos.duration);
          clearInterval(i);
        }
      }, 200);
    },
    // 补零
    zeroFill(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 处理秒数为时分秒 h:m:s
    getTime(num) {
      console.log(Math.floor(num / 60));
      let m = this.zeroFill(Math.floor(num / 60));
      let s = this.zeroFill(Math.floor(num % 60));
      let h = this.zeroFill(Math.floor(Math.floor(num / 60) / 60));
      // let time = "" + h + ":" + m + ":" + s + "";
      let time = "" + m + ":" + s + "";
      return time;
    },
    // 处理秒数为时分秒 h:m:s
    getTime1(num) {
      console.log(Math.floor(num / 60));
      let m = this.zeroFill(Math.floor(num / 60));
      let s = this.zeroFill(Math.floor(num % 60));
      let h = this.zeroFill(Math.floor(Math.floor(num / 60) / 60));
      // let time = "" + h + ":" + m + ":" + s + "";
      let time = "" + m + "分" + s + "秒";
      return time;
    },
    // // 全屏方法
    // launchFullScreen() {
    //   if (this.videos.requestFullscreen) {
    //     this.videos.requestFullscreen();
    //   } else if (this.videos.mozRequestFullScreen) {
    //     this.videos.mozRequestFullScreen();
    //   } else if (this.videos.webkitRequestFullscreen) {
    //     this.videos.webkitRequestFullscreen();
    //   } else if (this.videos.msRequestFullscreen) {
    //     this.videos.msRequestFullscreen();
    //   }
    // },
    // 播放和暂停
    playPause() {
      let classStr = this.isPlay.className;
      console.log(this.videos.duration);
      console.log(this.isPlay.className);
      if (this.hasClass(this.isPlay, "stop")) {
        this.videos.play();
        this.videop.play();
        this.isPlayFlag = true;
        // this.bufferTimer = setInterval(() => {
        //   this.buffer.style.width =
        //     (this.videos.buffered.end(0) / this.videos.duration) * 100 + "%";
        // }, 1000 / 30);
        // if (this.videos.buffered.end(0) == this.videos.duration) {
        //   this.buffer.style.width = "100%";
        //   clearInterval(this.bufferTimer);
        // }
        this.timer = setInterval(() => {
          this.bar.style.width =
            (this.videos.currentTime / this.videos.duration) * 100 + "%";
        }, 1000 / 30);
        this.isPlay.className = classStr.replace("stop", "play");
      } else if (this.hasClass(this.isPlay, "play")) {
        this.videos.pause();
        this.videop.pause();
        clearInterval(this.timer);
        this.isPlay.className = classStr.replace("play", "stop");
        this.isPlayFlag = false;
      }
    },
    // 视频播放进度改变触发
    timeupdate() {
      this.current.innerHTML = this.getTime(this.videos.currentTime);
      this.duration.innerHTML = this.getTime(this.videos.duration);
      // this.buffered.innerHTML = this.videos.buffered.end(0);
      if (this.videos.currentTime == this.videos.duration) {
        this.isPlay.className = this.isPlay.className.replace("play", "stop");
        this.videos.currentTime = 0;
        this.videop.currentTime = 0;
        this.current.innerHTML = this.getTime(this.videos.currentTime);
        this.isPlayFlag = false;
      }
      // this.current.innerHTML = this.getTime(this.videop.currentTime);
      // this.duration.innerHTML = this.getTime(this.videop.duration);
      // if (this.videop.currentTime == this.videop.duration) {
      //   this.isPlay.className = this.isPlay.className.replace("play", "stop");
      // }
    },
    // 点击进度条改变播放进度
    changeProgress(e) {
      console.log(e);
      console.log(e.layerX);
      console.log(this.progress);
      console.log(this.progress.offsetLeft);
      console.log(this.videos.duration);
      let barLength = e.layerX - this.progress.offsetLeft;
      this.videos.currentTime =
        (barLength / this.progress.clientWidth) * this.videos.duration;
      this.videop.currentTime =
        (barLength / this.progress.clientWidth) * this.videop.duration;
      this.bar.style.width =
        (barLength / this.progress.clientWidth) * 100 + "%";
    },
    audioShow() {
      this.audioShowFlag = true;
    },
    audioHide() {
      this.audioShowFlag = false;
    },
    // 关闭声音
    closeVolume() {
      this.videos.muted = true;
      this.videop.muted = true;
      this.mutedFlag = false;
    },
    // 开启声音
    openVolume() {
      this.videos.muted = false;
      this.videop.muted = false;
      this.mutedFlag = true;
    },
    // 设置音量
    setVolume() {
      console.log(this.videos);
      if (this.videos) {
        this.videos.volume = this.audioVal / 100;
        this.videos.muted = false;
        this.videop.volume = this.audioVal / 100;
        this.videop.muted = false;
        this.mutedFlag = true;
      }
    },
    rateChange(e) {
      console.log(e);
      this.rateTrueVal = e.num;
      this.rateTrueName = e.name;
      this.rateShow = false;
      this.videos.playbackRate = e.num;
      this.videop.playbackRate = e.num;
    },
    rateShows() {
      this.rateShow = true;
    },
    rateHides() {
      this.rateShow = false;
    },
    // 播放回调
    onPlayerPlay(player) {
      console.log("player play!", player);
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log("player pause!", player);
    },

    // 视频播完回调
    onPlayerEnded(player) {
      console.log(player);
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
      console.log(player);
    },

    // 已开始播放回调
    onPlayerPlaying(player) {
      console.log(player);
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata(player) {
      console.log(player);
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      console.log(player);
    },

    // 媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
    },

    // 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
    },

    // 播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },

    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log("example player 1 readied", player);
    }
    // rangeSlider(rangeElem, { min, max, step, callback }) {
    //   min = !isNaN(parseFloat(min)) ? Number(min) : null;
    //   max = !isNaN(parseFloat(max)) ? Number(max) : null;
    //   step = !isNaN(parseFloat(step)) ? Number(step) : 1;
    //   callback = callback || null;

    //   rangeElem.setAttribute("min", min);
    //   rangeElem.setAttribute("max", max);
    //   rangeElem.setAttribute("step", step);

    //   rangeElem.addEventListener("input", function(e) {
    //     var that = e.target;
    //     that.style.backgroundSize = this.value + "% 100%";
    //     if (typeof callback == "function") {
    //       callback(that);
    //     }
    //   });
    // }
  }
};
</script>
<style lang="less">
.exp_word_wrap {
  .easy_player {
    width: 6rem;
    height: 4rem;
  }
  .eww_main {
    display: flex;
    position: relative;
    align-items: flex-start;
    .eww_back {
      position: absolute;
      top: 0.15rem;
      left: 0;
      // width: 1.36rem;
      padding: 0 0.16rem;
      height: 0.36rem;
      background: linear-gradient(0deg, #e3eaed, #eff3f5, #ffffff, #ffffff);
      border-radius: 0 0.03rem 0.03rem 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img {
        width: 0.16rem;
        // margin-left: 0.16rem;
        margin-right: 0.08rem;
      }
      span {
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #007aff;
        line-height: 1;
      }
    }
    .eww_video {
      position: relative;
      flex: 1;
      padding: 0.7rem 0.22rem 0.26rem;
      text-align: left;
      background: rgba(0, 0, 0, 0.6);
      margin-bottom: 0.6rem;
      .eww_v_box {
        background: rgba(0, 0, 0, 1);
        .v_per_box {
          display: flex;
          justify-content: flex-end;
          padding: 0.3rem 0.24rem 0.24rem 0;
          .video_per {
            width: 1.6rem;
            height: 1.6rem;
            background: #000000;
          }
        }
        .video_sha {
          width: 100%;
          margin-bottom: 1.6rem;
        }
        .eww_btns {
          display: flex;
          width: 100%;
          height: 0.5rem;
          background: #333333;
          justify-content: space-between;
          position: relative;
          // .eww_btn_bg{
          //   // position: absolute;
          //   // z-index: 1;
          //   width: 100%;
          //   height: 100%;
          //   // background-color: rgba(0, 0, 0, .5);
          // }
          .ev_pst_box {
            width: 50%;
            display: flex;
            .ev_btn {
              padding: 0;
              background: transparent;
              color: #fff;
              border: 0 !important;
              height: 100%;
              margin-left: 0;
              span {
                display: flex;
                align-items: center;
              }
              img {
                width: 0.15rem;
                height: 0.18rem;
                margin-left: 0.18rem;
                margin-right: 0.12rem;
              }
            }
            .ev_time {
              display: flex;
              align-items: center;
              font-size: 0.18rem;
              font-family: PingFang SC;
              font-weight: 400;
              color: #777980;
              margin-right: 0.8rem;
            }
          }
          .ev_ra_box {
            position: relative;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 0.2rem;
            .ev_rate {
              color: #777980;
              padding: 0 0.16rem;
              position: relative;
              text-align: center;
              width: 0.8rem;
              cursor: pointer;
              height: 100%;
              div {
                background: transparent;
                font-size: 0.16rem;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
              }
              div::selection {
                background: transparent;
                color: #777980;
              }
              ul {
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 0.5rem;
                background: #333333;
                border-radius: 0.04rem 0.04rem 0 0;
                padding: 0.1rem;
                z-index: 10;
                li {
                  font-size: 0.14rem;
                  color: #777980;
                  padding: 0.05rem 0;
                  line-height: 1;
                  cursor: pointer;
                }
                li::selection {
                  background: transparent;
                  color: #777980;
                }
                li:hover {
                  color: #ffffff !important;
                }
              }
            }
            .ev_btn {
              padding: 0;
              background: transparent;
              color: #fff;
              border: 0 !important;
              height: 100%;
              margin-left: 0;
              span {
                display: flex;
                align-items: center;
              }
              img {
                width: 0.22rem;
                height: auto;
                margin-left: 0.18rem;
                margin-right: 0.12rem;
              }
            }
            .audio_slider {
              position: absolute;
              right: 0.06rem;
              bottom: 0.5rem;
              padding: 0.28rem 0 0.1rem;
              border-radius: 0.04rem 0.04rem 0 0;
              background: #333333;
              z-index: 10;
              .el-input-number.is-without-controls {
                top: 0.04rem;
                bottom: auto;
                width: 100%;
                line-height: 1;
                margin-top: 0;
                .el-input {
                  font-size: 0.14rem;
                }
                .el-input__inner {
                  padding: 0;
                  height: 0.2rem;
                  background: transparent;
                  border: 0;
                  color: #ffffff;
                }
              }
              .el-slider__runway {
                width: 0.06rem;
                margin: 0 0.16rem;
                background-color: #555555;
                .el-slider__bar {
                  width: 0.06rem;
                  height: auto;
                  background-color: #ff79a2;
                }
                .el-slider__button-wrapper {
                  height: 0.36rem;
                  width: 0.36rem;
                  z-index: 1001;
                  left: -0.15rem;
                }
                .el-slider__button {
                  width: 0.16rem;
                  height: 0.16rem;
                  border: 0.02rem solid #ff79a2;
                }
              }
            }
          }
          .eww_play {
            z-index: 2;
            display: flex;
            align-items: center;
            i {
              font-size: 0.34rem;
              color: #dddddd;
            }
          }
          // button{
          //   z-index: 2;
          // }
          // input{
          //   z-index: 2;
          // }
          // input[type="range"] {
          //   -webkit-appearance: none;
          //   width: 200px;
          //   height: 5px;
          //   border-radius: 5px;
          //   background: -webkit-linear-gradient(#fa03e4, #a5f601) no-repeat;
          //   background-size: 0% 100%;
          // }
          // input[type="range"]::-webkit-slider-thumb {
          //   -webkit-appearance: none;
          //   height: 15px;
          //   width: 5px;
          //   margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
          //   background: #f5f5f5;
          //   border-radius: 2px; /*外观设置为圆形*/
          //   border: solid 1px #a5a5a5; /*设置边框*/
          //   box-shadow: 0 0px 1px #666666; /*添加底部阴影*/
          // }
          // input[type="range"]::-webkit-slider-runnable-track {
          //   height: 5px;
          //   border-radius: 2px; /*将轨道设为圆角的*/
          //   box-shadow: 0 0px 1px #0f00ff, inset 0 0px 2px #00ffff; /* 轨道内置阴影效果 */
          // }
          // input[type="range"]:focus {
          //   outline: none;
          // }
        }
      }
    }
    .eww_shouqi {
      position: absolute;
      right: 9rem;
      top: 0.15rem;
      width: 0.36rem;
      height: 0.36rem;
      border-radius: 0.03rem 0 0 0.03rem;
      background: linear-gradient(0deg, #ffffff, #ffffff, #eff3f5, #e3eaed);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 6;
      img {
        width: 0.2rem;
      }
    }
    .slide-fade-enter-active {
      transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
      transform: translateX(9rem);
      opacity: 0;
    }
    .slide-fade-enter1
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
      transform: translateX(0rem);
      opacity: 1;
    }
    .slide-fade-leave-to1
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
      transform: translateX(9rem);
      opacity: 1;
    }
    .eww_report {
      width: 9rem;
      box-shadow: 0 0 0.3rem 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
