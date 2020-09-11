<template>
    <div class="container text-center">
        <br />
        <h1 class="mb-1">Create your IOST account</h1>
        <br />
        <form v-on:submit.prevent="checkIfRecaptchaVerified">
            <div class="container form-group row col-md-9 mx-auto">
                <div class="form-group col-12 col-md-9">
                    <input class="form-control" placeholder="Input IOST Account Name" type="text" id="account_name" aria-describedby="basic-addon2">
                    <span id="account-valid" class="form-text text-primary"></span>
                    <span id="account-invalid" class="form-text text-danger"></span>

                </div>
                <br/>
                <div class="form-group container col-12 col-md-3">
                    <button type="button" class="btn btn-outline-primary" style="border-radius: 12px;" @click="validateAccount()">Check Availability</button>
                </div>
            </div>
            <div class="form-group col-md-4 col-sm-12 mx-auto">
                <vue-recaptcha @verify="markRecaptchaAsVerified"
                 class="google-captcha" sitekey="6Ld5tqQUAAAAAH9-TFYF16_FwW3ozRiJjN9TP1wd">
                </vue-recaptcha>
                <div style="color:red"><strong>{{ loginForm.pleaseTickRecaptchaMessage }}</strong></div>
            </div>
            <p class="mt-0 col-md-8 mx-auto">Account name must be unique on the IOST blockchain. It must be between 5 and 11 characters, lowercase letters and numbers only.</p>
            <base-button type="default" nativeType="submit" round block size="lg">
                Create Account
            </base-button>
        </form>
    </div>
</template>
<script>
import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha';

import { accountService } from "../services";

export default {
    name: "create-iost",
    components: {
        VueRecaptcha,
    },
    props: ['currentStep'],
    data() {
        return {
            loginForm: {
                recaptchaVerified: false,
                pleaseTickRecaptchaMessage: ''
            },
        };
    },
    methods: {
        markRecaptchaAsVerified(response) {
            this.loginForm.pleaseTickRecaptchaMessage = '';
            this.loginForm.recaptchaVerified = true;
        },
        requestNameValidation() {
            $("#account-valid").html("")
            $("#account-invalid").html("")
            $("#account_name").attr( "class", "form-control" )
        },
        validationFailed(message) {
            $("#account-invalid").html(message)
            $("#account-valid").html("")
            $("#account_name").attr( "class", "form-control border-danger" )
        },
        validationSuccess(message) {
            $("#account-valid").html(message)
            $("#account-invalid").html("")
            $("#account_name").attr( "class", "form-control border-primary" )
        },
        validateAccount() {
            const new_account_name = $("#account_name").val();
            this.requestNameValidation();
            accountService.checkValidation(new_account_name).then((result)=> {
                if(!result.data.error) {
                    this.validationSuccess(result.data.description)
                } else {
                    this.validationFailed(result.data.description)
                }
            })
        },
        checkIfRecaptchaVerified() {
            this.requestNameValidation();
            if (!this.loginForm.recaptchaVerified) {
                this.loginForm.pleaseTickRecaptchaMessage = 'Invalid google reCaptcha check.';
                return true; // prevent form from submitting
            }
            // form submitted
            const new_account_name = $("#account_name").val();
            var self = this;
            accountService.newKey(new_account_name).then((result)=> {
                if(!result.data.error) {
                    self.$store.commit(
                        "UPDATE_ACCOUNT_NAME",
                        new_account_name
                    );
                    self.$store.commit(
                        "UPDATE_PRIVATEKEY",
                        result.data.privateKey
                    );
                    this.$emit('change-step', 1);
                } else {
                    this.validationFailed(result.data.description);
                }
            })
        }
    },
    mounted() {

    },
    destroyed() {
    }
}
</script>
