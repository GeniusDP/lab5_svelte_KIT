<script>
    export let isOpen;
    export let addTodoFunction;
    import Modal from "sv-bootstrap-modal";
    let title = "";
    let body = "";
    const successFunction = ()=>{
        isOpen = false;
        addTodoFunction(title, body);
        title = "";
        body = "";
    }
</script>


<Modal bind:open={isOpen}>
    <div class="modal-header">
        <h5 class="modal-title">Add new todo:)</h5>
    </div>
        <div class = "modal-body">
            <input bind:value={title} required placeholder="title"/>
            <input bind:value={body} required placeholder="body"/>
        </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-success" on:click={successFunction}>ADD</button>
    </div>
</Modal>