import '../scss/style.scss'
import * as PIXI from 'pixi.js'

import img_bunny from '../images/bunny.png'
import img_gradient from '../images/gradient.jpg'

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x1099bb
})
document.body.appendChild(app.view) // app.view 是一個 HTMLCanvasElement

console.log(PIXI.utils.isWebGLSupported()) // 回傳目前頁面是否支援 WebGL；
console.log(app.renderer.type) // 回傳目前 PixiJS app 的renderer 模式：
// PIXI.RENDERER_TYPE，值為 0、1、2
console.log(PIXI.RENDERER_TYPE) // {UNKNOWN: 0, WEBGL: 1, CANVAS: 2}

// 畫實心方塊的情形：
var squareGraph = new PIXI.Graphics()
squareGraph.beginFill(0xFF0000)
squareGraph.drawRect(0, 0, 100, 100)
squareGraph.endFill()
console.log(squareGraph.graphicsData)

squareGraph.beginFill(0xFF9900)
squareGraph.drawRect(0, 110, 100, 100)
squareGraph.endFill()
console.log(squareGraph.graphicsData)
app.stage.addChild(squareGraph)
// drawCircle、drawEllipse、drawPolygon、drawRect、drawRoundedRect、drawShape

var bunny = new PIXI.Sprite.fromImage(img_bunny)
var bunnyMask = new PIXI.Sprite.fromImage(img_bunny)
var gradientMask = new PIXI.Sprite.fromImage(img_gradient)
var maskGraphic = new PIXI.Graphics()
maskGraphic.beginFill(0xFF0000)
maskGraphic.drawRect(100, 100, 500, 500)
maskGraphic.endFill()

gradientMask.scale.set(0.5)
bunnyMask.scale.set(0.5)
bunny.mask = bunnyMask
// bunny.mask = gradientMask
// bunny.mask = maskGraphic // 設定用 maskGraphic 物件來當兔子的遮罩
// bunny.mask = null // 不使用遮罩的時候設定 null
// squareGraph.addChild(bunny)
// app.stage.addChild(maskGraphic)
app.stage.addChild(bunny, bunnyMask) // 需要連同遮罩一同加進畫布中
console.log(squareGraph.children)

var squareGraph2 = squareGraph.clone()
app.stage.addChild(squareGraph2)
console.log(squareGraph2.graphicsData) // [t] clone 的 PIXI.Graphics 也有一個方塊
console.log(squareGraph2.children) // [] 複製出來的方塊沒有兔子，但有方塊
// moveTo、lineTo、bezierCurveTo；beginFill、endFill

// https://ithelp.ithome.com.tw/articles/10191496