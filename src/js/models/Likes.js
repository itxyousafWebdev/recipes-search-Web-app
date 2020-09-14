export default class Like {
    constructor()
    {
        this.likes = [];
    }

    addLikes(id, title, auther, imgUrl)
    {
        const item = {id, title, auther, imgUrl};
        this.likes.push(item);
        this.addLikesToLocalStorage();
    }

    deleteItem(id) 
    {
        const index = this.likes.findIndex(cur => cur.id === id);
        this.likes.splice(index, 1);
        this.addLikesToLocalStorage();
    }

    isLiked(id) {
        return this.likes.findIndex(cur => cur.id === id) !== -1;
    }

    getNumOfLiked(){
        return this.likes.length;
    }

    addLikesToLocalStorage()
    {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }

    readLikesDataFromLocalStorage()
    {
        const storage = JSON.parse(localStorage.getItem("likes"));
        if(storage){
            this.likes = storage;
        }
    }
}