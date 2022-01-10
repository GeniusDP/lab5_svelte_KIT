import { writable } from "svelte/store";

export const todos = writable([]);
export const token = writable("");
export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const isLoading = writable(true);
