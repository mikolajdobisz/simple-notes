import React, { useEffect, useRef, useState } from 'react'
import Circle from '../scripts/Circle'
import { getRandomColor, getRandomFloat, getRandomGray, getRandomInt } from '../scripts/RandomNumber'
import { Vector2 } from '../scripts/Vector2'
import styles from '../styles/modules/BackgroundCanvas.module.scss'
import settings from '../scripts/settings.json'

const BackgroundCanvas = () => {

  const canvasRef = useRef(null)
  const mousePosition = new Vector2(null, null)

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

  const windowOnMouseMove = e => {
    mousePosition.x = e.clientX
    mousePosition.y = e.clientY
  }

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')

    window.addEventListener("mousemove", windowOnMouseMove)

    let circles = []
    const circleColors = settings['circle-colors'];
    for(let i = 0; i < circleColors.length; i++){
      let x = getRandomFloat(0, window.innerWidth, 3)
      let y = getRandomFloat(0, window.innerHeight, 3)
      let r = getRandomInt(0, window.innerWidth / 2)
      let color = circleColors[i];
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
      window.removeEventListener("mousemove", windowOnMouseMove)
    }
  }, [])

  return <canvas className={styles.BackgroundCanvas} ref={canvasRef}/>
}

export default BackgroundCanvas
