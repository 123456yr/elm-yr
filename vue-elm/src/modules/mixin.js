//写在这里面的相当于写在组件实例中，可以在template中使用，但是如果只是方法就只能在script中用
export const getImgURL = {
  methods: {
    getImgURL(imgUrl) {
      if(!imgUrl)return;
      //  https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg
      let imgBaseUrl = "https://fuss10.elemecdn.com/";
      let str =
        imgUrl.substr(0, 1) +
        "/" +
        imgUrl.substr(1, 2) +
        "/" +
        imgUrl.substr(3);
      if (imgUrl.lastIndexOf("jpeg") !== -1) {
        str = str + ".jpeg";
      } else if (imgUrl.lastIndexOf('png') !== -1) {
        str = str + ".png";
      } else if (imgUrl.lastIndexOf('gif') !== -1) {
        str = str + '.gif';
      }
      str = imgBaseUrl + str;
      return str;
    }
  }
}

export const loadMore = {
  methods: {
    loadMore() {
      if (!this.isLoadMore) return;
      this.offset = this.offset + this.num;
      //请求数据的函数名为getLists
      this.getLists();
    },
    handlerScroll() {
      let distance = 5;
      let scrTop = document.documentElement.scrollTop;
      let scrHeight = document.documentElement.scrollHeight;
      // let offHeight = document.documentElement.offsetHeight;
      let cliHeight = document.documentElement.clientHeight;
      if (scrHeight - (scrTop + cliHeight) <= distance) {
        //发送请求获取数据
        this.loadMore()
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScroll)
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.handlerScroll)
  }
}

export const delCache = {
  methods: {
    delCache() {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          var key = this.$vnode.key == null ?
            this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
            this.$vnode.key;
          var cache = this.$vnode.parent.componentInstance.cache;
          var keys = this.$vnode.parent.componentInstance.keys;
          if (cache[key]) {
            if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
                //将当前组件的缓存key值在记录中删除
                keys.splice(index, 1);
              }
            }
            //删除对应组件的缓存
            delete cache[key];
          }
        }
        this.$destroy();
      }
    }
  }
}

export const countDown={
  methods: {
    setTime() {
      clearInterval(this.timer)
      this.time = this.time / 1000;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timer);
        }
      }, 1000)
    }
  },
  computed: {
    countDown() {
      let minute = parseInt(this.time / 60);
      let seconds = parseInt(this.time % 60);
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      return '00' + ' : ' + minute + ' : ' + seconds;
    }
  }
}