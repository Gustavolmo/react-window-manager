import { ArrowDownToLine } from 'lucide-react'
import { startRwmWin } from '../../../../rwm/init-rwm'

export default function StartButton() {
  return (
    <startRwmWin.Button className={`px-2 w-16 py-0 rounded-sm h-full`}>
      <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
        <ArrowDownToLine className="h-4 w-4" />
        Start
      </p>
    </startRwmWin.Button>
  )
}
