<template>
    <div class="container text-center">
        <br />
        <h1 class="mb-1">Vote to Earn Rewards</h1>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left">Voting (staking) your IOST for certain nodes can yield rewards in the form of more IOST. This works because the nodes are hosting transactions by using their own computing power.</p>
        <br />
        <p class="mt-0 col-md-10 mx-auto text-left"><b>Note: Once you stake IOST to a node, you will not be able to transact with that IOST until choosing to unstake the IOST and waiting for 7 days.</b></p>
        <br />
        <div class="container">
            <div class="row col-md-8 mx-auto">
                <div class="col-md-6">
                    <p class="mt-0 col-md-10 mx-auto text-left">Account name: <b>{{ selectedAccountName }}</b></p>
                    <p class="mt-0 col-md-10 mx-auto text-left">Total IOST: <b>{{ selectedAccountTotalBalance }}</b></p>
                    <p class="mt-0 col-md-10 mx-auto text-left">Available for Voting: <b>{{ selectedAccountAvailableForVote }}</b></p>
                </div>
                <div class="col-md-6">
                    <br/>
                    <base-button block type="default" style="border-radius: 12px;"  @click="voteInside()">Vote for Inside IOST</base-button>
                </div>
            </div>
        </div>
        <modal :show.sync="modals.modal0">
            <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">Vote</h5>
            </template>
            <div>
                <div class="row">
                    <div class="col-md-12">
                        <base-input value="Number" type="Number" alternative v-model="vote_amount"></base-input>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <base-button type="secondary" @click="modals.modal0 = false">Cancel</base-button>
                <base-button type="primary" @click="voteForLeobi()">Vote</base-button>
            </template>
        </modal>
        <notifications width="30%" group="message" position='bottom right'/> 
    </div>
</template>

<script>
import Vue from 'vue';
import Notifications from 'vue-notification';

import IOST from 'iost'
import Modal from "@/components/Modal.vue";

export default {
    name: 'vote-to-node',
    components: {
        Modal
    },
    updated () {

    },
    data() {
    return {
        vote_amount: 0,
        modals: {
                modal0: false,
            }
        };
    },
    computed: {
        selectedAccountName() {
            return this.$store.state.selectedAccountName
        },
        selectedAccountTotalBalance() {
            return this.$store.state.selectedAccountTotalBalance
        },
        selectedAccountAvailableForVote() {
            return this.$store.state.selectedAccountAvailableForVote
        },
    },
    methods: {
        voteInside() {
            IWalletJS.enable().then((account) => {
                if(!account) return; // not login
                this.modals.modal0 = true
            }).catch(error => {
                if(error.type == "locked") {
                    Vue.notify({
                        group: 'message',
                        title: 'Warning',
                        type: 'error',
                        text: "Please unlock IWallet extension and refresh",
                    })
                }
            })
        },
        voteForLeobi() {
            if( this.vote_amount >= this.selectedAccountAvailableForVote || this.vote_amount < 1 ) {
                Vue.notify({
                    group: 'message',
                    title: 'Warning',
                    type: 'error',
                    text: "Invalid amount to vote",
                })
                return;
            }
            IWalletJS.enable().then((account) => {
                if(!account) return; // not login
                this.iost = IWalletJS.newIOST(IOST)
                this.iost.config.gasLimit = 400000//400000
                this.iost.config.gasRatio = 1//1
                this.rpc = new IOST.RPC(new IOST.HTTPProvider('http://18.209.137.246:30001'))
                
                const ctx = this.iost.callABI("vote_producer.iost", "vote", [account, "leobi", this.vote_amount]);
                ctx.addSigner(account, "vote");
                ctx.addApprove('iost', this.vote_amount);
                this.iost.signAndSend(ctx)
                .on('pending', (trx) => {
                    console.log(trx, 'trx')
                })
                .on('success', (result) => {
                    console.log(result, 'result')
                    Vue.notify({
                        group: 'message',
                        title: 'Important message',
                        text: 'You have voted for Inside IOST!',
                    })
                    this.modals.modal0 = false
                })
                .on('failed', (failed) => {
                    console.log(failed, 'failed')
                    Vue.notify({
                        group: 'message',
                        title: 'Warning',
                        type: 'error',
                        text: failed.message ? failed.message : "You rejected the signature request",
                    })
                })
            }).catch(error => {
                if(error.type == "locked") {
                    Vue.notify({
                        group: 'message',
                        title: 'Warning',
                        type: 'error',
                        text: "Please unlock iwallet and refresh the page",
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>
