<script>
    export let isOpen;
    export let filler;
    import Modal from "sv-bootstrap-modal";
</script>


<Modal bind:open={isOpen}>
    <div class="modal-header">
        <h5 class="modal-title">Info message</h5>
    </div>
    <div class="modal-body">
        {filler}
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" on:click={() => isOpen = false}>Close</button>
    </div>
</Modal>