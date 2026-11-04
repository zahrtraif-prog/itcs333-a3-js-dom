// ITCS333 A3 — To-Do App

(function () {
  'use strict';

  // 1. Grab elements from the DOM
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  // 2. Update the counter
  function updateCounter() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;

    items.forEach(function (li) {
      if (!li.classList.contains('completed')) {
        activeCount++;
      }
    });

    counter.textContent = activeCount + ' item(s) left';
  }

  // 3. Add a new to-do item
  function addTodo() {
    const text = input.value.trim();

    // Check for empty submission
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    // Hide error if text is valid
    errorMsg.classList.add('hidden');

    // Create the <li>
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Create the text span
    const span = document.createElement('span');
    span.className = 'item-text'; // Fixed here
    span.textContent = text;

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    input.value = '';
    
    // Reset filter to 'All' and update counter
    filterAll.click();
    updateCounter();
  }

  // 4. Event Listeners
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
  });

  // Event Delegation on the list
  todoList.addEventListener('click', function (e) {
    const target = e.target;

    // Toggle complete
    if (target.classList.contains('item-text')) { // Fixed here
      const li = target.parentElement;
      li.classList.toggle('completed');
      updateCounter();
    }

    // Delete item
    if (target.classList.contains('delete-btn')) {
      const li = target.parentElement;
      li.remove();
      updateCounter();
    }
  });

  // 5. Filter Functions
  function filterList(filterType) {
    const items = todoList.querySelectorAll('li');

    items.forEach(function (li) {
      const isCompleted = li.classList.contains('completed');
      
      if (filterType === 'all') {
        li.style.display = ''; // Fixed here
      } else if (filterType === 'active') {
        li.style.display = isCompleted ? 'none' : ''; // Fixed here
      } else if (filterType === 'done') {
        li.style.display = isCompleted ? '' : 'none'; // Fixed here
      }
    });
  }

  filterAll.addEventListener('click', function () {
    filterList('all');
  });

  filterActive.addEventListener('click', function () {
    filterList('active');
  });

  filterDone.addEventListener('click', function () {
    filterList('done');
  });

  // Initialize counter on page load
  updateCounter();

})();