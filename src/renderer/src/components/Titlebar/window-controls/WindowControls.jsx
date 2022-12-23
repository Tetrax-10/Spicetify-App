import "./WindowControls.scss"

let os = await window.ElectronAPI.getOS()

function minimize() {
    window.ElectronAPI.windowControls("minimize")
}
function maximize() {
    window.ElectronAPI.windowControls("maximize")
}
function close() {
    window.ElectronAPI.windowControls("close")
}

export default function WindowControls() {
    return (
        <>
            <div class="main-titlebar-window-controls main-titlebar-standard-controls">
                {(() => {
                    if (os != "Mac") {
                        return (
                            <>
                                <button onClick={minimize} tabindex="-1" id="minimize-button">
                                    <svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="12px" height="12px">
                                        <path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21 S39.776,16,37.059,16z" />
                                    </svg>
                                </button>
                                <button onClick={maximize} tabindex="-1" id="maximize-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        width="14px"
                                        height="14px"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    </svg>
                                </button>
                                <button onClick={close} tabindex="-1" id="close-button">
                                    <svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="14px" height="14px">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                                    </svg>
                                </button>
                            </>
                        )
                    } else {
                        // need to implement mac buttons
                        return <></>
                    }
                })()}
            </div>
        </>
    )
}
