﻿// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { StdioSummarizer } from '@rushstack/terminal';
import { CollatedWriter } from '@rushstack/stream-collator';

import { TaskStatus } from './TaskStatus';
import { CommandLineConfiguration } from '../../api/CommandLineConfiguration';

export interface ITaskRunnerContext {
  repoCommandLineConfiguration: CommandLineConfiguration | undefined;
  collatedWriter: CollatedWriter;
  stdioSummarizer: StdioSummarizer;
  quietMode: boolean;
  debugMode: boolean;
}

/**
 * The `Task` class is a node in the dependency graph of work that needs to be scheduled by the
 * `TaskExecutionManager`. Each `Task` has a `runner` member of type `BaseTaskRunner`, whose subclass
 * manages the actual operations for running a single task.
 */
export abstract class BaseTaskRunner {
  /**
   * Name of the task definition.
   */
  public abstract readonly name: string;

  /**
   * This flag determines if the task is allowed to be skipped if up to date.
   */
  public abstract isSkipAllowed: boolean;

  /**
   * Assigned by execute().  True if the script was an empty string.  Operationally an empty string is
   * like a shell command that succeeds instantly, but e.g. it would be odd to report time statistics for it.
   */
  public abstract hadEmptyScript: boolean;

  /**
   * Method to be executed for the task.
   */
  public abstract executeAsync(context: ITaskRunnerContext): Promise<TaskStatus>;
}
