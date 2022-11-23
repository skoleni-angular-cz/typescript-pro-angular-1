import { TaskStorage } from './task-storage';
import { mainMenu } from './screens';
const taskStorage: TaskStorage = new TaskStorage();

async function main() {
  try {
    await mainMenu(taskStorage);
  } catch (ex) {
    if (ex instanceof Error) {
      console.log(ex.message);
      await main();
    }
  }
}

main();
