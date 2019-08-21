import Vue from "nativescript-vue";

import Welcome from "./pages/Welcome";

new Vue({

    template: `
        <Frame>
            <Welcome />
        </Frame>`,

    components: {
      Welcome
    }
}).$start();
