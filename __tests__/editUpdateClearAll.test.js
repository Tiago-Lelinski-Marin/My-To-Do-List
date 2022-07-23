/**
 * @jest-environment jsdom
*/
import editTask from '../src/modules/editTask';
import getArr from '../src/modules/getDataFromLocalStorage';
import saveInLocalStorage from '../src/modules/saveAtLocalStorage';
import renderList from '../src/modules/renderList';
import clearList from '../src/modules/clearList';
import updateStatus from '../src/modules/updateStatus'

describe('edit , update & clear All', () => {
  // set up environment
  document.body.innerHTML = `<main>+
  <section id="task-list">+
    <div id="list-title">+
      <h2>Today's To Do</h2>+
      <span><i class="fa-solid fa-arrows-rotate"></i></span>+
    </div>+
      <input id="task-text" type="text" placeholder="Add your task..." required>+
      <button id="add-task-btn" type="submit"><i class="fa-solid fa-plus"></i></button>+
    <div class="check-all">+
      <input  type="checkbox">+
      <label>SELECT ALL</label>+
    </div>+
    <ul id="list-placeholder"></ul>+
    <button id="clear-btn">Clear all completed</button>+
  </section>+
</main>`;

  describe("edit", () => {
    // set up environment
    const taskListArr = getArr();
    for (let i = 1; i <= 10; i += 1) {
      const task = { Description: `fake${i}`, Completed: false, Index: i };
      taskListArr.push(task);
    }
    saveInLocalStorage(taskListArr);
    clearList();
    renderList();


    //start tests
    test('description was edited succesfully', () => {
      const taskDescriptionBefore = document.querySelector(".task-text").value;
      const taskDescriptionInput = "chaged description";
      editTask(taskDescriptionInput, 1);
      const taskDescriptionAfter = document.querySelector(".task-text").value;
      expect(taskDescriptionAfter).not.toBe(taskDescriptionBefore);
      expect(taskDescriptionAfter).toBe(taskDescriptionInput)
    })
  })

  describe('update Completed property of tasks', () => {
    // set up environment
    // save fake values to local storage
    const taskListArr = getArr();
    for (let i = 1; i <= 10; i += 1) {
      const task = { Description: `fake${i}`, Completed: false, Index: i };
      taskListArr.push(task);
    }
    saveInLocalStorage(taskListArr);
    clearList();
    renderList();

    // start update Completed status
    test('property Completed was updated succesfully', () => {
      let taskListArr = getArr();

      const completedStatusBefore = taskListArr[1].Completed;

      //user clicked
      const userClickOnCheckBox = true;
      updateStatus(1, userClickOnCheckBox);

      taskListArr = getArr();
      const completedStatusAfter = taskListArr[0].Completed;
      expect(completedStatusAfter).not.toBe(false);
      expect(completedStatusAfter).toBe(userClickOnCheckBox);
    })
  })
})