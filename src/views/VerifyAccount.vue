<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                      
                        <div class="mt-5 py-5 text-center">
                            <div class="row justify-content-center">
                                <div v-if="success==0" class="col-lg-9">
                                    <h3>We are working on verification process! Please wait..<i class="fas fa-circle-notch fa-spin"></i></h3>
                                </div>
                                <div v-if="success==1" class="col-lg-9">
                                    <h3>Your account is verified. Now you can use your free new account!</h3>
                                </div>
                                <div v-if="success==2" class="col-lg-9">
                                    <h3>Your email is already verified or token expired.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import { accountService } from "../services/index";

export default {
    name: "verification",
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.success = 0;
        this.verifyToken()
    },
    data() {
        return {
            success: 0,
        }
    },
    methods: {
        verifyToken () {
            accountService.sendVerificationToken(this.$route.params.email, this.$route.params.token, this.$store.state.privateKey,
            this.$store.state.accountName).then((result)=> {
                if(!result.data.error) {
                    // alert(result.data.description);
                    this.success = 1;
                } else {
                    // alert(result.data.description);
                    this.success = 2;
                }
            })
        }
    }
}
</script>
