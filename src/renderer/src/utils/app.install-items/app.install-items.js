export async function getLatestCommit(owner, repo, filePath) {
    let rawRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`)
    let response = await rawRes.json()
    return response[0].sha
}
// console.log(await getLatestCommit("Tetrax-10", "Nord-Spotify", "src/nord.js"))

export async function getLatestCommitHistory(owner, repo, files) {
    let latestCommitRawRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`).then((data) => data.json())
    let RawRes = await fetch(latestCommitRawRes[0]["url"]).then((data) => data.json())
    let updatedFiles = []
    RawRes.files.forEach((file) => {
        if (files.includes(file.filename) && file.status === "modified") {
            updatedFiles.push({ filename: file.filename, sha: file.sha })
        }
    })
    return updatedFiles.length > 0 ? updatedFiles : null
}
// console.log(await getLatestCommitHistory("Tetrax-10", "Nord-Spotify", ["src/nord.js", "Nord-Spotify/user.css", "Nord-Spotify/color.ini"]))

export async function getFolderContents(owner, repo, folderPath, rawFileLink = "") {
    const folderContents = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`).then((data) => data.json())
    const pathArray = folderContents.map((file) => {
        if (file.type == "file") {
            return rawFileLink + file.path + "|||" + file.path
        } else {
            return getFolderContents(owner, repo, file.path, rawFileLink)
        }
    })
    return Promise.all(pathArray)
}
// console.log(await getFolderContents("Tetrax-10", "Nord-Spotify", "src", "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/"))
