async function getLatestCommit(owner, repo, filePath) {
    let rawRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`)
    let response = await rawRes.json()
    return response[0].sha
}
// console.log(await getLatestCommit("Tetrax-10", "Nord-Spotify", "src/nord.js"))

async function downloadGithubFile(url) {
    let rawRes = await fetch(url)
    let content = await rawRes.text()
    let fileName = url.split("/").pop()
    window.electronAPI.writeFile({ content: content, fileName: fileName })
}
// downloadGithubFile("https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/nord.js", "nord.js")

async function imageUrlToBase64(url) {
    let response = await fetch(url)
    let blob = await response.blob()
    return new Promise((onSuccess, onError) => {
        try {
            let reader = new FileReader()
            reader.onload = function () {
                onSuccess(this.result)
            }
            reader.readAsDataURL(blob)
        } catch (error) {
            onError(error)
        }
    })
}

async function downloadGithubImage(url) {
    let base64 = await imageUrlToBase64(url)
    let fileName = url.split("/").pop()
    window.electronAPI.writeImage({ binaryData: base64, fileName: fileName })
}
// downloadGithubImage("https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/home.png")

export { getLatestCommit, downloadGithubFile, downloadGithubImage }
