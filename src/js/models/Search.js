export default class Search {
    constructor(query){
        this.query = query;
    }
    async getData() {
        var res = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)
            .then((res) => res.json())
            .then((data) => data);
            this.result = res.recipes;
    }
}