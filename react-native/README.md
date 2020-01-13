# Coding Challenge - React Native

Inventory is a small utility app that could be used in a logistics company. It has two use cases:

b. Adding products to the inventory using a bar code scanner
a. Viewing the inventory of products

The app is built using Expo, TypeScript, React Native Paper and Redux. The backend is a REST API provided by Airtable.

Project management has created tasks related to the app and put them on the Kanban board. Pick a single task and try to solve it within a reasonable amount of time (~2h).

## Tasks

---

### INV-1

**Type:** Bug

**Subject:** Inventory list limited to 100 items

**Description:** On the app's home screen the user cannot scroll beyond 100 items. The list of products stops after 100 items, despite more items being stored in the backend. The app should load remaining items when the user scrolls to the end of the list.

**Tipp:** 
Airtable's REST API allows for 100 items to be fetched in one request. In order to show all results, create a `fetchMoreInventory` thunk action with pagination using the `offset` parameter.

---

### INV-2

**Type:** Feature

**Subject:** Filter input for products list

**Description:** It should be possible for the user to filter the list of products on the app's home screen. Add a text input on top of the product list that filters the list of products for matching product codes as you type (product code contains filter string). A reset button lets you clear the text input and return to the unfiltered products list.

**Tipp:** Create a `setFilter` action along with a search input on top of the `HomeScreen` component to enable the user to filter for inventory items by product code. The same action can be used to reset the products list

---

## Additional info

- The goal is not to have a perfect solution but to be able to perfectly explain whatever result you have got.
- For questions regarding the instructions don't hesitate to get back in contact with us.
