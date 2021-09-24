import './ControlPanel.scss';

import { Utils } from '../Utils';

interface Params {
    message: string;
    isNextButtonActive: boolean;
    onRestartButtonClick(): void;
    onNextButtonClick(): void;
}

const ROOT_CLASS_NAME = 'control-panel';

export class ControlPanel {
    private classNames = {
        root: ROOT_CLASS_NAME,
        button: `${ROOT_CLASS_NAME}__button`,
        buttonHide: `${ROOT_CLASS_NAME}__button_hide`,
        message: `${ROOT_CLASS_NAME}__message`,
    }

    private elements;

    constructor(params: Params) {
        this.initElements(params);
        this.addClickHandler(params);
    }

    public render(): HTMLElement {
        const { root, restartButton, nextButton, message } = this.elements;

        root.appendChild(restartButton);
        root.appendChild(nextButton);
        root.appendChild(message);

        return root;
    }

    public setMessage(message: string) {
        this.elements.message.innerText = message;
    }

    public setNextButtonActiveStatus(status: boolean): void {
        if (status) {
            this.elements.nextButton.classList.remove(this.classNames.buttonHide);
        } else {
            this.elements.nextButton.classList.add(this.classNames.buttonHide);
        }
    }

    private initElements(params: Params) {
        const nextButtonClasses =[
            this.classNames.button,
            !params.isNextButtonActive && this.classNames.buttonHide,
        ];

        this.elements = {
            root: Utils.createElement('div', this.classNames.root),
            message: Utils.createElement('div', this.classNames.message, [], params.message),
            restartButton: Utils.createElement('button', this.classNames.button, [], 'Играть заново'),
            nextButton: Utils.createElement('button', nextButtonClasses, [], 'Следующий уровень'),
        }
    }

    private addClickHandler(params: Params): void {
        const { restartButton, nextButton } = this.elements;

        restartButton.addEventListener('click', params.onRestartButtonClick);
        nextButton.addEventListener('click', params.onNextButtonClick);
    }

}