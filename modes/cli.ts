import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";

export async function runCliMode() {
  while (true) {
    const mode = await select({
      message: "Choose cli sub mode",
      options: [
        { value: "Agent", label: "Agent" },
        { value: "Ask", label: "Ask" },
        { value: "Plan", label: "Plan" },
        { value: "back", label: "back" },
      ],
    });

    if (isCancel(mode)|| mode == "back") {
      return;
    }
    if(mode=="Agent"){
        console.log("Agent")
    }
    if(mode=="Plan"){
        console.log("Plan")
    }
    if(mode=="Ask"){
        console.log("Ask")
    }

    if(mode != "Agent" && mode != "Ask" && mode != "Plan"){
        console.log(chalk.yellow("\nThat mode is not implemented yet.\n"))
    }
  }
}
