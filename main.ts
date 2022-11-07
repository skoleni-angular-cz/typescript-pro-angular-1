import { mainMenu } from './screens';
import { TaskStorage } from './task-storage';

async function main() {
  try {
    const storage = new TaskStorage();
    await mainMenu(storage);
  } catch (ex) {
    if (ex instanceof Error) {
      console.log(ex.message);
    }
  }
}

main();
