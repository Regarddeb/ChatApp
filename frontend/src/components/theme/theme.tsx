import { MantineColorsTuple, createTheme } from "@mantine/core";

const myColor: MantineColorsTuple = [
    '#eef3ff',
    '#dee2f2',
    '#bdc2de',
    '#98a0ca',
    '#7a84ba',
    '#6672b0',
    '#5c68ac',
    '#4c5897',
    '#424e88',
    '#364379'
];

export const theme = createTheme({
    colors: {
        myColor,
    }
});