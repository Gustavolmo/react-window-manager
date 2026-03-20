import { Unplug } from "lucide-react";
import { apiRefereceWin } from "../../../../rwm/init-rwm";

export default function ApiButton() {
  return (
    <apiRefereceWin.Button className={`px-2 w-16 py-0 rounded-sm h-full `}>
      <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
        <Unplug className="h-4 w-4" /> Api
      </p>
    </apiRefereceWin.Button>
  )
}
