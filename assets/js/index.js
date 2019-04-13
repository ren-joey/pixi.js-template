import '../scss/style.scss'
import * as PIXI from 'pixi.js'
import {TweenMax} from 'gsap'

import img_bunny from '../images/bunny.png'
import img_gradient from '../images/gradient.jpg'

let bunny, coin

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x1099bb
})


const ticker = function () {
  // Listen for animate update
  app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    // bunny.rotation += 0.1 * delta

    // let mousePos = {
    //   x: app.renderer.plugins.interaction.mouse.global.x,
    //   y: app.renderer.plugins.interaction.mouse.global.y
    // }

    // TweenMax.to(bunny, 1, {x: (mousePos.x - bunny.x) * 0.625, y: (mousePos.y - bunny.y) * 0.625})
  })
}

const listener = function () {
  document.addEventListener('mousemove', (e) => {
    TweenMax.to(bunny, 1, {x: (e.offsetX - bunny.x) * 0.625, y: (e.offsetY - bunny.y) * 0.625})
    TweenMax.to(coin, 1, {x: e.offsetX, y: e.offsetY})
  })

  window.onresize = () => {
    let w = window.innerWidth
    let h = window.innerHeight

    app.renderer.resize(w, h)

    // 將畫面的正中間放在 app.renderer 一半寬高的位置
    // app.stage.x = app.renderer.width * 0.5
    // app.stage.y = app.renderer.height * 0.5
  }
}

const init = function () {
  PIXI.loader
    .add('assets/images/fighter.json')
    .add('assets/images/coin.json')
    .add('spritesheet', 'assets/images/mc.json')
    .load(onAssetsLoaded)

  document.body.appendChild(app.view) // app.view 是一個 HTMLCanvasElement

  console.log(app)
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

  bunny = new PIXI.Sprite.fromImage(img_bunny)
  var bunnyMask = new PIXI.Sprite.fromImage(img_bunny)
  var gradientMask = new PIXI.Sprite.fromImage(img_gradient)
  var maskGraphic = new PIXI.Graphics()
  maskGraphic.beginFill(0xFF0000)
  maskGraphic.drawRect(100, 100, 500, 500)
  maskGraphic.endFill()

  bunny.scale.set(0.3)
  gradientMask.scale.set(0.5)
  // bunnyMask.scale.set(0.5)
  // bunny.mask = bunnyMask
  bunny.mask = gradientMask
  // bunny.mask = maskGraphic // 設定用 maskGraphic 物件來當兔子的遮罩
  // bunny.mask = null // 不使用遮罩的時候設定 null
  // squareGraph.addChild(bunny)
  // app.stage.addChild(maskGraphic)
  app.stage.addChild(bunny, gradientMask) // 需要連同遮罩一同加進畫布中
  console.log(squareGraph.children)

  var squareGraph2 = squareGraph.clone()
  app.stage.addChild(squareGraph2)
  console.log(squareGraph2.graphicsData) // [t] clone 的 PIXI.Graphics 也有一個方塊
  console.log(squareGraph2.children) // [] 複製出來的方塊沒有兔子，但有方塊
  // moveTo、lineTo、bezierCurveTo；beginFill、endFill

  const textStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  })

  var text = new PIXI.Text('寶貝南很可愛', textStyle)
  text.x = 300
  text.y = 300
  app.stage.addChild(text)

  var text2 = new PIXI.Text('寶貝南很可愛', textStyle)
  text2.x = 350
  text2.y = 320
  var squareGraph3 = new PIXI.Graphics()
  squareGraph3.beginFill(0xFF0000)
  squareGraph3.drawRect(200, 200, 250, 250)
  squareGraph3.endFill()
  squareGraph3.mask = text2
  app.stage.addChild(squareGraph3, text2)

  ticker()
}

const onAssetsLoaded = function () {
  // create an array of textures from an image path
  const frames = []

  for (let i = 0; i < 30; i++) {
    const val = i < 10 ? `0${i}` : i

    // magically works since the spritesheet was loaded with the pixi loader
    frames.push(PIXI.Texture.fromFrame(`rollSequence00${val}.png`))
  }

  // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
  const anim = new PIXI.extras.AnimatedSprite(frames)

  /*
   * An AnimatedSprite inherits all the properties of a PIXI sprite
   * so you can change its position, its anchor, mask it, etc
   */
  anim.interactive = true
  anim.buttonMode = true
  anim.click = () => {
    coin.play()
    TweenMax.to(anim, 1, {rotation: '+=' + Math.PI * 2, onComplete() {
      coin.stop()
    }})
  }
  anim.x = app.screen.width / 2
  anim.y = app.screen.height / 2
  anim.anchor.set(0.5)
  anim.animationSpeed = 0.5
  anim.play()

  app.stage.addChild(anim)

  // Animate the rotation
  app.ticker.add(() => {
    anim.rotation += 0.01
  })

  const coinFrames = []
  for(let i = 1; i <= 22; i++) {
    coinFrames.push(PIXI.Texture.fromFrame(`coin${i}.png`))
  }

  coin = new PIXI.extras.AnimatedSprite(coinFrames)
  coin.x = 500
  coin.y = 200
  coin.anchor.set(1)
  coin.animationSpeed = 2
  // coin.play()

  app.stage.addChild(coin)

  const mcFrames = []
  for(let i = 1; i <= 27; i++) {
    mcFrames.push(PIXI.Texture.fromFrame(`Explosion_Sequence_A ${i}.png`))
  }

  const mc = new PIXI.extras.AnimatedSprite(mcFrames)
  mc.x = 200
  mc.y = 500
  mc.anchor.set(0.5)
  mc.animationSpeed = 1
  mc.play()

  app.stage.addChild(mc)
  app.stage.interactive = true
  app.stage.buttonMode = true
  app.stage.click = () => {
    alert(`
    將 click 事件寫在 app.stage 上面
    舞台中所有物件都可以點擊，但背景除外
    `)
  }

  listener()
  console.log(PIXI.TextureCache)
}

window.onload = init
// https://ithelp.ithome.com.tw/articles/10191496