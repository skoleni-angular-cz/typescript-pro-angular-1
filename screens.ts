/**
 * * Přehled úkolů v úkolníčku s možností přidání nového úkolu,
 * Obrazovka přidání nového úkolu,
 * Obrazovka detailu úkolu, která by měla umět úkol označit za hotový/rozpracovaný, nebo ho smazat.
 */

import { Task } from './model';
import { TaskStorage } from './task-storage';
import { consolePrompt } from './util';

export async function mainMenu(taskStorage: TaskStorage) {
  console.clear();
  console.log('Ukoly:');

  for (const task of taskStorage.getAllTasks()) {
    console.log(task.id + ' - ' + task.name + ' ' + formatTaskCompletion(task));
  }

  console.log('V ... vytvorit ukol');

  const userInput = await consolePrompt();

  if (userInput === 'v') {
    await createTaskScreen(taskStorage);
  } else {
    await taskDetailScreen(taskStorage, parseInt(userInput));
  }
}

export async function createTaskScreen(taskStorage: TaskStorage) {
  console.clear();
  console.log('Nazev tasku:');

  const userInput = await consolePrompt();

  taskStorage.createTask(userInput);
  await mainMenu(taskStorage);
}

export async function taskDetailScreen(
  taskStorage: TaskStorage,
  taskId: number
) {
  console.clear();
  const task = taskStorage.getTaskById(taskId);

  console.log('Nazev tasku: ' + task.name);
  console.log('Hotovo: ' + task.complete);

  console.log('---');

  console.log('H ... oznacit za hotovy');
  console.log('S ... smazat');
  console.log('Z ... zpet do hlavniho menu');

  const userInput = await consolePrompt();

  if (userInput === 'h') {
    taskStorage.setTaskStatus(task.id, true);
    await taskDetailScreen(taskStorage, task.id);
  } else if (userInput === 's') {
    taskStorage.deleteTask(task.id);
    await mainMenu(taskStorage);
  } else if (userInput === 'z') {
    await mainMenu(taskStorage);
  } else {
    console.log('Neplatna volba.');
    await mainMenu(taskStorage);
  }
}

function formatTaskCompletion(task: Task): string {
  if (task.complete) {
    return '[x]';
  } else {
    return '[ ]';
  }
}
