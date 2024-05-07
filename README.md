# node-rest-api

Tasks:
1.   Write the controllers in the contactsControllers.js file.
2.  The REST API must support the following routes
3.  GET /api/contacts
- Calls the listContacts service function to work with the contacts.json json file
- Returns an array of all contacts in json format with a status of 200

4.  GET /api/contacts/:id
- Calls the getContactById service function to work with the contacts.json json file
- If the contact by id is found, returns the contact object in json format with a status of 200
- If the contact by id is not found, returns a json of the format {"message": "Not found"} with a status of 404.

5.  DELETE /api/contacts/:id
- Calls the removeContact service function to work with the contacts.json json file
- If the contact by id is found and deleted, returns the object of the deleted contact in json format with a status of 200
- If the contact by id is not found, returns a json of the format {"message": "Not found"} with a status of 404.

6.  POST /api/contacts
- Gets body in json format with {name, email, phone} fields. All fields are mandatory - for validation, create a schema using the joi package in the contactsSchemas.js file (located in the schemas folder)
- If there are no mandatory fields in the body (or the passed fields have an invalid value), returns json of the format {"message": error.message} (where error.message is a meaningful message with the essence of the error) with a status of 400
- If body is valid, calls the addContact service function to work with the contacts.json json file, passing data from the body to it
- According to the result of the function, the newly created object with the fields {id, name, email, phone} and the status 201 is returned.

7.  PUT /api/contacts/:id
- Receives the body in json format with any set of updated fields (name, email, phone) (all fields in the body are not required as mandatory: if one of the fields is not transferred, it should be kept in contact with the value that was before update)
- If the update request is made without transferring at least one field to the body, returns json of the format {"message": "Body must have at least one field"} with a status of 400.
- The fields passed in the body must be validated - for validation, create a schema using the joi package in the contactsSchemas.js file (located in the schemas folder). If the passed fields have an invalid value, returns json of the format {"message": error.message} (where error.message is a meaningful message with the essence of the error) with a status of 400
- If everything is fine with the body, it calls the updateContact service function, which should be created in the contactsServices.js file (located in the services folder). This function should take the id of the contact to be updated and the data from the body and update the contact in the json file contacts.json
- According to the result of the function, it returns an updated contact object with a status of 200.
If the contact by id is not found, returns a json of the format {"message": "Not found"} with a status of 404