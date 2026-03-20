import { Unplug } from "lucide-react";
import { apiRefereceWin } from "../../../../rwm/init-rwm";

export default function ApiWindow() {
  return (
    <apiRefereceWin.Window windowName={<Unplug className="h-4 w-4" />} defaultDock="left">
      <p>Api</p>
    </apiRefereceWin.Window>
  )
}
