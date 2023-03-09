# phin-security-todo

You can fetch the updated data from the server after each change and update the component state with the new data. This can be useful if you want to ensure that you always have the latest data.

You can update the component state directly after each change without making a new API request. This can be more performant because it avoids unnecessary network requests.

Option 1 can be useful if you have a small number of items or if you need to make sure you have the latest data. However, if you have a larger dataset or need to minimize network requests, Option 2 may be a better choice.

In Option 2, you can update the component state directly by mutating the existing state using the useState setter function. For example:
