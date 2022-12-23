import Titlebar from "./components/Titlebar/Titlebar"
import "./Utils/Utils"
import { createSignal } from "solid-js"

let shellOutput = []
const [currentShellOutput, setCurrentShellOutput] = createSignal(shellOutput)
ElectronAPI.execShellCommands(["spicetify apply"])
ElectronAPI.receive("sendToRenderer/shell-output", (args) => {
    console.log(args)
    setCurrentShellOutput((value) => {
        return value.concat([args])
    })
})

export default function App() {
    return (
        <>
            <Titlebar></Titlebar>
            {currentShellOutput().map((output) => (
                <p className="shell-output">{output}</p>
            ))}
        </>
    )
}
