<template>
    <div class="applications-list">
        <h1>Recent requests</h1>
        <div class="list-tags">
            <!-- <p>id</p> -->
            <p>Creation time</p>
            <p>Change time</p>
            <p>Status</p>
            <p>Side</p>
            <p>Price</p>
            <p>Amount</p>
            <p>Instrument</p>
        </div>
        <SingleApplication 
            v-for="application in applications" 
            :key="application.id"
            :application="application"
        />
    </div>
</template>

<script>
import SingleApplication from "@/components/SingleApplication";

export default {
    components: {
        SingleApplication,
    },
    props: {
        applications: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>
.applications-list{
    margin-left: 50px;
    /* margin: 100px 50px 0 50px; */
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: #171c28;
    color: #717688;
}
h1{
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: #fff;
    margin-bottom: 30px;
}
.list-tags{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.list-tags p{
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    width: 14%;
    padding: 10px 20px;
}
</style>