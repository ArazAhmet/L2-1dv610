import fs from "fs"
import path from "path"

const LANGUAGES_FILE = "languages.txt"
const DEFAULT_LANGUAGES = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'md', 'py', 'java']

export async function analyzeLanguageDistribution(directoryPath) {
  try {
    console.log("\nAnalyzing programming languages...")

    const supportedLanguages = loadSupportedLanguages()
    console.log(`Loaded ${supportedLanguages.length} language extensions`)

  } catch (error) {
    console.error(`Language analysis failed: ${error.message}`)
  }
}

function loadSupportedLanguages() {
  const configPath = path.join(process.cwd(), LANGUAGES_FILE)

  if (fs.existsSync(configPath)) {
    return fs.readFileSync(configPath, "utf-8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line)
  }

  console.warn(`${LANGUAGES_FILE} not found. Using defaults.`)
  fs.writeFileSync(configPath, DEFAULT_LANGUAGES.join('\n'), 'utf-8')
  return DEFAULT_LANGUAGES
}