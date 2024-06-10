const { createApp } = Vue

createApp({
    data() {
        return {
            digimons: [],
            loading: false,
            searchText: '',
            called: false
        }
    },
    computed: {
        filteredDigimons() {
            return this.digimons.filter(digimon => digimon.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    },
    methods: {
        async fetchDigimons() {
            this.loading = true;
            this.called = true;
            try {
                const response = await fetch('https://digimon-api.vercel.app/api/digimon')
                const data = await response.json()
                this.digimons = data.map(digimon => ({
                    ...digimon,
                    showDetails: false
                }))
                this.loading = false;
            } catch (err) {
                console.error(err)
                this.loading = false;
            }
        },
        toggleDetails(digimon) {
            digimon.showDetails = !digimon.showDetails;
        },
        getTypeClass(level) {
            const levelClassMap = {
                "Rookie": "rookie",
                "Champion": "champion",
                "Ultimate": "ultimate",
                "Mega": "mega",
                "Fresh": "fresh",
                "In Training": "in-training"
            }
            return levelClassMap[level] || ""
        }
    }
}).mount("#app")
