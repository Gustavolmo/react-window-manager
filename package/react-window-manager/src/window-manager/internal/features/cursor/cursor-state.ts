import { create } from 'zustand'

type CursorState = {
  x: number
  y: number
}

export const cursorPosition = {
  x: 10,
  y: 10,
}

export const setCursorPosition = ({ x, y }: CursorState) => {
  cursorPosition.x = x
  cursorPosition.y = y
}
