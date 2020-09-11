<template>
    <div class="container text-center">
        <br />
        <h1 class="mb-1">Deposit IOST into your wallet</h1>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left">You can purchase IOST on many crypto exchanges. We recommend Binance or KuCoin - both allow for credit and debit card purchases.</p>
        <div class="container">
            <div class="row mx-auto text-center">
                <div class="col-sm-3 offset-sm-2">
                    <img v-lazy="'/img/icons/binance.png'" alt="Circle image"
                       style="width: 80px;">
                    <small class="d-block text-uppercase font-weight-bold mb-4"><a  target="_blank" rel="noopener noreferrer" href="https://www.binance.com/en">Visit Binance</a></small>               
                </div>
                <div class="col-sm-3 offset-sm-2">
                    <img v-lazy="'/img/icons/kucoin.png'" alt="Raised image"
                        style="width: 80px;">
                    <small class="d-block text-uppercase font-weight-bold mb-4"><a target="_blank" rel="noopener noreferrer" href="https://www.kucoin.com/">Visit KuCoin</a></small>
                </div>
            </div>
        </div>
        <p class="mt-0 col-md-10 mx-auto text-left">You cannot purchase IOST directly on these exchanges. You must first purchase another cryptocurrency like Bitcoin or Ethereum, then trade for IOST on the exchange. You can purchase or sell IOST at anytime without penalty.</p>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left">Some people hold their IOST on the exchange for convenience. Storing your IOST at an exchange is like storing your money in the bank - you must trust the exchange to hold your funds securely. They hold the private keys for your IOST and act as custodian for your money. After purchasing IOST on an exhcnage, you can transfer IOST from the exchange to your personal IOST wallet. <b>We recommend you transfer a small amount at first to gain confidence before transferring a larger sum.</b></p>
    </div>
</template>
<script>
export default {
    name: "deposit-to-wallet",
}
</script>
