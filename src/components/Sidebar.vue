<template>
    <div class="sidebar" :class="{'sidebar-collapse': sidebarCollapse}">
        <div class="sidebar-area">
            <div class="sidebar-container">
                <div class="brand-logo">
                    <img src="../assets/kanji-logo-big.svg" alt="Kanji Logo" class="sidebar-logo">
                </div>
                <div class="sidebar-menu-list">
                    <ul class="p-0">
                        <li class="sidebar-item" :class="{'sidebar-active': isInRouteName('Home')}">
                            <router-link :to="{name: 'Home'}">Dashboard</router-link>
                        </li>
                        <li class="sidebar-item" :class="{'sidebar-active': isInRouteName('QuizArea', 'QuizAreaQuestion')}">
                            <router-link :to="{name: 'QuizArea'}">Quiz Area</router-link>
                        </li>
                        <li class="sidebar-item" :class="{'sidebar-active': isInRouteName('Statistics')}">
                            <router-link :to="{name: 'Statistics'}">Statistics</router-link>
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

    props: {
        sidebarCollapse: Boolean,
    },

    methods: {

        logout() {
            this.$emit('logout-clicked');
        },

        isInRouteName(...name) {
            return name.includes(this.$route.name);
        }
        
    },

}

</script>

<style scoped>

.sidebar {
    position: fixed;
    left: 0;
    transition: .2s;
    top: 0;
    z-index: 999;
    width: 320px;
    bottom: 0;
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
    .sidebar-collapse {
        transform: translateX(-400px);
    }
    .sidebar-toggler {
        display: block;
    }
}

</style>
