class View {
    constructor(squares, onClick) {
        this.squares = squares;
        this.onClick = onClick;
        this.initFieldsView();
        this.updateStyles();
    }

    initFieldsView() {
        this.fieldsView = this.squares.map((column, x) => column.map((field, y) => {
            const element = document.createElement('div');
            element.className = 'field';
            element.innerHTML = field ? field.shape : '';
            element.addEventListener('click', () => {
                this.onClick(x, y);
                this.updateStyles();
            });
            return element;
        }))
    }

    updateStyles() {
        this.squares.forEach((column, x) => column.forEach((field, y) => {
            if (field) {
                const fieldView = this.fieldsView[x][y].style;
                fieldView.color = field.isActive ? 'red' : 'black';
                fieldView.transform = `rotate(${field.rotation}deg)`;
            };
        }))
    }

    render() {
        const body = document.body;
        body.innerHTML = '';

        for (let y = 0; y < this.fieldsView[0].length; y++) {
            for (let x = 0; x < this.fieldsView.length; x++) {
                body.appendChild(this.fieldsView[x][y])
            }
            body.appendChild(document.createElement('br'))
        }
    }
}