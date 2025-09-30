import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"

const executeCommand = promisify(exec)
const CLONE_DIR = "./cloned-repository"
const DEFAULT_REPO = "https://github.com/ArazAhmet/Uppgift_2_Webbteknik.git"

export async function analyzeRepository(repositoryUrl = DEFAULT_REPO) {
  try {
    console.log("Starting Language Analyzer...")
    console.log(`Repository: ${repositoryUrl}`)

    await cloneRepository(repositoryUrl)
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

  const cloneCmd = `cd ${CLONE_DIR} && git clone ${url}`
  await executeCommand(cloneCmd)

  console.log("Repository downloaded successfully")
}

async function createDirectory(dirPath) {
  try {
    await executeCommand(`mkdir -p ${dirPath}`)
  } catch {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return

  try {
    await executeCommand(`rm -rf ${dirPath}`)
  } catch {
    fs.rmSync(dirPath, { recursive: true, force: true })
  }
}

analyzeRepository()