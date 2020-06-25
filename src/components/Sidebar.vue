<template>
    <div class="sidebar">
        <div class="sidebar-area" :class="{'sidebar-area-collapse': sidebarCollapse}">
            <div class="sidebar-toggler" @click="toggleSidebar">
                <b-icon-chevron-double-right class="toggler-icon-right t-icon" v-if="sidebarCollapse"></b-icon-chevron-double-right>
                <b-icon-chevron-double-left class="toggler-icon-left t-icon" v-else></b-icon-chevron-double-left>
            </div>
            <div class="sidebar-container">
                <div class="brand-logo">
                    <img src="../assets/kanji-logo-big.svg" alt="Kanji Logo" class="sidebar-logo">
                </div>
                <div class="sidebar-menu-list">
                    <ul class="p-0">
                        <li class="sidebar-item text-custom-primary sidebar-active">
                            <router-link to="/">Dashboard</router-link>
                        </li>
                        <li class="sidebar-item">
                            <router-link to="/">Quiz Area</router-link>
                        </li>
                        <li class="sidebar-item">
                            <router-link to="/">Statistics</router-link>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" @click.prevent="logout">Sign out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    name: 'Sidebar',

    data() {
        return {
            sidebarCollapse: false
        }
    },

    mounted() {
        this.decideToCollapse();
        window.addEventListener('resize', this.decideToCollapse);
    },

    methods: {

        logout() {
            this.$emit('logout-clicked');
        },

        toggleSidebar() {
            this.sidebarCollapse = !this.sidebarCollapse;
        },

        decideToCollapse() {
            if (window.innerWidth < 926) {
                this.sidebarCollapse = true;
            }
        }
        
    }

}

</script>

<style scoped>

.sidebar-area {
    transition: .2s;
}

.sidebar-toggler {
    background-color: transparent;
    position: fixed;
    display: none;
    cursor: pointer;
    left: 320px;
    font-size: 25px;
    padding: 10px 15px 10px 10px;
    color: #8900CE;
    transition: .1s;
}

.sidebar-toggler:hover>.toggler-icon-right, .toggler-icon-left {
    transform: translateX(8px);
}

.sidebar-toggler:hover>.toggler-icon-left {
    transform: translateX(-1px);
}

.t-icon {
    transition: inherit;
}

.brand-logo {
    text-align: center;
    padding: 70px 0;    
}

.sidebar-logo {
    width: 160px;
}

.sidebar-container {
    background-color: white;
    transition: .2s;
    height: 100vh;
    overflow: auto;
    box-shadow: 3px 0px 26px rgba(0,0,0,.2);
}

.sidebar-item {
    padding: 20px 25px;
    font-weight: bold;
    list-style-type: none;
    font-size: 18px;
    transition: .1s;
}

.sidebar-item a {
    text-decoration: none;
    color: inherit;
    transition: .1s;
}

.sidebar-item.sidebar-active {
    background-color: #8900CE;
    color: white;
}

.sidebar-item.sidebar-active a:hover {
    color: white;
}

.sidebar-item a:hover {
    color: #8900CE;
}

@media(max-width: 926px) {
    .sidebar-area-collapse {
        transform: translateX(-320px);
    }
    .sidebar-toggler {
        display: block;
    }
}

</style>
