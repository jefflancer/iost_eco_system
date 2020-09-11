<template>
    <div class="container">
        <div class="container text-center">
            <br />
                <h1 class="mb-1">Activate your IOST account</h1>
            <br />
        </div>
        <div class="container form-group">
            <div class="row form-group">
                <span class="mt-0 col-md-12" style="font-size: 20px;color: black">Account name: <b>{{accountName}}</b></span>
            </div>
            <div class="row">
                <span class="mt-0 col-md-12" style="font-size: 20px;color: black;word-wrap: break-word;">Private Key: <b>{{privateKey}}</b><button type="button" 
                    class="btn btn-outline-secondary btn-lg"
                    v-clipboard:copy="privateKey"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <i class="far fa-clone"></i></button></span>                                    
            </div>
            <p class="form-group description" style="color: red">You <b>must</b> keep a copy of this private key! This private key will give you access to your wallet in the future. Print out a copy of your private key and store it in a safe place.
            <b>Without this private key, you cannot access your account, and any money held in your account will be forever lost.</b></p>
            <br/>
        </div>
        <div class="container">
            <div class="row text-center">
                <div class="form-group input-group col-md-5">
                    <base-button block type="default" style="border-radius: 12px;" @click="nextStep()">Activate for free</base-button>
                    <p class="description"> Verify  your  email  address  with Inside IOST to activate a free IOST account.   We will cover the setup cost.</p>
                </div>
                <div class="container col-md-2 text-center">
                    <br />
                        <h1 class="mb-1">or</h1>
                    <br />
                </div>
                <div class="form-group input-group col-md-5">
                    <base-button block type="default" style="border-radius: 12px;" @click="activateAccount()">Activate with iWallet</base-button>
                    <p class="description"> Use resources from an existing iWallet IOST account to cover the cost associated with account activation(10 IOST).</p>
                </div>
            </div>
        </div>
        <div class="row">
            <button type="button" class="btn btn-link" @click="beforeStep()"><i class="fas fa-arrow-left"></i> Back</button>
        </div>
       <notifications width="25%" group="copied" position='bottom right'/>
       <notifications width="25%" group="notify" position='bottom right'/>
    </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
 
import IOST from 'iost'
import bs58 from 'bs58';
import { truncate } from 'fs';

import { accountService } from "../services/index";

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
Vue.use(Notifications)

export default {
    name: "activate-iost",
    // data() {
    //     return {
    //         is_login_iWallet: true
    //     }
    // },
    computed: {
        accountName() {
            return this.$store.state.accountName
        },
        privateKey() {
            return this.$store.state.privateKey
        },
    },
    methods: {
        beforeStep: function (e) {
            this.$emit('change-step', 0);
        },
        onCopy: function (e) {
            Vue.notify({
                group: 'copied',
                title: 'Important message',
                text: 'You copied private key!',
            })
        },
        onError: function (e) {
            alert('Failed to copy texts')
        },
        nextStep: function (e) {
            this.$emit('change-step', 2);
        },
        activateAccount: function (e) {
            if(typeof window.IWalletJS === "undefined") {
                Vue.notify({
                    group: 'copied',
                    title: 'Warning',
                    type: 'error',
                    text: "Please install IWallet Chrome Extension or this browser not support IWallet",
                })
                return;
            }
            IWalletJS.enable().then((account) => {
                if(!account) {
                    // not login
                    Vue.notify({
                        group: 'copied',
                        title: 'Warning',
                        type: 'error',
                        text: "Please login IWallet",
                    })
                    return;
                } 
                const newAccountName = this.$store.state.accountName
                const newPk = this.$store.state.privateKey
                const iost = IWalletJS.newIOST(IOST)
                const newKp = new IOST.KeyPair(bs58.decode(newPk));
                const tx = iost.newAccount(
                    newAccountName,
                    account,
                    newKp.id,
                    newKp.id,
                    0,
                    0
                );
                tx.addApprove('iost', 10);
                iost.signAndSend(tx)
                .on('pending', (trx) => {
                })
                .on('success', (result) => {
                    Vue.notify({
                        group: 'copied',
                        title: 'Important message',
                        text: 'Success! You can import to IWallet with saved private key now.',
                    })
                })
                .on('failed', (failed) => {
                    Vue.notify({
                        group: 'copied',
                        title: 'Important message',
                        type: 'error',
                        text: failed,
                    })
                })
            }).catch(error => {
                if(error.type == "locked") {
                    Vue.notify({
                        group: 'copied',
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
