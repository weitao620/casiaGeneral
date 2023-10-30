/**
 * 绘制3d图
 * @param pieData 总数据
 * @param internalDiameterRatio:透明的空心占比
 * @param distance 视角到主体的距离
 * @param alpha 旋转角度
 * @param pieHeight 立体的高度
 * @param opacity 饼或者环的透明度
 */
// 当前视口宽度
let nowClientWidth = document.documentElement.clientWidth;
// 换算方法
let nowSize = function(val, initWidth = 1920) {
  return val * (nowClientWidth / initWidth);
};
const getPie3D = (pieData, internalDiameterRatio, distance, alpha, pieHeight, opacity = 1, pieNum) => {
  const series = []
  console.log(pieData)
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  let legendData = []
  let legendBfb = []
  const k = 1 - internalDiameterRatio
  pieData.sort((a, b) => {
    return b.value - a.value
  })
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    console.log(pieData[i])
    // return
    sumValue += pieData[i].value
    const seriesItem = {
      name:
          typeof pieData[i].name === 'undefined'
            ? `series${i}`
            : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
      // minAngle: 10
      // center: ['50%', '50%']
    }
    console.log(seriesItem)
    if (typeof pieData[i].itemStyle !== 'undefined') {
      const itemStyle = {}
      itemStyle.color =
          typeof pieData[i].itemStyle.color !== 'undefined'
            ? pieData[i].itemStyle.color
            : opacity
      itemStyle.opacity =
          typeof pieData[i].itemStyle.opacity !== 'undefined'
            ? pieData[i].itemStyle.opacity
            : opacity
      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }
  console.log(series)
  // return
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  legendData = []
  legendBfb = []
  for (let i = 0; i < series.length; i++) {
    console.log(series[i])
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    )
    startValue = endValue
    const bfb = fomatFloat(series[i].pieData.value / sumValue, 4)
    legendData.push({
      name: series[i].name,
      value: bfb
    })
    legendBfb.push({
      name: series[i].name,
      value: bfb
    })
  }
  console.log(series)
  const boxHeight = getHeight3D(series, pieHeight, pieNum) // 通过pieHeight设定3d饼/环的高度，单位是px
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  // return
  const option = {
    legend: {
      show: false,
      data: legendData,
      orient: 'vertical',
      left: 10,
      top: 0,
      itemGap: 10,
      textStyle: {
        color: '#A1E2FF'
      },
      icon: 'circle',
      formatter: function (param) {
        const item = legendBfb.filter(item => item.name === param)[0]
        const bfs = fomatFloat(item.value * 100, 2) + '%'
        return `${item.name}  ${bfs}`
      }
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    label: {
      show: true,
      position: 'outside'
      // formatter: '{b} \n{c} {d}%'
    },
    tooltip: {
      // show: false,
      backgroundColor: 'rgb(5, 16, 62)',
      borderColor: 'rgba(138, 184, 255, 1)',
      borderWidth: nowSize(1),
      textStyle: {
        color: '#fff',
        fontSize: 13
      },
      formatter: params => {
        console.log(params)
        if (
          params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d'
        ) {
          // console.log(option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio)
          // console.log(((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(2) % 1 === 0)
          let nums = null
          console.log(option.series[params.seriesIndex])
          // console.log(option.series[params.seriesIndex].pieData)
          if (params.seriesIndex < option.series.length - 1) {
            if (option.series[params.seriesIndex].pieData) {
              nums = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(2) % 1 === 0 ? 0 : 2
            } else {
              nums = 2
            }
            // let bfb = null
            // if (option.series[params.seriesIndex].pieData) {
            const bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(nums)
            // } else {
            //   bfb = 0
            // }
            console.log(nums)
            console.log(bfb)
            // console.log(bfb)
            console.log(pieNum)
            let bfbNum = 0
            console.log(option.series[params.seriesIndex])
            if (pieNum == -1) {
              console.log(option.series[params.seriesIndex].num)
              bfbNum = option.series[params.seriesIndex].pieData.num
              return (
                `<div style="margin:-10px;padding:0.1rem;"><span style="color:#fff;font-size:0.2rem;font-weight:600;line-height:0.3rem">${params.seriesName}</span>` +
                `<div style="display:flex;align-items:center;justify-content: center;"><span style="display:inline-block;margin-right:0.04rem;border-radius:0.08rem;width:0.08rem;height:0.08rem;background-color:${params.color};"></span>` +
                `<span style="color:#fff;font-size:0.16rem;margin-right:0.1rem">${bfbNum}次</span><span style="color:#fff;font-size:0.16rem;">占比${bfb}%</span></div></div>`
              )
            } else {
              bfbNum = Math.round((bfb / 100) * pieNum)
              return (
                `<div style="margin:-10px;padding:0.1rem;"><span style="color:#fff;font-size:0.2rem;font-weight:600;line-height:0.3rem">${params.seriesName}</span>` +
                `<div style="display:flex;align-items:center;justify-content: center;"><span style="display:inline-block;margin-right:0.04rem;border-radius:0.08rem;width:0.08rem;height:0.08rem;background-color:${params.color};"></span>` +
                `<span style="color:#fff;font-size:0.16rem;margin-right:0.1rem">${bfbNum}人</span><span style="color:#fff;font-size:0.16rem;">占比${bfb}%</span></div></div>`
              )
            }
          } else {
            // const bfb1 = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(nums)
            console.log(option.series)
            // let bfbNum1 = 0
            console.log(pieNum)
            if (pieNum == -1) {
              return (
                `<div style="margin:-10px;padding:0.1rem;"><span style="color:#fff;font-size:0.2rem;font-weight:600;line-height:0.3rem">${option.series[params.seriesIndex].data[params.dataIndex].name}</span>` +
                `<div style="display:flex;align-items:center;justify-content: center;"><span style="display:inline-block;margin-right:0.04rem;border-radius:0.08rem;width:0.08rem;height:0.08rem;background-color:${option.series[params.seriesIndex].data[params.dataIndex].label.normal.color};"></span>` +
                `<span style="color:#fff;font-size:0.16rem;margin-right:0.1rem">${option.series[params.seriesIndex].data[params.dataIndex].num}次</span><span style="color:#fff;font-size:0.16rem;">占比${option.series[params.seriesIndex].data[params.dataIndex].value}%</span></div></div>`
              )
            } else {
              console.log(option.series[params.seriesIndex])
              console.log(option.series[params.seriesIndex].data[params.dataIndex])
              let bfbNum1 = Math.round((option.series[params.seriesIndex].data[params.dataIndex].value / 100) * pieNum)
              console.log(bfbNum1)
              return (
                `<div style="margin:-10px;padding:0.1rem;"><span style="color:#fff;font-size:0.2rem;font-weight:600;line-height:0.3rem">${option.series[params.seriesIndex].data[params.dataIndex].name}</span>` +
                `<div style="display:flex;align-items:center;justify-content: center;"><span style="display:inline-block;margin-right:0.04rem;border-radius:0.08rem;width:0.08rem;height:0.08rem;background-color:${option.series[params.seriesIndex].data[params.dataIndex].label.normal.color};"></span>` +
                `<span style="color:#fff;font-size:0.16rem;margin-right:0.1rem">${bfbNum1}人</span><span style="color:#fff;font-size:0.16rem;">占比${option.series[params.seriesIndex].data[params.dataIndex].value}%</span></div></div>`
              )
            }
          }
        }
      }
      // triggerOn: 'click'
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    // emphasis: {
    //   itemStyle:{
    //     color:"yellow",
    //   },
    //   label:{
    //       color:"black",
    //       fontSize: 30
    //   }
    // },
    grid3D: {
      show: false,
      boxHeight: boxHeight, // 圆环的高度
      top: "10%",
      left: "0",
      bottom: "0",
      environment: "auto",
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha, // 角度
        beta: 60, // 饼图Y轴旋转
        distance, // 调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 0, // 设置为0无法旋转
        zoomSensitivity: 0, // 设置为0无法缩放
        panSensitivity: 0, // 设置为0无法平移
        autoRotate: false // 自动旋转
      }
    },
    series: series
  }
  console.log()
  return option
}
/**
 * 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
 */
const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX +
          Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY +
          Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        )
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}
/**
 * 获取3d丙图的最高扇区的高度
 */
const getHeight3D = (series, height, pieNum) => {
  console.log(series)
  // return
  console.log(height)
  // console.log(Math.round(series[0].pieData.endRatio * 100))
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value
  })
  // console.log(series)
  // console.log(series[0].pieData.value)
  // console.log((height * 20) / series[0].pieData.value)
  // console.log(pieNum == '')
  let max = ''
  if (pieNum == '') {
    // console.log(2)
    max = (height * 20) / series[0].pieData.value
  } else {
    // console.log(1)
    max = (height * 20) / (Math.round(series[0].pieData.endRatio * 100))
  }
  console.log(max)
  return max
}
/**
 * 格式化浮点数
 */
const fomatFloat = (num, n) => {
  let f = parseFloat(num)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
  let s = f.toString()
  let rs = s.indexOf('.')
  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + n) {
    s += '0'
  }
  return s
}
export { getPie3D, getParametricEquation }
