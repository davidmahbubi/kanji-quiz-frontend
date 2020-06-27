<template>
    <div class="topbar position-fixed py-3 px-4">
        <div class="float-left">
            <slot/>
        </div>
        <div class="float-right">
            <slot name="right-side"/>
        </div>
    </div>
</template>

<style scoped>

.topbar {    
    top: 0;
    right: 0;
    background-color: white;
    left: 0;
    z-index: 9;
    height: 90px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
}

</style>
