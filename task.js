class Task {
    constructor(name, desc, action, finish, repeat, indefinite=false) {
        this.name = name;
        this.desc = desc;
        this.action = action;
        this.finish = finish;
        this.repeat = repeat;
        this.indefinite = indefinite;

        this.progress = 0;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.finish()) clearInterval(this.interval);
            else this.action();
        }, this.repeat);
    }

    stop() {
        clearInterval(this.interval);
        this.progress = 0;
    }
}