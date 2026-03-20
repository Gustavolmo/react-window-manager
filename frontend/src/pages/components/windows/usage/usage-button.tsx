import { CodeXml } from "lucide-react";
import { usageWin } from "../../../../rwm/init-rwm";

export default function UsageButton() {
  return (
    <usageWin.Button className={`px-2 w-16 py-0 rounded-sm h-full`}>
      <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
        <CodeXml className="h-4 w-4" /> Usage
      </p>
    </usageWin.Button>
  )
}
