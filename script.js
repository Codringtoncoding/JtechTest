/**
  * Gets a token to be used in API calls
  * This token references your personal database instance, should be kept consitent throughout the excercise
  * Please change to something unique - perhaps your names
  *
  * @returns {string}
  */
function getToken() {
  return 'humphrey';
}

/**
  * Makes an HTTP request to the Todo list API
  * You shouldn't need to modify this - but feel free to do so!
  *
  * @param {string} method HTTP method/verb to be used
  * @param {string} resource Resource to be acted upon on the server, e.g. '/item' or '/item/3'
  * @param {Object} body Request body (if needed)
  * @param {function} successCb On success callback
  * @param {function} errorCb On error callback
  */
function makeRequest(method, resource, body, successCb, errorCb) {
  var baseUrl = 'https://todoapi.nxj.io';
  $.ajax({
    method: method,
    url: baseUrl + resource,
    headers: { 'token': getToken() },
    data: body ? JSON.stringify(body) : null,
    success: successCb,
    error: errorCb
  });
}

/**
  * Gets items from Todo list API
  *
  * @param {function} callback On success callback, function takes one argument: the item array
  */
function getItems(pizza) {
  makeRequest('GET', '/item', null, function (data) {
    var items = data['Data'];
    pizza(items);
  }, function () {
    console.log("An error occured in getItems");
    pizza([]);
  });
}

/**
  * Adds new item to the Todo list
  *
  * @param {string} name Name of item
  * @param {string} description Short description of the item
  * @param {string} assignee Assignee of item
  * @param {string} dueDate Due Date of the item
  * @param {string} props Any other information you might want to include
  */
function addItem(name, description, assignee, dueDate, props) {
  var body = {
    'Name': name, 'Desc': description,
    'Assignee': assignee, 'DueDate': dueDate,
    'Props': props
  }
  makeRequest('POST', '/item', body, function (data) {
    refreshList()
    console.log('success');
  }, function () {
    console.log("An error occured in addItem");
  });
}

/**
 * Deletes and item in the Todo list
 *
 * @param {int} id ID of item
 */
function deleteItem(id) {
  makeRequest('DELETE', `/item/${id}`, {}, function (data) {
    refreshList()
    console.log('success');
  }, function () {
    console.log("An error occured in deleteItem");
  });
 }

/**
  * Updates an item in the Todo list
  *
  * @param {int} id ID of item
  * @param {string} name Name of item
  * @param {string} description Short description of the item
  * @param {string} assignee Assignee of item
  * @param {string} dueDate Due Date of the item
  * @param {string} props Any other information you might want to include
  */
function updateItem(id, name, description, assignee, dueDate, props) { }

/**
  * Adds an item list onto the page
  * Requires a DOM element with id 'list' to be present
  *
  * @param {Array} items
  */
function createItemTable(items) {
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  var list = '<div>ID, Name, Description, Assignee</div>';
  items.forEach(i => {
    element = '<div>'
    element += i['ID'] + '. '
    element += i['Name'] + ', '
    element += i['Desc']  + ', '
    element += i['Assignee']  + ', '
    element += `<button onclick="deleteItem('${i['ID']}')">delete</button>`
    element += `<button onclick="updateItem('${i['ID']}')">update</button>`
    element += '</div>'
    list += element
  });
  
  $('#list').html(list);
}

/**
  * Refreshes the item list
  * Pulls all items from the API and displays them on the page
  */
function refreshList() {
  getItems(function (items) {
    createItemTable(items);
  });
}



window.addEventListener('DOMContentLoaded', (event) => {
  refreshList()
  const form = document.getElementById('form')
  form.addEventListener('submit', (event) => {
    addItem(form.name.value, form.description.value, form.assignee.value, form.dueDate.value, form.props.value);
    //don't do defualt behaviour
    event.preventDefault();
  })
});





//dont need jquery to work as above does the same
// $().ready(function() {
//   refreshList();
// });
//cleaner 

// const callback = (items) => {
//   createItemTable(items)
// };
// getItems(callback);  