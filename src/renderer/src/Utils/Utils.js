async function getLatestCommit(owner, repo, filePath) {
    let rawRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`)
    let response = await rawRes.json()
    return response[0].sha
}
// console.log(await getLatestCommit("Tetrax-10", "Nord-Spotify", "src/nord.js"))

export { getLatestCommit }
