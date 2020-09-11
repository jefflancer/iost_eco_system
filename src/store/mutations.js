export default {
    //accounts
    UPDATE_ACCOUNT_NAME (state, data) {
        state.accountName = data;
        return state;
    },
    UPDATE_PRIVATEKEY (state, data) {
        state.privateKey = data;
        return state;
    },
    UPDATE_SELETED_ACCOUNT (state, data) {
        state.selectedAccountName = data;
        return state;
    },
    UPDATE_SELETED_ACCOUNT_TOTAL_BALANCE (state, data) {
        state.selectedAccountTotalBalance = data;
        return state;
    },
    UPDATE_AVAILABLE_BALANCE_FOR_VOTE (state, data) {
        state.selectedAccountAvailableForVote = data;
        return state;
    }

}
