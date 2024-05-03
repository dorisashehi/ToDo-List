class Project{

    constructor(id, name, favorites){
        this.id = id;
        this.name = name;
        this.favorites = favorites;
    }

    changeName(name){
        this.name = name;
    }

    changeFavorites(favorites){
        this.favorites = favorites;
    }

}

class Task{

    constructor(id, name, descr, pro_id, due_date, priority){
        this.id = id;
        this.descr = descr;
        this.pro_id = pro_id;
        this.due_date = due_date;
        this.priority = priority;
    }

    changeName(newName){
        this.name = newName;
    }

    changeDescr(newDescr){
        this.descr = newDescr;
    }

    changeProID(newProID){
        this.pro_id = newProID;
    }

    changeDueDate(newDueDate){
        this.due_date = newDueDate;
    }

    changePriority(newPriority){
        this.priority = newPriority;
    }

}

