<script>
    export let title;
    export let body;
</script>


<div class="todoshka" >
    <table>
        <tr>
            <td>
                Title
            </td>
            <td>
                Body
            </td>
        </tr>

        <tr>
            <td>
                <div class = {"title-div"}>
                    {title}
                </div>
            </td>
            <td>
                <div  class = {"body-div"}>
                    {body}
                </div>
            </td>
        </tr>
    </table>
</div>

<style>
    .todoshka{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        align-content: center;
        margin: 10px;
    }

    .title-div{
        width: 100%;
        height: 100%;
        padding: 10px 0px;
        background-color: var(--my-orange);
        overflow: hidden;
    }

    .body-div{
        width: 100%;
        height: 100%;
        padding: 10px 0px;
        background-color: var(--my-greenyellow);
        overflow: hidden;
    }

    table{
        width: 100%;
        padding: 0px;
        margin: 0;
    }

    tr{
        width: 100%;
        padding: 0px;
        margin: 0;
        background-color: var(--my-cadetblue);
    }

    td{
        margin: 0;
        padding: 0px;
        width: 50%;
    }
</style>