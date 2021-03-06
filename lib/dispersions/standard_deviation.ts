import {DataSetType} from "../interfaces/data_set_type";
import {Input} from "../interfaces/input";
import {Options} from "../interfaces/options";
import {Output} from "../interfaces/output";
import {Scale} from "../interfaces/scale_enum";
import {Operation} from "../operation";
// tslint:disable-next-line:no-var-requires
const inquirer = require("inquirer");

class StandardDeviation extends Operation {
    constructor(scale: Scale) {
        super(scale);
    }

    public async calculate(input: Input): Promise<Output> {
        try {
            const n = input.options.dataSetType === DataSetType.POPULATION ? input.data.length : input.data.length - 1;
            const mean = this.mean(input.data);
            const squareOfDistanceFromMean = input.data.map((e) => Math.pow((e - mean), 2));
            const sumOfDistancesOverLength = this.sum(squareOfDistanceFromMean) / n;
            const result = this.round(Math.sqrt(sumOfDistancesOverLength));
    
            return { result };
        } catch (error) {
            throw error;
        }
    }

    public async setOptions(): Promise<Options> {
        const questions = [
            {
                type: "list",
                name: "dataSetType",
                message: "Select what type of data set you are importing:",
                choices: [
                    DataSetType.SAMPLE,
                    DataSetType.POPULATION
                ]
            }
        ];
        return inquirer.prompt(questions);
    }
}

export {
    StandardDeviation
};
