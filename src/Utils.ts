export class Utils {
    public static getRandomItem<T>(data: T[] | { [key: string]: T }): T {
        const values = Object.values(data);

        const min = 0;
        const max = values.length - 1;
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

        return values[randomInt];
    }

    public static createMatrix(m: number, n: number): any[][] {
        return new Array(n).fill(null).map(() => new Array(m).fill(null));
    }

    public static createElement(
        tag: string,
        className: string | any[],
        children: HTMLElement[] = [],
        text = '',
    ): HTMLElement {
        const element = document.createElement(tag);

        if (Array.isArray(className)) {
            className.forEach((name) => name && element.classList.add(name));
        } else {
            element.classList.add(className);
        }

        element.innerHTML = text;
        children.forEach((child) => element.appendChild(child));

        return element;
    }
}
