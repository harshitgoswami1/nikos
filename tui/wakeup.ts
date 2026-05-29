import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";



const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#4ba67e');
const FACE = chalk.hex('#a10000').bold; 

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, '').split('\n');
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(('  ' + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}


export async function runWakeup() {
    let ascii:string;
    try {
        ascii = figlet.textSync("n i k o s",{font:BANNER_FONT})
    } catch (error) {
        ascii = figlet.textSync("n i k o s",{font:"Standard"})
    }

    printBannerWithShadow(ascii);

    const mode = await select({
    message: 'Choose a Mode',
    options: [
      { value: 'Cli', label: 'CLI' },
      { value: 'Telegram', label: 'Telegram' },
      { value: 'Exit', label: 'Exit' },
    ],});

    if (isCancel(mode) || mode === "Exit") {
      console.log(chalk.dim('\n goodbye \n'));
      process.exit(0);
    }


    if(mode == "Cli") {
      runCliMode();
    }
    if(mode == "Telegram") console.log("telegram bot running")
}