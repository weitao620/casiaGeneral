import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// import "./zhouzifangti-normal"
/*
 * 使用说明
 * ele:需要导出pdf的容器元素(dom节点 不是id)
 * pdfFileName: 导出文件的名字 通过调用outPutPdfFn方法也可传参数改变
 * splitClassName: 避免分段截断的类名 当pdf有多页时需要传入此参数 , 避免pdf分页时截断元素  如表格<tr class="itemClass"></tr>
 * 调用方式 先 let pdf = new PdfLoader(ele, 'pdf' ,'itemClass');
 * 若想改变pdf名称 pdf.outPutPdfFn(fileName);  outPutPdfFn方法返回一个promise 可以使用then方法处理pdf生成后的逻辑
 * */

/**
 * 生成pdf(处理多页pdf截断问题)
 * @param {Object} param
 * @param {HTMLElement} param.element - 需要转换的dom根节点
 * @param {number} [param.contentWidth=550] - 一页pdf的内容宽度，0-595
 * @param {number} [param.contentHeight=800] - 一页pdf的内容高度，0-842
 * @param {string} [param.outputType='save'] - 生成pdf的数据类型，添加了'file'类型，其他支持的类型见http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#output
 * @param {number} [param.scale=window.devicePixelRatio * 2] - 清晰度控制,canvas放大倍数,默认像素比*2
 * @param {string} [param.direction='p'] - 纸张方向，l横向，p竖向，默认A4纸张
 * @param {string} [param.fileName='document.pdf'] - pdf文件名，当outputType='file'时候，需要加上.pdf后缀
 * @param {number} param.baseX - pdf页内容距页面左边的高度，默认居中显示，为(A4宽度 - contentWidth) / 2)
 * @param {number} param.baseY - pdf页内容距页面上边的高度，默认 15px
 * @param {HTMLElement} param.header - 页眉dom元素
 * @param {HTMLElement} param.footer - 页脚dom元素
 * @param {HTMLElement} param.headerFirst - 第一页的页眉dom元素（如果需要指定第一页不同页眉时候再传这个,高度可以和其他页眉不一样)
 * @param {HTMLElement} param.footerFirst - 第一页页脚dom元素
 * @param {string} [param.groupName='pdf-group'] - 给dom添加组标识的名字，分组代表要进行分页判断，当前组大于一页则新起一页，否则接着上一页
 * @param {string} [param.itemName='pdf-group-item'] - 给dom添加元素标识的名字,设置了itemName代表此元素内容小于一页并且不希望被拆分，子元素也不需要遍历，即手动指定深度终点，优化性能
 * @param {string} [param.editorName='pdf-editor'] - 富文本标识类
 * @param {string} [param.tableSplitName='el-table__row'] - 表格组件内部的深度节点
 * @param {string} [param.splitName='pdf-split-page'] - 强制分页，某些情况下可能想不同元素单独起一页，可以设置这个类名
 * @param {string} [param.isPageMessage=false] - 是否显示当前生成页数状态
 * @param {string} [param.isTransformBaseY=false] - 是否将baseY按照比例缩小(一般固定A4页边距时候可以用上)
 * @param {Array} [param.potionGroup=[]] - 需要计算位置的元素属性，格式是 data-position='xxx'，需要同时在节点上加上param.itemName，如<p data-position='p-position' class='pdf-group-item'></p>
 * @returns {Promise} 根据outputType返回不同的数据类型,是一个对象
 */
// 画布添加水印
function drawWaterMark(ctx, imgWidth, imgHeight, wmConfig) {
    const fontSize = 20
    ctx.font = `${fontSize}px ${wmConfig.font}`
    ctx.lineWidth = 1
    ctx.fillStyle = 'rgba(0,0,0,0.1)' // 根据页面的背景色来设置水印颜色
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
   
    // 文字坐标
    const maxPx = Math.max(imgWidth, imgHeight)
    const stepPx = 200
    const arrayX = [0] // 初始水印位置 canvas坐标 0 0 点
    while (arrayX[arrayX.length - 1] < maxPx / 2) {
      arrayX.push(arrayX[arrayX.length - 1] + stepPx)
    }
    arrayX.push(
      ...arrayX.slice(1, arrayX.length).map((el) => {
        return -el
      })
    )
    const lineHeightFactor = 1.5 // 行间距的倍数
    for (let i = 0; i < arrayX.length; i++) {
      for (let j = 0; j < arrayX.length; j++) {
        ctx.save()
        ctx.translate(imgWidth / 2, imgHeight / 2) // 画布旋转原点 移到 图片中心
        ctx.rotate(-Math.PI / 5)
        if (wmConfig.textArray.length > 3) {
          wmConfig.textArray = wmConfig.textArray.slice(0, 3)
        }
        wmConfig.textArray.forEach((el, index) => {
          const offsetY = fontSize * index * lineHeightFactor + 15
          ctx.fillText(el, arrayX[i], arrayX[j] + offsetY)
        })
        ctx.restore()
      }
    }
  }
  // 给base64图片添加水印
  function base64AddWaterMaker(base64Img, wmConfig) {
    if (wmConfig.textArray.length === 0) {
      // console.error('****没有水印内容*****')
      return base64Img
    }
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      let resultBase64 = null
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        // canvas绘制图片，0 0  为左上角坐标原点
        ctx.drawImage(img, 0, 0)
        // 写入水印
        drawWaterMark(ctx, img.width, img.height, wmConfig)
        resultBase64 = canvas.toDataURL('image/png')
        if (!resultBase64) {
          reject()
        } else {
          resolve(resultBase64)
        }
      }
      img.src = base64Img
    })
  }
class PdfLoader {
    constructor(ele, pdfFileName, splitClassName, loading, type, newEle, viewList) {
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!"+type)
        this.loading = loading
        this.type = type
        if (type == 2) {
          this.ele = newEle
          this.viewList = viewList
          this.newEle = newEle
        } else {
          this.ele = ele
        }
        this.pdfFileName = pdfFileName
        this.splitClassName = splitClassName || ''
        this.A4_WIDTH = 595.28
        this.A4_HEIGHT = 841.89
        this.muluPage = []
        this.muluEmptyPage = 0
        
    }
 
    async getPDF(resolve) {
        
        const ele = this.ele
        // console.log(ele)
        const pdfFileName = this.pdfFileName
        const eleW = ele.offsetWidth // 获得该容器的宽
        const eleH = ele.scrollHeight // 获得该容器的高
        const eleOffsetTop = ele.offsetTop // 获得该容器到文档顶部的距离
        const eleOffsetLeft = ele.offsetLeft // 获得该容器到文档最左的距离
        window.pageYoffset = 0
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        const canvas = document.createElement('canvas')
        let abs = 0
        const win_in =
            document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
        const win_out = window.innerWidth // 获得当前窗口的宽度（包含滚动条）
        if (win_out > win_in) {
            abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
        }
        canvas.width = eleW * 2 // 将画布宽&&高放大两倍
        canvas.height = eleH * 2
        const context = canvas.getContext('2d')
        context.scale(3, 3) // 增强图片清晰度
        context.translate(0, -eleOffsetTop)
        // console.log(window.devicePixelRatio)
        ele.style.height = ele.scrollHeight + 'px' // 获取元素的滚动高度，用于截取被滚动条隐藏的部分
        html2canvas(ele, {
            backgroundColor: null,
            allowTaint: false,
            logging: true,
            // imageTimeout: 20000, // 图片加载延迟，默认延迟为0，单位毫秒
            dpi: window.devicePixelRatio * 4,
            width: ele.width,
            height: ele.width,
            windowWidth: ele.scrollWidth,
            scale: 0.8, // 按比例增加分辨率
            useCORS: true, // 允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
        }).then(async (canvas) => {
            const contentWidth = canvas.width
            const contentHeight = canvas.height
            ele.style.height = ele.clientHeight + 'px' // 获取元素的实际高度，不包括滚动条隐藏的部分
            // 一页pdf显示html页面生成的canvas高度;
            const pageHeight = (contentWidth / this.A4_WIDTH) * this.A4_HEIGHT // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
            // console.log()
            // 未生成pdf的html页面高度
            let leftHeight = contentHeight
            // 页面偏移
            let position = 0
            // a4纸的尺寸[595,842],单位像素，html页面生成的canvas在pdf中图片的宽高
            const imgWidth = this.A4_WIDTH // -10为了页面有右边距
            const imgHeight = (this.A4_WIDTH / contentWidth) * contentHeight
            const pageData = canvas.toDataURL('image/jpeg', 1.0)
            // console.log(pageData)
            const pdf = jsPDF('', 'pt', 'a4')
            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页

            // 设置字体
            // pdf.setFont('zhouzifangti');
            pdf.setFontSize(10);
            pdf.setTextColor("#333E75");
            // document.body.appendChild(canvas);
            // return false
            if (leftHeight < pageHeight) {
                // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；

                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                // console.log('String(pdf.internal.getNumberOfPages())')
                // console.log(String(pdf.internal.getNumberOfPages()))
                pdf.text(`${pdf.internal.getNumberOfPages()}`, imgWidth/2-10-String(pdf.internal.getNumberOfPages()).length*2.5, this.A4_HEIGHT-10);
                // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
            } else {
                // 分页
                while (leftHeight > 0) {

                  pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight)
                  leftHeight -= (pageHeight)
                  position -= (this.A4_HEIGHT)
                    // console.log(leftHeight)
                    // console.log(position)
                    // console.log('pdf.internal.getNumberOfPages()')
                    // console.log(pdf.internal.getNumberOfPages())
                    // console.log(this.muluEmptyPage)
                    if (pdf.internal.getNumberOfPages() < this.muluEmptyPage) {

                    } else {
                        let pageA = pdf.internal.getNumberOfPages() - this.muluEmptyPage + 1
                        pdf.text(`${pageA}`, imgWidth/2-10-String(pdf.internal.getNumberOfPages()).length*2.5, this.A4_HEIGHT-10);
                    }
                    
                  // 避免添加空白页
                  if (leftHeight > 0) {
                    pdf.addPage()
                  }
                }
            }
            // document.body.appendChild(canvas);

                pdf.save(pdfFileName + '.pdf', { returnPromise: true }).then((res) => {
                  // console.log(res)
                    // 去除添加的空div 防止页面混乱
                    // const doms = document.querySelectorAll('.emptyDiv')
                    // for (let i = 0; i < doms.length; i++) {
                    //     doms[i].remove()
                    // }
                    // this.loading.close()
                })
                // console.log(pdf.output('datauristring'))
                this.ele.style.height = ''
                
            
            resolve()
        })
    }
    //此方法是防止（图表之类）内容因为A4纸张问题被截断
    async outPutPdfFn(pdfFileName) {
        return new Promise((resolve, reject) => {

            
            this.ele.style.height = 'initial'
            pdfFileName ? (this.pdfFileName = pdfFileName) : null
            const target = this.ele
            // console.log(target)
            const pageHeight =
                (target.scrollWidth / this.A4_WIDTH) * this.A4_HEIGHT

            // 获取分割dom，此处为class类名为item的dom
            const domList = document.getElementsByClassName(this.splitClassName)
            // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
            let pageNum = 1 // pdf页数
            const eleBounding = this.ele.getBoundingClientRect()
            // console.log(eleBounding)
            for (let i = 0; i < domList.length; i++) {
                const node = domList[i]
                const bound = node.getBoundingClientRect()
                // console.log(bound)
                const offset2Ele = bound.top - eleBounding.top
                const currentPage = Math.ceil(
                    (bound.bottom - eleBounding.top) / (pageHeight-10)
                ) // 当前元素应该在哪一页
                // console.log(currentPage)
                if (pageNum < currentPage) {
                    pageNum++
                    const divParent = domList[i].parentNode // 获取该div的父节点
                    const newNode = document.createElement('div')
                    newNode.className = 'emptyDiv'
                    newNode.style.background = 'white'
                    newNode.style.height =
                        pageHeight * (pageNum - 1) - offset2Ele + 30 + 'px' // +30为了在换下一页时有顶部的边距
                    newNode.style.width = '100%'
                    newNode.style.border = '0'
                    divParent.insertBefore(newNode, node) //在每一个节点前面插入一个空的新节点，防止内容被分割截断
                    // divParent.innerHtml= pageNum
                }
            }
            const muluList = document.getElementsByClassName('mulu_page')
            const muluEmpty = document.getElementsByClassName('mulu_empty_page')
            console.log(muluList)
            console.log(muluEmpty)
            let muluArr = []
            for (let j = 0; j < muluList.length; j++){
              const node1 = muluList[j]
              const bound1 = node1.getBoundingClientRect()
              const currentPage1 = Math.ceil(
                  (bound1.top - eleBounding.top) / (pageHeight-10)
              ) // 当前元素应该在哪一页
              muluArr.push(currentPage1)
              // if (!Number.isNaN(muluList[j].offsetTop/pageHeight)){
              //     muluArr.push(Math.ceil(muluList[j].offsetTop/pageHeight))
              // }
            }
            console.log(muluArr)
            let muluEmptyArr = []
            for (let i in muluEmpty){
                // console.log(muluEmpty[i].offsetTop/pageHeight)
                if (!Number.isNaN(muluEmpty[i].offsetTop/pageHeight)){
                    muluEmptyArr.push(Math.ceil(muluEmpty[i].offsetTop/pageHeight))
                }
            }
            console.log(muluArr)
            // console.log(muluEmptyArr[0])
            
            this.muluPage = muluArr
            this.muluEmptyPage = muluEmptyArr[0]
            console.log(this.muluEmptyPage)

            setTimeout(() => {
              this.getPDF(resolve, reject)
          }, 1000);
           
        })
    }
}
 
export default PdfLoader