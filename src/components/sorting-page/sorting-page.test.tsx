import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {sortSelect, sortBubble} from "../../utils/utils";

jest.setTimeout(10000);

describe.each([
    ['пустой массив', [], []],
    ['массив из одного элемента',
        [{value: 1, color: ElementStates.Default},
        ],
        [{value: 1, color: ElementStates.Modified},
        ]
    ],
    ['массив из нескольких элементов',
        [{value: 1, color: ElementStates.Default},
            {value: 3, color: ElementStates.Default},
            {value: 2, color: ElementStates.Default},
        ],

        [{value: 1, color: ElementStates.Modified},
            {value: 2, color: ElementStates.Modified},
            {value: 3, color: ElementStates.Modified},
        ],
    ],
])('Корректно сортирует', (name, input, expected) => {
    it(`сортировкой выбором ${name}`, async () => {
        const output = await sortSelect(Direction.Ascending, input, (fake) => {
        }, (fake) => {
        }, (fake) => {
        });
        expect(output).toEqual(expected);
    });
    it(`сортировкой пузырьком ${name}`, async () => {
        const output = await sortBubble(Direction.Ascending, input, (fake) => {
        }, (fake) => {
        }, (fake) => {
        });
        expect(output).toEqual(expected);
    });
});