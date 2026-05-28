#!/usr/bin/env bun 

import { runWakeup } from './tui/wakeup';
import dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
const program = new Command();

program
    .name("nikos")
    .description("nikos cli")
    .version("0.0.1")

program
    .command("wakeup")
    .description("show the banner and pick cli or telegram")
    .action(async () => {
        runWakeup();
    })

await program.parseAsync(process.argv)

