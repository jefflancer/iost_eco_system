<template>
    <div class="container">
        <div class="container text-center">
            <br />
                <h1 class="mb-1">Activate your free account</h1>
            <br />
            <form v-on:submit.prevent="requireVerification">
                <div class="container form-group row col-md-9  mx-auto">
                    <div class="form-group input-group col-12 col-md-8  mx-auto">
                        <input class="form-control" placeholder="Enter email" type="email" v-model="email" aria-describedby="basic-addon2" required>
                    </div>
                    <br/>
                </div>
                <p class="mt-0 col-md-8 mx-auto">Please verify your email address to activate a free IOST account.</p>
                <div class="container">
                    <div class="form-group input-group col-md-5 mx-auto">
                        <base-button block type="default" nativeType="submit" style="border-radius: 12px;" v-if="is_sent_email==false" :disabled="is_sent_email == true">Activate for free</base-button>
                        <base-button v-if="is_sent_email == true" block type="default" nativeType="submit" style="border-radius: 12px;" disabled>We will send verification email <i class="fas fa-circle-notch fa-spin"></i></base-button>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <button type="button" class="btn btn-link" @click="beforeStep()"><i class="fas fa-arrow-left"></i> Back</button>
        </div>
       <notifications width="30%" group="notification" position='bottom right'/>
    </div>
</template>

<script>

import Vue from 'vue'
import Notifications from 'vue-notification'
import { accountService } from "../services";

Vue.use(Notifications)

export default {
    name: "activate-free-account",
    data() {
        return {
         is_sent_email: false,
         email: void 0,

        };
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        beforeStep: function (e) {
            this.$emit('change-step', 1);
        },
        requireVerification: function (e) {
            this.is_sent_email = true
            accountService.sendEmailVerification(this.email)
            .then((result) => {
                this.is_sent_email = false
                if(!result.data.error) {
                    Vue.notify({
                        group: 'notification',
                        title: 'Sent verification link to your email',
                        text: 'Please verify your email to activate for free!',
                    })
                }
                else {
                    Vue.notify({
                        group: 'notification',
                        type: 'error',
                        title: 'Email address already exists',
                        text: 'You should not use same email to activate for free!',
                    })
                }
            });
        }
    }
}
</script>
