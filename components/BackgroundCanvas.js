import React, { useEffect, useRef, useState } from 'react'
import Circle from '../scripts/Circle'
import { getRandomFloat, getRandomGray, getRandomInt } from '../scripts/RandomNumber'
import { Vector2 } from '../scripts/Vector2'
import styles from '../styles/modules/BackgroundCanvas.module.scss'

const BackgroundCanvas = () => {

  const canvasRef = useRef(null)

  const draw = (ctx, circles, mousePosition) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    circles.forEach(el => {
      el.update(mousePosition)
    })
    circles.forEach(el => {
      el.draw(ctx)
    })
  }

  const autoResize = (ctx) => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
  }

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    
    let mousePosition = new Vector2(null, null)

    window.addEventListener("mousemove", e => {
      mousePosition.x =  e.offsetX,
      mousePosition.y = e.offsetY
    })

    let circles = []
    for(let i = 0; i < 4; i++){
      let x = getRandomFloat(0, window.innerWidth, 3)
      let y = getRandomFloat(0, window.innerHeight, 3)
      let r = getRandomInt(0, window.innerWidth / 2)
      let color = "#" + getRandomGray(220, 255);
      let vel = new Vector2(getRandomFloat(-1, 1, 3), getRandomFloat(-1, 1, 3))
      circles[i] = new Circle(x, y, r, color, vel)
    }    

    window.addEventListener("resize", () => {autoResize(ctx)});
    autoResize(ctx);

    let animationFrameId

    const render = () => {
      draw(ctx, circles, mousePosition)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas className={styles.BackgroundCanvas} ref={canvasRef}/>
}

export default BackgroundCanvas
