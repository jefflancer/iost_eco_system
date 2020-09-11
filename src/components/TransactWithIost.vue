<template>
    <div class="container text-center">
        <br />
        <h1 class="mb-1">Transact with your IOST</h1>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left">This is comparable to spending money from your bank account. You can send IOST to another person from your IOST wallet. Or you can spend IOST through applications (called dApps) that are programmed to work directly with the IOST blockchain. These dApps will interface with your IOST wallet through your iWallet Chrome extension.</p>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left">Try some popular dApps on IOST Now:</p>
        <br />
        <div class="row">
            <div class="col-sm-3 col-12 card-lift--hover">
                <a target="_blank" rel="noopener noreferrer" href="#">
                    <img v-lazy="'/img/icons/dApp1.png'" alt="Rounded image" class="img-fluid rounded shadow"
                    style="width: 150px;">
                </a>
            </div>
            <div class="col-sm-3 col-12 card-lift--hover">
                <a target="_blank" rel="noopener noreferrer" href="#">
                    <img v-lazy="'/img/icons/dApp2.png'" alt="Rounded image" class="img-fluid rounded shadow"
                    style="width: 150px;">
                </a>
            </div>
            <div class="col-sm-3 col-12 card-lift--hover">
                <a target="_blank" rel="noopener noreferrer" href="#">
                    <img v-lazy="'/img/icons/dApp3.png'" alt="Rounded image" class="img-fluid rounded shadow"
                    style="width: 150px;">
                </a>
            </div>
            <div class="col-sm-3 col-12 card-lift--hover">
                <a target="_blank" rel="noopener noreferrer" href="#">
                    <img v-lazy="'/img/icons/dApp4.png'" alt="Rounded image" class="img-fluid rounded shadow"
                    style="width: 150px;">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'transact-with-iost'
}
</script>

<style>

</style>
