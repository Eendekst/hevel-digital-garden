// @ts-ignore
import telemetryScript from "./scripts/telemetry.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Telemetry: QuartzComponent = () => {
  return null
}

Telemetry.afterDOMLoaded = telemetryScript

export default (() => Telemetry) satisfies QuartzComponentConstructor
