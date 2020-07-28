<template>
  <div class="count-down">
    <span v-if="isUnit.day" class="tu day">
      <i class="t" v-for="(t, k) in parseTime.day.toString()" :key="k">
        {{ t }}
      </i>
      <i class="u" v-if="unitLabel.day">{{ unitLabel.day }}</i>
    </span>
    <span v-if="isUnit.hour" class="tu hour">
      <i class="t" v-for="(t, k) in parseTime.hour.toString()" :key="k">
        {{ t }}
      </i>
      <i class="u" v-if="unitLabel.hour">{{ unitLabel.hour }}</i>
    </span>
    <span v-if="isUnit.minute" class="tu minute">
      <i class="t" v-for="(t, k) in parseTime.minute.toString()" :key="k">
        {{ t }}
      </i>
      <i class="u" v-if="unitLabel.minute">{{ unitLabel.minute }}</i>
    </span>
    <span v-if="isUnit.second" class="tu second">
      <i class="t" v-for="(t, k) in parseTime.second.toString()" :key="k">
        {{ t }}
      </i>
      <i class="u" v-if="unitLabel.second">{{ unitLabel.second }}</i>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.count-down i.t,
.count-down i.u{
  font-style normal
  display inline-block
  width 14px
  text-align center
}
</style>

<script>
export default {
  name: "CountDown",
  props: {
    // 当前时间: 可传入服务器时间 10位或13位时间戳 默认是本地当前时间
    now: {
      type: [Boolean, Number, String],
      default: false
    },
    // 结束时间: 可传入10位或13位时间戳，或者秒数
    end: {
      type: [Number, String],
      default: 0
    },
    // 要显示的单位数组或带分隔的对象
    // {day:"天", minute:":", second:"", hour:"/"}
    // 顺序无所谓，会自动排序对应
    unit: {
      type: [Boolean, Array, Object],
      default: () => ["day", "hour", "minute", "second"]
    },
    // 固定位数，不足在前面补充0，超出不作任何操作
    fixed: {
      type: [Boolean, Number],
      default: 2
    }
  },
  data() {
    return {
      parseTime: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      timer_index: 0,
      unitArr: ["day", "hour", "minute", "second"],
      unitLabel: {
        day: "",
        hour: "",
        minute: "",
        second: ""
      },
      diff: 0
    };
  },
  computed: {
    isUnit() {
      return {
        day: this.unitArr.indexOf("day") !== -1,
        hour: this.unitArr.indexOf("hour") !== -1,
        minute: this.unitArr.indexOf("minute") !== -1,
        second: this.unitArr.indexOf("second") !== -1
      };
    }
  },
  methods: {
    init() {
      clearInterval(this.timer_index);
      let nowTime = (this.now && this.getIntTime(this.now)) || Date.now();
      let endTime = this.getIntTime(this.end);
      if (endTime < nowTime) {
        endTime = this.end * 1000 + parseInt(nowTime);
      }
      this.diff = Math.round((endTime - nowTime) / 1000);
      this.parseDiffTime(this.diff);
      this.setUnit(this.unit);
      if (this.diff > 1) {
        this.timer_index = setInterval(() => {
          this.diff--;
          let emitData = Object.assign({}, this.parseTime, {
            time: endTime / 1000 - this.diff,
            diff: this.diff
          });
          this.$emit("progress", emitData);
          if (this.diff < 1) {
            this.$emit("over", emitData);
            clearInterval(this.timer_index);
          }
        }, 1000);
      }
    },
    setUnit(val) {
      let arr = [];
      if (Object.prototype.toString.call(val) === "[object Object]") {
        for (let key in val) {
          if (val.hasOwnProperty(key)) {
            arr.push(key);
            this.unitLabel[key] = val[key];
          }
        }
      } else {
        arr = val;
      }
      arr.sort;
      this.unitArr = arr;
    },
    getIntTime(time, len = 13) {
      time = parseInt(time).toString();
      if (time.length < len) {
        time += new Array(4).join("0");
      }
      return parseInt(time);
    },
    formatZero(num) {
      if (String(num).length < this.fixed) {
        num = (Array(this.fixed).join(0) + num).slice(-this.fixed);
      }
      return num;
    },
    parseDiffTime(diff) {
      diff = parseInt(diff);
      let day = Math.floor(diff / 60 / 60 / 24);
      let hour = Math.floor(diff / 60 / 60);
      let minute = Math.floor(diff / 60);
      let second = diff;

      // 如果显示天
      if (this.unitArr.indexOf("day") !== -1) {
        hour = Math.floor((diff % (60 * 60 * 24)) / 60 / 60);
        minute = Math.floor((diff % (60 * 60 * 24)) / 60);
        second = Math.floor(diff % (60 * 60 * 24));
      }
      // 如果显示小时
      if (this.unitArr.indexOf("hour") !== -1) {
        minute = Math.floor((diff % (60 * 60)) / 60);
        second = Math.floor(diff % (60 * 60));
      }
      // 如果显示分钟
      if (this.unitArr.indexOf("minute") !== -1) {
        second = Math.floor(diff % 60);
      }
      this.parseTime = {
        day: this.formatZero(day),
        hour: this.formatZero(hour),
        minute: this.formatZero(minute),
        second: this.formatZero(second)
      };
    }
  },
  watch: {
    diff(val) {
      this.parseDiffTime(val);
    },
    end(val) {
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>
