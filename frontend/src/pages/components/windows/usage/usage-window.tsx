import { CodeXml } from "lucide-react";
import { usageWin } from "../../../../rwm/init-rwm";

export default function UsageWindow() {
  return (
    <usageWin.Window windowName={<CodeXml className="h-4 w-4" />} defaultDock="left">
      <p>Usage</p>
    </usageWin.Window>
  )
}
