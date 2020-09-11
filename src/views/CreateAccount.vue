<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <h1 class="display-6  text-white">
                                    <span>Create IOST Wallet</span>
                                </h1>
                                <p class="lead  text-white">The first step is to create an account on the IOST blockchain.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>

            <section class="section section-lg pt-lg-0 section-contact-us">
                <div class="container">
                    <tabs fill class="flex-column flex-md-row" circle>
                        <tab-pane title="create">
                            <span slot="title"  class="nav-link-icon d-block "  style="background:url(/img/icons/user.png) no-repeat center center;">
                                    <i></i>
                            </span>
                            <transition name="fade" mode="out-in">
                                <create-iost v-if="stepNum==0" v-model="stepNum" @change-step="changeStep"></create-iost>
                                <activate-iost v-if="stepNum==1" v-model="stepNum" @change-step="changeStep"></activate-iost>
                                <activate-free-account v-if="stepNum==2" v-model="stepNum" @change-step="changeStep"></activate-free-account>
                            </transition>
                        </tab-pane>

                        <tab-pane title="profile">
                            <span slot="title" class="nav-link-icon d-block" style="background:url(/img/icons/iost.png) no-repeat center center;"><i></i></span>
                            <transition name="fade" mode="out-in">
                                <import-to-iwallet></import-to-iWallet>
                            </transition>
                        </tab-pane>

                        <tab-pane title="deposit">
                            <span slot="title" class="nav-link-icon d-block" style="background:url(/img/icons/direct-deposit-icon.png) no-repeat center center;"><i></i></span>
                            <transition name="fade" mode="out-in">
                                <deposit-to-wallet></deposit-to-wallet>
                            </transition>
                        </tab-pane>

                        <tab-pane title="stake">
                            <span slot="title" class="nav-link-icon d-block" style="background:url(/img/icons/stake.png) no-repeat center center;"><i></i></span>
                            <transact-with-iost></transact-with-iost>
                        </tab-pane>

                        <tab-pane title="vote">
                            <span slot="title" class="nav-link-icon d-block" style="background:url(/img/icons/check.png) no-repeat center center;" @click="voteStep()"><i></i></span>
                            <vote-to-node></vote-to-node>
                        </tab-pane>
                </tabs>
                    <!-- <div class="row justify-content-center mt--300">
                        <div class="col-lg-7">
                            <card gradient="secondary" shadow body-classes="p-lg-5">
                                
                            </card>
                        </div>
                    </div> -->
            </div>
        </section>
       <notifications width="30%" group="notify" position='bottom right'/>        
    </div>
    
</template>

<script>
import Vue from 'vue';
import Notifications from 'vue-notification';

import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import ActivateFreeAccount from "@/components/ActivateFreeAccount.vue";
import ActivateIost from "@/components/ActivateIost.vue";
import CreateIost from "@/components/CreateIost.vue";
import ImportToIwallet from "@/components/ImportToIwallet.vue";
import DepositToWallet from "@/components/DepositToWallet.vue";
import TransactWithIost from "@/components/TransactWithIost.vue";
import VoteToNode from "@/components/VoteToNode.vue";

import { accountService } from "../services";
// secrete key = 6Ld5tqQUAAAAAIRGeOGOqf19QoGTZ_CQr5-sIfJi
// site key = 6Ld5tqQUAAAAAH9-TFYF16_FwW3ozRiJjN9TP1wd
Vue.use(Notifications)

export default {
    name: "createaccount",
    components: {
        TabPane,
        Tabs,
        CreateIost,
        ActivateFreeAccount,
        ActivateIost,
        ImportToIwallet,
        DepositToWallet,
        TransactWithIost,
        VoteToNode
    },

    data() {
        return {
            stepNum: 0,
        }
    },
    methods: {
        changeStep: function (value) {
            this.stepNum = value;
        },
        voteStep: function () {
            if(typeof window.IWalletJS === "undefined") {
                Vue.notify({
                    group: 'notify',
                    title: 'Warning',
                    type: 'error',
                    text: "Please install IWallet Chrome Extension or this browser not support IWallet",
                })
                return;
            }
            IWalletJS.enable().then((account) => {
                var self = this;
                if(!account) {
                    // not login
                    Vue.notify({
                        group: 'notify',
                        title: 'Warning',
                        type: 'error',
                        text: "Please login IWallet",
                    })
                    return;
                } 
                accountService.getAccountBalanceDetail(account)
                .then((result) => {
                    this.is_sent_email = false
                    if(!result.data.error) {
                        self.$store.commit(
                            "UPDATE_SELETED_ACCOUNT",
                            account
                        );
                        self.$store.commit(
                            "UPDATE_SELETED_ACCOUNT_TOTAL_BALANCE",
                            result.data.available_balance + result.data.staked_balance + result.data.on_vote_balance
                        );
                        self.$store.commit(
                            "UPDATE_AVAILABLE_BALANCE_FOR_VOTE",
                            result.data.available_balance
                        );
                    }
                    else {
                        
                    }
                });
                
            }).catch(error => {
                console.log(error)
                if(error.type == "locked") {
                    Vue.notify({
                        group: 'notify',
                        title: 'Warning',
                        type: 'error',
                        text: "Please unlock IWallet extension and refresh",
                    })
                }
            })
        }
    }
};
</script>
