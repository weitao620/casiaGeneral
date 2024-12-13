import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import "./zhouzifangti-normal"
let muluPage = []

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

class PdfLoader {
    constructor(ele, pdfFileName, splitClassName) {
        this.ele = ele
        this.pdfFileName = pdfFileName
        this.splitClassName = splitClassName || ''
        this.A4_WIDTH = 595.28
        this.A4_HEIGHT = 841.89
        this.muluPage = []
    }
 
    async getPDF(resolve) {
        
       
        const ele = this.ele
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
        context.scale(2, 2) // 增强图片清晰度
        context.translate(0, -eleOffsetTop)
        // context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
        ele.style.height = ele.scrollHeight + 'px' // 获取元素的滚动高度，用于截取被滚动条隐藏的部分
        html2canvas(ele, {
          // scale: 1.5, // 提升画面质量，但是会增加文件大小
          // useCORS: true, // 允许跨域图片 当图片是链接地址时，需加该属性，否组无法显示图片
          // imageTimeout: 0, // 图片加载延迟，默认延迟为0，单位毫秒
          // height: ele.scrollHeight, // canvas的高度设定
          // width: ele.scrollWidth, // canvas的宽度设定
          // dpi: 300 // 将分辨率提高到特定的DPI
            backgroundColor: null,
            allowTaint: false,
            dpi: window.devicePixelRatio * 4,
            width: ele.width,
            height: ele.width,
            windowWidth: ele.scrollWidth,
            scale: 1, // 按比例增加分辨率
            useCORS: true, // 允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
        }).then(async (canvas) => {
            const contentWidth = canvas.width
            const contentHeight = canvas.height
            ele.style.height = ele.clientHeight + 'px' // 获取元素的实际高度，不包括滚动条隐藏的部分
            // 一页pdf显示html页面生成的canvas高度;
            const pageHeight = (contentWidth / this.A4_WIDTH) * this.A4_HEIGHT // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
            // 未生成pdf的html页面高度
            let leftHeight = contentHeight
            // 页面偏移
            let position = 0
            // a4纸的尺寸[595,842],单位像素，html页面生成的canvas在pdf中图片的宽高
            const imgWidth = this.A4_WIDTH // -10为了页面有右边距
            const imgHeight = (this.A4_WIDTH / contentWidth) * contentHeight
            const pageData = canvas.toDataURL('image/jpeg', 1.0)
            
            const pdf = jsPDF('', 'pt', 'a4')
            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页

            // 设置字体
            pdf.setFont('zhouzifangti');
            pdf.setFontSize(10);
            if (leftHeight < pageHeight) {
                // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；

                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                console.log(String(pdf.internal.getNumberOfPages()).length)
                pdf.text(`第${pdf.internal.getNumberOfPages()}页`, imgWidth/2-10-String(pdf.internal.getNumberOfPages()).length*2.5, this.A4_HEIGHT-5);
                // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
            } else {
                // 分页
                while (leftHeight > 0) {

                  pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight)
                  leftHeight -= (pageHeight)
                  position -= (this.A4_HEIGHT)
                    console.log(leftHeight)
                    console.log(position)
                    pdf.text(`第${pdf.internal.getNumberOfPages()}页`, imgWidth/2-10-String(pdf.internal.getNumberOfPages()).length*2.5, this.A4_HEIGHT-5);
                  // 避免添加空白页
                  if (leftHeight > 0) {
                    pdf.addPage()
                  }
                }
            }

            pdf.save(pdfFileName + '.pdf', { returnPromise: true }).then(() => {
                // 去除添加的空div 防止页面混乱
                const doms = document.querySelectorAll('.emptyDiv')
                for (let i = 0; i < doms.length; i++) {
                    doms[i].remove()
                }
            })
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
            const pageHeight =
                (target.scrollWidth / this.A4_WIDTH) * this.A4_HEIGHT
            // 获取分割dom，此处为class类名为item的dom
            const domList = document.getElementsByClassName(this.splitClassName)
            
            
            // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
            let pageNum = 1 // pdf页数
            const eleBounding = this.ele.getBoundingClientRect()
            for (let i = 0; i < domList.length; i++) {
                const node = domList[i]
                const bound = node.getBoundingClientRect()
                const offset2Ele = bound.top - eleBounding.top
                const currentPage = Math.ceil(
                    (bound.bottom - eleBounding.top) / (pageHeight-10)
                ) // 当前元素应该在哪一页
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
            // setTimeout(() => {
                const muluList = document.getElementsByClassName('mulu_page')
                console.log(muluList)
                // this.ele.style.height = 'initial'
                // pdfFileName ? (this.pdfFileName = pdfFileName) : null
                // const target1 = this.ele
                // const eleBounding1 = this.ele.getBoundingClientRect()
                let muluArr = []
                for (let i in muluList){
                    // const node1 = muluList[i]
                    // const bound1 = node1.getBoundingClientRect()
                    // const offset2Ele1 = bound1.top - eleBounding1.top
                    // const currentPage1 = Math.ceil(
                    //     (bound1.bottom - eleBounding1.top) / (pageHeight-10)
                    // ) // 当前元素应该在哪一页
                    // console.log(currentPage1)
                    console.log(muluList[i].offsetTop/pageHeight)
                    if (!Number.isNaN(muluList[i].offsetTop/pageHeight)){
                        muluArr.push(Math.ceil(muluList[i].offsetTop/pageHeight))
                    }
                }
                console.log(muluArr)
                // this.emit('muluPage', muluArr);
                // this.outPutPdfFn1(muluArr)
                this.muluPage = muluArr
                
                setTimeout(() => {
                    this.getPDF(resolve, reject)
                }, 10);
                // 异步函数，导出成功后处理交互
                
            // }, 100);
           
        })
    }
}
 
export default PdfLoader