export class  ToggleStatistics {
    toggle: boolean;
    switchStatistics: boolean;

    constructor({toggle = undefined, switchStatistics = undefined}) {
        this.toggle = toggle;
        this.switchStatistics = switchStatistics;

    }
}
