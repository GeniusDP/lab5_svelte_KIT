import { isLoading, token } from "../store";
import { get } from "svelte/store";

class RequestHelper {
    //to string casting because this.API_URL in
    //lines after generates warning
    API_URL = import.meta.env.VITE_API_URL.toString();
    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(this.API_URL, {
            method: "POST",
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName,
            }),
            headers: {
                Authorization: `Bearer ${get(token)}`,
            },
        });
        return await result.json();
    }

    async startFetchMyQuery(operationsDoc) {
        const { errors, data } = await this.fetchMyQuery(operationsDoc);
        if (errors) {
            throw errors;
        }
        //console.log("array of todos from start = " + JSON.stringify(data));
        isLoading.set(false);
        return data;
    }

    executeMyMutation(operationsDoc, variables = {}) {
        try {
            return this.fetchGraphQL(operationsDoc, "MyMutation", variables);
        } catch (e) {
            throw e;
        }
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        const { errors, data } = await this.executeMyMutation(operationsDoc, variables);
        if (errors) {
            throw errors;
        }
        //console.log(data);
        return data;
    }
    fetchMyQuery(operationsDoc) {
        try {
            return this.fetchGraphQL(operationsDoc, "MyQuery", {});
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestHelper();
