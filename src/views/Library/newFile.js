import echarts from "../../assets/js/echarts";
import Url from "@/assets/js/url.js";
import { fuluList, reviewDada } from "./Review.vue";

export default (await import('vue')).defineComponent({
name: "report",
data() {
return {
power1: false,
sbAct: 1,
trendAct: 1,
tabActive: 1,
limit: 10,
total: 0,
pageNum: 1,
currentPage: 1,
formSearchR: {
time: "",
name: "",
number: "",
sex: "",
class: "",
status: ""
},
formSearchVs: {
star: "",
end: ""
},
sectionList: [],
tableData: [],
myChartZhe1: "",
myChartZhe2: "",
myChartZhe3: "",
myChartZhe4: "",
myChartZhe5: "",
myChartZhe6: "",
passport: "",
chartData: [],
starData: [],
endData: [],
depressionFlag: 1,
anxietyFlag: 1,
forcedFlag: 1,
suicideFlag: 0,
violenceFlag: 0,
personalityFlag: 0
};
},
created() {
},
mounted() {
this.passport = this.$route.params.userID;
this.powerData();
this.getList(1);
window.addEventListener("resize", () => {
setTimeout(() => {
this.myChartZhe1.resize();
this.myChartZhe2.resize();
this.myChartZhe3.resize();
this.myChartZhe4.resize();
this.myChartZhe5.resize();
this.myChartZhe6.resize();
}, 100);
});
},
methods: {
pagination(pageNo, pageSize, array) {
var offset = (pageNo - 1) * pageSize;
return offset + pageSize >= array.length
? array.slice(offset, array.length)
: array.slice(offset, offset + pageSize);
},
handleCurrentChange(val) {
this.currentPage = val;
this.tableData = this.pagination(val, this.limit, fuluList);
},
powerData() {
let algTypes = JSON.parse(localStorage.getItem("algTypes"));
// 是否显示抑郁
this.depressionFlag = algTypes.depression;
// 是否显示焦虑
this.anxietyFlag = algTypes.anxiety;
// 是否显示强迫
this.forcedFlag = algTypes.forced;
// 是否显示PTSD
this.suicideFlag = algTypes.suicide;
// 是否显示心理韧性
this.violenceFlag = algTypes.violence;
// 是否显示人格
this.personalityFlag = algTypes.personality;
//
// this.depressionFlag = 1
// this.anxietyFlag = 1
// this.forcedFlag = 1
// this.suicideFlag = 0
// this.violenceFlag = 1
// this.personalityFlag = 0
let power = JSON.parse(localStorage.getItem("userAuth")).menuAuthID;
this.power1 = power.includes(30103); // 心理档案--查看
},
isService(val) {
let routeData = this.$router.resolve({
name: "detailsreport",
params: { userID: val.reportId }
});
window.open(routeData.href, "_blank");
},
toDetail(data) {
localStorage.setItem("openReport", data.reportId);
this.isService(data);
},
choseStar() {
let starArr = [];
for (let i in reviewDada) {
if (reviewDada[i].reportId != this.formSearchVs.star) {
starArr.push(reviewDada[i]);
}
}
this.endData = starArr;
},
choseEnd() {
let endArr = [];
for (let i in reviewDada) {
if (reviewDada[i].reportId != this.formSearchVs.end) {
endArr.push(reviewDada[i]);
}
}
this.starData = endArr;
},
choseYear() {
let that = this;
if (that.formSearchR.time.length == 0) {
that.tableData = reviewDada;
} else {
let fuckArr = [];
for (let i in reviewDada) {
if (new Date(that.formSearchR.time[0]).getTime() < new Date(reviewDada[i].date).getTime() &&
new Date(reviewDada[i].date).getTime() < new Date(that.formSearchR.time[1]).getTime()) {
fuckArr.push(reviewDada[i]);
}
}
that.tableData = fuckArr;
}
// this.myChartZhe1s();
// this.myChartZhe2s();
// this.myChartZhe3s();
// this.myChartZhe4s();
},
getList(page) {
let that = this;

this.currentPage = page;
let param = {
currentPage: page,
pageSize: that.limit,
passport: that.passport
};
this.$http
.get(Url + "/aimw/mentalFile/mentalFileInfo", {
params: param
})
.then(res => {
let data = res.data;
if (data.code == 0) {
if (data.data) {
for (let i in data.data) {
let tipsNames = "/";
let tipsNames0 = "";
let tipsArr = [];
data.data[i].depressionScore.score = 1;
data.data[i].anxietyScore.score = 1;
data.data[i].forcedScore.score = 1;
data.data[i].suicideScore.score = 1;
if (this.depressionFlag == 1) {
if (data.data[i].depressionScore.score > 2) {
tipsArr.push("抑郁");
}
}
if (this.anxietyFlag == 1) {
if (data.data[i].anxietyScore.score > 2) {
tipsArr.push("焦虑");
}
}
if (this.forcedFlag == 1) {
if (data.data[i].forcedScore.score > 2) {
tipsArr.push("强迫");
}
}

// if (this.violenceFlag == 1) {
//   if (
//     data.data[i].violenceScore.score > 2
//   ) {
//     tipsArr.push("心理韧性");
//   }
// }
if (tipsArr.length > 0) {
tipsNames0 = tipsArr.join("、") + "水平高";
}
let tipsNames1 = '';
let tipsArr1 = [];
if (this.suicideFlag == 1) {
if (data.data[i].suicideScore.score > 2) {
tipsArr1.push("PTSD");
}
}
if (tipsArr1.length > 0) {
tipsNames1 = tipsArr1.join("、") + "有风险";
}
if (tipsNames0 == '' && tipsNames1 == '') {
tipsNames = '/';
} else {
let brs = (tipsNames0 != '' && tipsNames1 != '') ? '<br>' : '';
tipsNames = tipsNames0 + brs + tipsNames1;
}
data.data[i].dateCount = data.data[i].date.split(' ')[0] + " 第" + data.data[i].evaNum + "次";
data.data[i].evaTime = that.toHHmmss(data.data[i].evaTime * 1000);
data.data[i].tipsName = tipsNames;
}
let sArr = data.data;
for (let i in data.data) {
data.data[i].index = Number(i) + 1;
}
fuluList = JSON.parse(JSON.stringify(data.data));
console.log(fuluList);
that.total = fuluList.length;
that.tableData = this.pagination(1, this.limit, fuluList);
that.pageNum = fuluList.length == 0 ? 1 : Math.ceil(fuluList.length / that.limit);
reviewDada = data.data;
that.chartData = data.data.slice(0, 3);
that.starData = data.data;
that.endData = data.data;
this.myChartZhe1s();
this.myChartZhe2s();
this.myChartZhe3s();
this.myChartZhe4s();
this.myChartZhe5s();
this.myChartZhe6s();
} else {
that.tableData = [];
that.total = 0;
that.pageNum = 1;
}
} else {
that.$message.error(data.msg);
}
})
.catch(res => {
console.log(res);
});
},
toHHmmss(data) {
var s;
var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.round((data % (1000 * 60)) / 1000);
s =
(hours < 10 ? "0" + hours : hours) +
":" +
(minutes < 10 ? "0" + minutes : minutes) +
":" +
(seconds < 10 ? "0" + seconds : seconds);
return s;
},
timestampToTime(timestamp) {
var date = new Date(Number(611811142109107));
var Y = date.getFullYear() + "-";
var M = (date.getMonth() + 1 < 10
? "0" + (date.getMonth() + 1)
: date.getMonth() + 1) + "-";
var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
":";
var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
return Y + M + D + h + m + s;
},
sbTab(type) {
this.sbAct = type;
},
trendTab(type) {
this.trendAct = type;
this.myChartZhe1s();
this.myChartZhe2s();
this.myChartZhe3s();
this.myChartZhe4s();
this.myChartZhe5s();
this.myChartZhe6s();
},
myChartZhe1s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let zArr = [];
let bArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].depressionScore.score);
jArr.push(that.chartData[i].anxietyScore.score);
qArr.push(that.chartData[i].forcedScore.score);
zArr.push(that.chartData[i].suicideScore.score);
bArr.push(that.chartData[i].violenceScore.score);
lArr.push(that.chartData[i].forcedScore.thre);
}
let serseArr = [];
if (this.anxietyFlag == 1) {
serseArr.push({
name: "焦虑",
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#0075ff" },
{ offset: 1, color: "#00c2ff" }
])
},
data: jArr
});
}
if (this.depressionFlag == 1) {
serseArr.push({
name: "抑郁",
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FE5FB8" },
{ offset: 1, color: "#ff83df" }
])
},
data: yArr
});
}
if (this.forcedFlag == 1) {
serseArr.push({
name: "强迫",
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: qArr
});
}
if (this.suicideFlag == 1) {
serseArr.push({
name: "PTSD",
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00D8FF" },
{ offset: 1, color: "#46F7CB" }
])
},
data: zArr
});
}
if (this.violenceFlag == 1) {
serseArr.push({
name: "心理韧性",
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFE792" },
{ offset: 1, color: "#FFC90C" }
])
},
data: bArr
});
}
let markLine = {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: 3,
name: "",
lineStyle: {
type: "dashed",
color: "#FF77C3",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
};
serseArr[0].markLine = markLine;
this.myChartZhe1 = echarts.init(this.$refs.myChartZhe1);
this.myChartZhe1.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: {
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
},
minInterval: 1
},
series: serseArr
});
},
myChartZhe2s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].depressionSubScore[0].score);
jArr.push(that.chartData[i].depressionSubScore[1].score);
qArr.push(that.chartData[i].depressionSubScore[2].score);
lArr.push(that.chartData[i].depressionScore.score);
}
this.myChartZhe2 = echarts.init(this.$refs.myChartZhe2);
this.myChartZhe2.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: [
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
}
},
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: ""
}
}
],
series: [
{
name: that.chartData[0].depressionSubScore[0].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00c2ff" },
{ offset: 1, color: "#0075ff" }
])
},
data: yArr,
markLine: {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: lArr[0],
name: "",
lineStyle: {
type: "solid",
color: lArr.length == 1 ? "#ffbf0a" : "transparent",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
}
},
{
name: that.chartData[0].depressionSubScore[1].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: jArr
},
{
name: that.chartData[0].depressionSubScore[2].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#ff83df" },
{ offset: 1, color: "#FE5FB8" }
])
},
data: qArr
},
{
name: "抑郁水平",
type: "line",
yAxisIndex: 1,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFC90C" },
{ offset: 0.33, color: "#FFA87E" },
{ offset: 0.66, color: "#FFDE6B" },
{ offset: 1, color: "#FFC600" }
])
},
data: lArr
}
]
});
},
myChartZhe3s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].anxietySubScore[0].score);
jArr.push(that.chartData[i].anxietySubScore[1].score);
qArr.push(that.chartData[i].anxietySubScore[2].score);
lArr.push(that.chartData[i].anxietyScore.score);
}
this.myChartZhe3 = echarts.init(this.$refs.myChartZhe3);
this.myChartZhe3.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: [
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
}
},
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: ""
}
}
],
series: [
{
name: that.chartData[0].anxietySubScore[0].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00c2ff" },
{ offset: 1, color: "#0075ff" }
])
},
data: yArr,
markLine: {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: lArr[0],
name: "",
lineStyle: {
type: "solid",
color: lArr.length == 1 ? "#ffbf0a" : "transparent",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
}
},
{
name: that.chartData[0].anxietySubScore[1].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: jArr
},
{
name: that.chartData[0].anxietySubScore[2].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#ff83df" },
{ offset: 1, color: "#FE5FB8" }
])
},
data: qArr
},
{
name: "焦虑水平",
type: "line",
yAxisIndex: 1,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFC90C" },
{ offset: 0.33, color: "#FFA87E" },
{ offset: 0.66, color: "#FFDE6B" },
{ offset: 1, color: "#FFC600" }
])
},
data: lArr
}
]
});
},
myChartZhe4s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].forcedSubScore[0].score);
jArr.push(that.chartData[i].forcedSubScore[1].score);
qArr.push(that.chartData[i].forcedSubScore[2].score);
lArr.push(that.chartData[i].forcedScore.score);
}
this.myChartZhe4 = echarts.init(this.$refs.myChartZhe4);
this.myChartZhe4.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: [
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
}
},
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: ""
}
}
],
series: [
{
name: that.chartData[0].forcedSubScore[0].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00c2ff" },
{ offset: 1, color: "#0075ff" }
])
},
data: yArr,
markLine: {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: lArr[0],
name: "",
lineStyle: {
type: "solid",
color: lArr.length == 1 ? "#ffbf0a" : "transparent",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
}
},
{
name: that.chartData[0].forcedSubScore[1].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: jArr
},
{
name: that.chartData[0].forcedSubScore[2].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#ff83df" },
{ offset: 1, color: "#FE5FB8" }
])
},
data: qArr
},
{
name: "强迫水平",
type: "line",
yAxisIndex: 1,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFC90C" },
{ offset: 0.33, color: "#FFA87E" },
{ offset: 0.66, color: "#FFDE6B" },
{ offset: 1, color: "#FFC600" }
])
},
data: lArr
}
]
});
},
myChartZhe5s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].suicideSubScore[0].score);
jArr.push(that.chartData[i].suicideSubScore[1].score);
qArr.push(that.chartData[i].suicideSubScore[2].score);
lArr.push(that.chartData[i].suicideScore.score);
}
this.myChartZhe5 = echarts.init(this.$refs.myChartZhe5);
this.myChartZhe5.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: [
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
}
},
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: ""
}
}
],
series: [
{
name: that.chartData[0].suicideSubScore[0].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00c2ff" },
{ offset: 1, color: "#0075ff" }
])
},
data: yArr,
markLine: {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: lArr[0],
name: "",
lineStyle: {
type: "solid",
color: lArr.length == 1 ? "#ffbf0a" : "transparent",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
}
},
{
name: that.chartData[0].suicideSubScore[1].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: jArr
},
{
name: that.chartData[0].suicideSubScore[2].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#ff83df" },
{ offset: 1, color: "#FE5FB8" }
])
},
data: qArr
},
{
name: "PTSD水平",
type: "line",
yAxisIndex: 1,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFC90C" },
{ offset: 0.33, color: "#FFA87E" },
{ offset: 0.66, color: "#FFDE6B" },
{ offset: 1, color: "#FFC600" }
])
},
data: lArr
}
]
});
},
myChartZhe6s() {
let that = this;
let xArr = [];
let yArr = [];
let jArr = [];
let qArr = [];
let lArr = [];
for (let i in that.chartData) {
xArr.push(that.chartData[i].dateCount);
yArr.push(that.chartData[i].violenceSubScore[0].score);
jArr.push(that.chartData[i].violenceSubScore[1].score);
qArr.push(that.chartData[i].violenceSubScore[2].score);
lArr.push(that.chartData[i].violenceScore.score);
}
this.myChartZhe6 = echarts.init(this.$refs.myChartZhe6);
this.myChartZhe6.setOption({
tooltip: {
trigger: "axis",
axisPointer: {
type: "line",
crossStyle: {
color: "#999"
}
}
},
grid: {
left: "0",
top: "30",
right: "60",
bottom: "3%",
containLabel: true
},
xAxis: [
{
type: "category",
data: xArr,
axisPointer: {
type: "shadow"
}
}
],
yAxis: [
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: "{value}"
}
},
{
type: "value",
name: "",
min: 0,
max: 10,
interval: 2,
axisLabel: {
formatter: ""
}
}
],
series: [
{
name: that.chartData[0].violenceSubScore[0].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#00c2ff" },
{ offset: 1, color: "#0075ff" }
])
},
data: yArr,
markLine: {
symbol: "none",
lineStyle: {
normal: {
color: "#006cff"
}
},
data: [
{
yAxis: lArr[0],
name: "",
lineStyle: {
type: "solid",
color: lArr.length == 1 ? "#ffbf0a" : "transparent",
width: 1
},
label: {
position: "end",
fontSize: 12,
formatter: "",
color: "#FF77C3"
}
}
]
}
},
{
name: that.chartData[0].violenceSubScore[1].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#c4c8ff" },
{ offset: 1, color: "#7279ff" }
])
},
data: jArr
},
{
name: that.chartData[0].violenceSubScore[2].name,
type: "bar",
// barWidth: 16,
barMaxWidth: 16,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#ff83df" },
{ offset: 1, color: "#FE5FB8" }
])
},
data: qArr
},
{
name: "心理韧性水平",
type: "line",
yAxisIndex: 1,
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: "#FFC90C" },
{ offset: 0.33, color: "#FFA87E" },
{ offset: 0.66, color: "#FFDE6B" },
{ offset: 1, color: "#FFC600" }
])
},
data: lArr
}
]
});
},
tabChange(type) {
let that = this;
this.tabActive = type;
let today = new Date();
let yearb = new Date();
yearb.setMonth(yearb.getMonth() - 6);
let yeart = new Date();
yeart.setFullYear(yeart.getFullYear() - 1);
if (type == 1) {
that.chartData = reviewDada.slice(0, 3);
}
if (type == 2) {
let fuckArr = [];
for (let i in reviewDada) {
if (yearb.getTime() < new Date(reviewDada[i].date).getTime() &&
new Date(reviewDada[i].date).getTime() < today.getTime()) {
fuckArr.push(reviewDada[i]);
}
}
that.chartData = fuckArr;
}
if (type == 3) {
let fuckArr = [];
for (let i in reviewDada) {
if (yeart.getTime() < new Date(reviewDada[i].date).getTime() &&
new Date(reviewDada[i].date).getTime() < today.getTime()) {
fuckArr.push(reviewDada[i]);
}
}
that.chartData = fuckArr;
}
if (type == 4) {
that.chartData = reviewDada;
}
this.myChartZhe1s();
this.myChartZhe2s();
this.myChartZhe3s();
this.myChartZhe4s();
this.myChartZhe5s();
this.myChartZhe6s();
},
sortChange(e) {
},
onSubmit() {
let that = this;
this.tabActive = 0;
let fuckArr = [];
for (let i in reviewDada) {
if (reviewDada[i].reportId == that.formSearchVs.star ||
reviewDada[i].reportId == that.formSearchVs.end) {
fuckArr.push(reviewDada[i]);
}
}
this.chartData = fuckArr;
this.myChartZhe1s();
this.myChartZhe2s();
this.myChartZhe3s();
this.myChartZhe4s();
this.myChartZhe5s();
this.myChartZhe6s();
},
resetForm(formName) {
this.$refs[formName].resetFields();
this.starData = reviewDada;
this.endData = reviewDada;
this.tabChange(1);
},
libraryHome(e) {
this.$router.push({ name: "login" });
}
}
});
