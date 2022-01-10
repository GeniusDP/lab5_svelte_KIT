<script>
    export let isOpen;
    export let deleteFunction;
    import Modal from "sv-bootstrap-modal";
    let title = "";
    const successFunction = () => {
        isOpen = false;
        deleteFunction(title);
        title = "";
    }
</script>


<Modal bind:open={isOpen}>
    <div class="modal-header">
        <h5 class="modal-title">Delete a todo by title</h5>
    </div>
    <div class = "modal-body">
        <input bind:value={title} type="text" pattern=".{1}" placeholder="title to delete"/>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" on:click={successFunction}>DELETE</button>
    </div>
</Modal>