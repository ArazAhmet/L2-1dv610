import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"

const executeCommand = promisify(exec)
const CLONE_DIR = "./cloned-repository"
const DEFAULT_REPO = "https://github.com/ArazAhmet/Uppgift_2_Webbteknik.git"
const isWindows = process.platform === 'win32'

export async function analyzeRepository(repositoryUrl = DEFAULT_REPO) {
  try {
    console.log("Starting Language Analyzer...")
    console.log(`Repository: ${repositoryUrl}`)

    await cloneRepository(repositoryUrl)
    const repoPath = findRepositoryPath()

    await removeDirectory(CLONE_DIR)
    console.log("\nAnalysis completed successfully!")
  } catch (error) {
    console.error(`Analysis failed: ${error.message}`)
  }
}

async function cloneRepository(url) {
  console.log("Downloading repository...")

  await removeDirectory(CLONE_DIR)
  await createDirectory(CLONE_DIR)

  const cloneCmd = isWindows
    ? `cd /d "${CLONE_DIR}" && git clone ${url}`
    : `cd ${CLONE_DIR} && git clone ${url}`

  await executeCommand(cloneCmd)
  console.log("Repository downloaded successfully")
}

function findRepositoryPath() {
  const contents = fs.readdirSync(CLONE_DIR)
  const directories = contents.filter(item =>
    fs.statSync(path.join(CLONE_DIR, item)).isDirectory() &&
    !item.startsWith('.')
  )

  if (directories.length === 0) return CLONE_DIR

  const repoPath = path.join(CLONE_DIR, directories[0])
  console.log(`Found repository at: ${repoPath}`)
  return repoPath
}

async function createDirectory(dirPath) {
  try {
    const cmd = isWindows ? `mkdir "${dirPath}"` : `mkdir -p ${dirPath}`
    await executeCommand(cmd)
  } catch {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return

  try {
    const cmd = isWindows ? `rmdir /s /q "${dirPath}"` : `rm -rf ${dirPath}`
    await executeCommand(cmd)
  } catch {
    fs.rmSync(dirPath, { recursive: true, force: true })
  }
}

analyzeRepository()