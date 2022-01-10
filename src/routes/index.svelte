<script>
    import http from '../helpers/request_helper';
    import OperationDocsHelper from "../helpers/operation_docs";
    import { todos, isAuthenticated, user, token, isLoading } from "../store";
    import {onMount} from "svelte";
    import {get} from "svelte/store";
    import auth from "../auth_service";
    import TodoItem from "$lib/TodoItem.svelte";
    import {Wave} from 'svelte-loading-spinners';
    import InfoMessage from "$lib/InfoMessage.svelte";
    import ToAddTodoDialog from "$lib/ToAddTodoDialog.svelte";
    import DeleteDialog from "$lib/DeleteDialog.svelte";

    let internetConnectionLostMessage = "Ooops!.. Something went wrong. " +
        "May be you have lost the internet connection. Try later!";
    token.subscribe(async(tokenValue)=>{
        try {
            if (tokenValue !== "") {
                const {laba5_todo} = await http.startFetchMyQuery(new OperationDocsHelper().QUERY_GetAll());
                todos.set(laba5_todo);
            }
        }catch(e){
            modalInfoText = internetConnectionLostMessage;
            modalInfoIsOpen = true;
        }
    })

    let auth0Client;
    onMount(async () => {
        try {
            if (get(isAuthenticated)) {
                const {laba5_todo} = await http.startFetchMyQuery(new OperationDocsHelper().QUERY_GetAll());
                todos.set(laba5_todo);
            }
            auth0Client = await auth.createClient();
            const isAuth = await auth0Client.isAuthenticated()
            isAuthenticated.set(isAuth);
            const accessToken = await auth0Client.getIdTokenClaims();
            if (accessToken) {
                token.set(accessToken?.__raw);
            }
            user.set(await auth0Client.getUser());
        }catch(e){
            modalInfoText = internetConnectionLostMessage;
            modalInfoIsOpen = true;
        }
    });

    function login(){
        try {
            auth.loginWithPopup(auth0Client);
        }catch(e){
            modalInfoText = internetConnectionLostMessage;
            modalInfoIsOpen = true;
        }
        isLoading.set(true);
    }

    function logout(){
        try {
            auth.logoutClient(auth0Client);
        }catch(e){
            modalInfoText = internetConnectionLostMessage;
            modalInfoIsOpen = true;
        }
    }
    const addTodo = async (title, body) => {
        if(!title || !body){
            modalInfoText = "Title and body cannot be empty!";
            modalInfoIsOpen = true;
            return;
        }

        if(isAuthenticated){
            try{
                const {insert_laba5_todo} = await http.
                startExecuteMyMutation(new OperationDocsHelper().MUTATION_InsertOne(title, body));
                todos.update(n => [...n, insert_laba5_todo?.returning[0]]);
            }
            catch(e){
                modalInfoText = internetConnectionLostMessage;
                modalInfoIsOpen = true;
            }
        }
    }

    const deleteTodos = async (title) => {
        if(title === ""){
            modalInfoText = "Title cannot be empty!";
            modalInfoIsOpen = true;
            return;
        }
        //no such todo
        if( get(todos).filter( el => el?.title === title).length === 0 ){
            modalInfoText = "There is no such todo:)";
            modalInfoIsOpen = true;
            return;
        }
        if(isAuthenticated){
            try {
                await http.startExecuteMyMutation(new OperationDocsHelper().MUTATION_DeleteByQuantity(title));
                todos.update(n => n.filter(item => item?.title !== title));
            }catch(e){
                modalInfoText = internetConnectionLostMessage;
                modalInfoIsOpen = true;
            }
        }
    }



    /*
    * for modals
    * */

    //"info" modal
    let modalInfoIsOpen = false;
    let modalInfoText = "";

    //"add new" modal
    let addNewTodoIsOpen = false;
    const openAddModal = () => {
        addNewTodoIsOpen = true;
    };

    //"delete" modal
    let deleteModalIsOpen = false;
    const openDeleteModal = () => {
        deleteModalIsOpen = true;
    };

</script>

<main>
    {#if $isAuthenticated}

        <InfoMessage
                filler={modalInfoText}
                bind:isOpen={modalInfoIsOpen}
        />
        <ToAddTodoDialog
                bind:isOpen={addNewTodoIsOpen}
                addTodoFunction = {addTodo}
        />
        <DeleteDialog
                bind:isOpen={deleteModalIsOpen}
                deleteFunction={deleteTodos}
        />

        {#if $isLoading}
            <Wave size="60" color="#FF3E00" unit="px" duration="1s"/>
        {:else}
            <div class="todos-block">
                <div class="btn-group">
                    <button on:click={openAddModal} class="btn btn-success" style="vertical-align:middle">Add Todo</button>
                    <button on:click={openDeleteModal} class="btn btn-danger" style="vertical-align:middle">Delete Todo</button>
                    <button on:click={logout} class="btn btn-warning" style="vertical-align:middle">Log Out</button>
                </div>
                {#each $todos as todo}
                    <TodoItem
                            title = {todo.title}
                            body = {todo.body}
                            user_id = {todo.user_id}
                    />
                {/each}
            </div>
        {/if}
    {:else}
        <div class="log-in-block">
            <button on:click={login} class="log-in-button button" style="vertical-align:middle">
                <span>Log in</span>
            </button>
        </div>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0;
        background-color: var(--light-gray);
        box-shadow:  0 0 40px 0 var(--dark-gray);
        border-radius: 20px;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .todos-block{
        text-align: center;
        padding: 1em;
        margin: 0;
        background-color: var(--light-gray);
        box-shadow:  0 0 40px 0 var(--dark-gray);
        border-radius: 20px;
        min-height: 95%;
        width: 100%;
    }

    .button {
        display: inline-block;
        border-radius: 4px;
        border: none;
        color: var(--my-white);
        text-align: center;
        font-size: 28px;
        padding: 20px;
        width: 200px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }

    .button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    .button span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }

    .button:hover span {
        padding-right: 25px;
    }

    .button:hover span:after {
        opacity: 1;
        right: 0;
    }

    .log-in-block{
        padding: 1em;
        margin: 0;
        background-color: var(--light-gray);
        box-shadow:  0 0 40px 0 var(--dark-gray);
        border-radius: 20px;
        min-height: 95%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .log-in-button{
        background-color: var(--button-positive);
    }


</style>