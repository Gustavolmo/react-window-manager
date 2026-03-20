type props = {
  tabs: number
}

export default function Tab({ tabs }: props) {
  return '  '.repeat(tabs)
}
