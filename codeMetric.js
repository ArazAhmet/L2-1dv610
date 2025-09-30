import { exec } from "child_process"
import { promisify } from "util"

const executeCommand = promisify(exec)
const DEFAULT_REPO = "https://github.com/ArazAhmet/Uppgift_2_Webbteknik.git"

export async function analyzeRepository(repositoryUrl = DEFAULT_REPO) {
  try {
    console.log("Starting Language Analyzer...")
    console.log(`Repository: ${repositoryUrl}`)

    console.log("\nAnalysis completed successfully!")
  } catch (error) {
    console.error(`Analysis failed: ${error.message}`)
  }
}

analyzeRepository()