class GuiComponent {
    constructor() {
        this.width = null;
        this.height = null;
    }

    getSize(view) {
        return {
            width: !this.width || this.width > view.width ? view.width : this.width,
            height: !this.height || this.height > view.height ? view.height : this.height,
        };
    }

    init(renderer) {}

    dispatch(renderer) {}

    render(renderer, parent) {}
}

export { GuiComponent };
