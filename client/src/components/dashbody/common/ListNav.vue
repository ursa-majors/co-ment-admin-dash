<template lang="html">
<div class="list-nav">
    <p>Showing {{currentRange}} of {{total}} total records</p>
    <div class="center">
        <div class="pagination">
            <a @click="navigateToPrev()">
                &laquo;
            </a>
            <a :class="{active : isActive(pageNum)}"
                v-for="(pageNum, index) in pageNumbers"
                @click="navigateTo(pageNum)">
                {{pageNum}}
            </a>
            <a @click="navigateToNext()">
                &raquo;
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name  : 'ListNav',
    props : ['numPages', 'count', 'total'],
    data() {
        return {
            active : false,
            page   : 1
        };
    },
    computed: {
        pageNumbers() {
            return [...Array(this.numPages).keys()]
                .map(el => el + 1);
        },
        currentRange() {
            const start = ((this.page - 1) * 20) + 1;
            const end = this.count < 20
                ? ((this.page - 1) * 20) + this.count
                : this.page * 20;
            return `${start} - ${end}`;
        }
    },
    methods: {

        /** CHECK IF PAGINATION LINK IS ACTIVE
         *  @param   {Number}   pageNum   Page number of the link
         *  @returns {Boolean}            True if pageNum === this.page
        */
        isActive(pageNum) {
            return pageNum === this.page;
        },

        /** NAVIGATE TO A SPECIFIED RESULTS PAGE
         *  Sets this.page; emits event to parent to rerender results list.
         *  @param   {Number}   page   The page number to go to
         *  @returns {null}
        */
        navigateTo(page) {
            this.page = page;
            this.$emit('gotopage', page);
        },

        /** NAVIGATE TO PREVIOUS PAGE OF RESULTS
         *  Sets this.page; emits event to parent to rerender results list.
         *  @returns {null}
        */
        navigateToPrev() {
            const prevPage = this.page === 1
                ? 1
                : this.page - 1;
            this.page = prevPage;
            this.$emit('gotopage', prevPage);
        },

        /** NAVIGATE TO NEXT PAGE OF RESULTS
         *  Sets this.page; emits event to parent to rerender results list.
         *  @returns {null}
        */
        navigateToNext() {
            const nextPage = this.page === this.numPages
                ? this.numPages
                : this.page + 1;
            this.page = nextPage;
            this.$emit('gotopage', nextPage);
        }
    }
};
</script>

<style scoped lang="css">
.list-nav {
    margin-bottom: .25em;
}
.center {
    text-align: center;
}

.pagination {
    display: inline-block;
}

.pagination a {
    border: 1px solid transparent;
    color: #333;
    display: inline-block;
    text-decoration: none;
    width: 20px;
    height: 20px;
    line-height: 20px;
}

.pagination a.active {
    font-weight: bold;
}

.pagination a:hover:not(.active) {
    cursor: pointer;
    background-color: #f9f9f9;
    border: 1px solid #444;
}

</style>
